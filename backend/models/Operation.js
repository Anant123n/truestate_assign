import mongoose from 'mongoose';

const operationSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    deliveryType: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    storeLocation: {
        type: String,
        required: true
    },
    salespersonId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Operation = mongoose.model('Operation', operationSchema);

export default Operation;
