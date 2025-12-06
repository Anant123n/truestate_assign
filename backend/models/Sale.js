import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    finalAmount: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    operationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operation',
        required: true
    }
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
