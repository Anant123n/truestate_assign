import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
