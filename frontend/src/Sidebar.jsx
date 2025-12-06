import React, { useState } from 'react';

const Sidebar = () => {
    const [openSections, setOpenSections] = useState({
        services: true,
        invoices: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-64 bg-gray-50 h-screen border-r border-gray-200 flex flex-col font-sans">
            {/* Header / Profile */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-bold text-sm text-gray-800">Vault</div>
                        <div className="text-xs text-gray-500">Anurag Yadav</div>
                    </div>
                    <div className="ml-auto">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="p-4 space-y-1">
                <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="text-sm font-medium">Dashboard</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm font-medium">Nexus</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Intake</span>
                </div>
            </div>

            {/* Collapsible Sections */}
            <div className="p-4 pt-0 space-y-4">
                {/* Services */}
                <div>
                    <div
                        className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 cursor-pointer hover:text-gray-700"
                        onClick={() => toggleSection('services')}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>Services</span>
                        </div>
                        <svg className={`w-3 h-3 transition-transform ${openSections.services ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {openSections.services && (
                        <div className="space-y-1 ml-2 border-l border-gray-200 pl-2">
                            <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Pre-active</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm">Active</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Blocked</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Closed</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Invoices */}
                <div>
                    <div
                        className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 cursor-pointer hover:text-gray-700"
                        onClick={() => toggleSection('invoices')}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Invoices</span>
                        </div>
                        <svg className={`w-3 h-3 transition-transform ${openSections.invoices ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {openSections.invoices && (
                        <div className="space-y-1 ml-2 border-l border-gray-200 pl-2">
                            <div className="flex items-center space-x-3 text-gray-800 bg-gray-100 p-2 rounded-md cursor-pointer font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm">Proforma Invoices</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm">Final Invoices</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
