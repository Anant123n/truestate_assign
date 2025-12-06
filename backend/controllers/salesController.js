import Sale from '../models/Sale.js';

export const getSales = async (req, res) => {
    try {
        const {
            search,
            region,
            gender,
            ageRange,
            category,
            tags,
            paymentMethod,
            startDate,
            endDate,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const pipeline = [];

        // 1. Lookup (Join) related collections
        pipeline.push(
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            { $unwind: '$customer' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $lookup: {
                    from: 'operations',
                    localField: 'operationId',
                    foreignField: '_id',
                    as: 'operation'
                }
            },
            { $unwind: '$operation' }
        );

        // 2. Match (Filter & Search)
        const matchStage = {};

        // Search (Name or Phone)
        if (search) {
            matchStage.$or = [
                { 'customer.customerName': { $regex: search, $options: 'i' } },
                { 'customer.phoneNumber': { $regex: search, $options: 'i' } }
            ];
        }

        // Filters
        if (region) {
            const regions = region.split(',');
            matchStage['customer.customerRegion'] = { $in: regions };
        }

        if (gender) {
            const genders = gender.split(',');
            matchStage['customer.gender'] = { $in: genders };
        }

        if (ageRange) {
            // Expecting format "min-max" e.g., "20-30"
            const parts = ageRange.split('-');
            if (parts.length === 2) {
                const min = parseInt(parts[0]);
                const max = parseInt(parts[1]);
                if (!isNaN(min) && !isNaN(max)) {
                    matchStage['customer.age'] = { $gte: min, $lte: max };
                }
            }
        }

        if (category) {
            const categories = category.split(',');
            matchStage['product.productCategory'] = { $in: categories };
        }

        if (tags) {
            const tagList = tags.split(',');
            matchStage['product.tags'] = { $in: tagList };
        }

        if (paymentMethod) {
            const methods = paymentMethod.split(',');
            matchStage['operation.paymentMethod'] = { $in: methods };
        }

        if (startDate || endDate) {
            matchStage['operation.date'] = {};
            if (startDate) matchStage['operation.date'].$gte = new Date(startDate);
            if (endDate) matchStage['operation.date'].$lte = new Date(endDate);
        }

        pipeline.push({ $match: matchStage });

        // 3. Sort
        const sortStage = {};
        if (sort) {
            switch (sort) {
                case 'date_desc':
                    sortStage['operation.date'] = -1;
                    break;
                case 'quantity_desc':
                    sortStage['quantity'] = -1;
                    break;
                case 'quantity_asc':
                    sortStage['quantity'] = 1;
                    break;
                case 'name_asc':
                    sortStage['customer.customerName'] = 1;
                    break;
                case 'name_desc':
                    sortStage['customer.customerName'] = -1;
                    break;
                default:
                    sortStage['operation.date'] = -1; // Default newest first
            }
        } else {
            sortStage['operation.date'] = -1;
        }
        pipeline.push({ $sort: sortStage });

        // 4. Pagination (Facet)
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, parseInt(limit) || 10);
        const skip = (pageNum - 1) * limitNum;

        pipeline.push({
            $facet: {
                metadata: [{ $count: 'total' }, { $addFields: { page: pageNum } }],
                data: [{ $skip: skip }, { $limit: limitNum }]
            }
        });

        const result = await Sale.aggregate(pipeline);

        const metadata = result[0].metadata[0] || { total: 0, page: pageNum };
        const data = result[0].data;

        res.status(200).json({
            success: true,
            metadata: {
                ...metadata,
                totalPages: Math.ceil(metadata.total / limitNum)
            },
            data
        });

    } catch (error) {
        console.error('Error in getSales:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
