import React, { useState, useEffect } from 'react';
import { fetchSales } from './services/salesService';
import Sidebar from './Sidebar';

const SalesDashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [metadata, setMetadata] = useState({ total: 0, page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        region: '',
        gender: '',
        ageRange: '',
        category: '',
        tags: '',
        paymentMethod: '',
        startDate: '',
        endDate: '',
        sort: 'date_desc',
        page: 1
    });

    useEffect(() => {
        loadSales();
    }, [filters]);

    const loadSales = async () => {
        setLoading(true);
        try {
            const response = await fetchSales(filters);
            if (response.success) {
                setSalesData(response.data);
                setMetadata(response.metadata);
            }
        } catch (error) {
            console.error('Failed to load sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= metadata.totalPages) {
            setFilters(prev => ({ ...prev, page: newPage }));
        }
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            region: '',
            gender: '',
            ageRange: '',
            category: '',
            tags: '',
            paymentMethod: '',
            startDate: '',
            endDate: '',
            sort: 'date_desc',
            page: 1
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Sales Management System</h1>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search Name or Phone..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <select name="region" value={filters.region} onChange={handleFilterChange} className="p-2 border rounded w-full">
                            <option value="">All Regions</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                        <select name="gender" value={filters.gender} onChange={handleFilterChange} className="p-2 border rounded w-full">
                            <option value="">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input
                            type="text"
                            name="ageRange"
                            placeholder="Age Range (e.g. 20-30)"
                            value={filters.ageRange}
                            onChange={handleFilterChange}
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select name="category" value={filters.category} onChange={handleFilterChange} className="p-2 border rounded w-full">
                            <option value="">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
                        </select>
                        <select name="paymentMethod" value={filters.paymentMethod} onChange={handleFilterChange} className="p-2 border rounded w-full">
                            <option value="">All Payment Methods</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash">Cash</option>
                        </select>
                        <select name="sort" value={filters.sort} onChange={handleFilterChange} className="p-2 border rounded w-full">
                            <option value="date_desc">Date (Newest)</option>
                            <option value="quantity_desc">Quantity (High-Low)</option>
                            <option value="quantity_asc">Quantity (Low-High)</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                        </select>
                        <button onClick={clearFilters} className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full">
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Customer</th>
                                <th className="py-3 px-6">Phone</th>
                                <th className="py-3 px-6">Region</th>
                                <th className="py-3 px-6">Product</th>
                                <th className="py-3 px-6">Category</th>
                                <th className="py-3 px-6 text-center">Qty</th>
                                <th className="py-3 px-6 text-right">Amount</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {loading ? (
                                <tr><td colSpan="9" className="text-center py-4">Loading...</td></tr>
                            ) : salesData.length > 0 ? (
                                salesData.map((sale) => (
                                    <tr key={sale._id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-3 px-6 whitespace-nowrap">{new Date(sale.operation.date).toLocaleDateString()}</td>
                                        <td className="py-3 px-6 font-medium">{sale.customer.customerName}</td>
                                        <td className="py-3 px-6">{sale.customer.phoneNumber}</td>
                                        <td className="py-3 px-6">{sale.customer.customerRegion}</td>
                                        <td className="py-3 px-6">{sale.product.productName}</td>
                                        <td className="py-3 px-6">{sale.product.productCategory}</td>
                                        <td className="py-3 px-6 text-center">{sale.quantity}</td>
                                        <td className="py-3 px-6 text-right">${sale.finalAmount}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span className={`py-1 px-3 rounded-full text-xs ${sale.operation.orderStatus === 'Delivered' ? 'bg-green-200 text-green-800' :
                                                sale.operation.orderStatus === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                                    'bg-red-200 text-red-800'
                                                }`}>
                                                {sale.operation.orderStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-8 text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-lg font-medium">No records found</p>
                                            <p className="text-sm">Try adjusting your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">
                        Page {metadata.page} of {metadata.totalPages} ({metadata.total} items)
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(metadata.page - 1)}
                            disabled={metadata.page === 1}
                            className="px-4 py-2 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(metadata.page + 1)}
                            disabled={metadata.page === metadata.totalPages}
                            className="px-4 py-2 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDashboard;
