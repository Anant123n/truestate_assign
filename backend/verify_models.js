import mongoose from 'mongoose';
import Customer from './models/Customer.js';
import Product from './models/Product.js';
import Sale from './models/Sale.js';
import Operation from './models/Operation.js';

console.log('Verifying models...');

try {
    console.log('Customer model loaded:', Customer.modelName);
    console.log('Product model loaded:', Product.modelName);
    console.log('Sale model loaded:', Sale.modelName);
    console.log('Operation model loaded:', Operation.modelName);
    console.log('All models loaded successfully.');
} catch (error) {
    console.error('Error loading models:', error);
    process.exit(1);
}
