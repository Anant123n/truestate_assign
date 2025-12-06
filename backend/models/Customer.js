import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    customerRegion: {
        type: String,
        required: true
    },
    customerType: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
