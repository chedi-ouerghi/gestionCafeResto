import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatisticsPage.css';

function StatisticsPage() {
    const [stockStatistics, setStockStatistics] = useState([]);
    const [dailySalesStatistics, setDailySalesStatistics] = useState([]);

    // États pour la pagination
    const [currentPageStock, setCurrentPageStock] = useState(1);
    const [currentPageSales, setCurrentPageSales] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchStockStatistics();
        fetchDailySalesStatistics();
    }, []);

    const fetchStockStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:6202/admin/stock-statistics');
            setStockStatistics(response.data);
        } catch (error) {
            console.error('Error fetching stock statistics:', error);
        }
    };

    const fetchDailySalesStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:6202/admin/daily-sales-statistics');
            setDailySalesStatistics(response.data);
        } catch (error) {
            console.error('Error fetching daily sales statistics:', error);
        }
    };

    // Fonction pour obtenir les données paginées
    const paginate = (data, currentPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // Pagination des données
    const paginatedStockStatistics = paginate(stockStatistics.flat(), currentPageStock);
    const paginatedDailySalesStatistics = paginate(dailySalesStatistics.flat(), currentPageSales);

    // Calculer le nombre total de pages
    const totalPagesStock = Math.ceil(stockStatistics.length / itemsPerPage);
    const totalPagesSales = Math.ceil(dailySalesStatistics.length / itemsPerPage);

    // Fonction pour changer de page
    const handlePageChange = (type, direction) => {
        if (type === 'stock') {
            setCurrentPageStock(prev => {
                const newPage = Math.max(1, prev + direction);
                return newPage <= totalPagesStock ? newPage : prev;
            });
        } else if (type === 'sales') {
            setCurrentPageSales(prev => {
                const newPage = Math.max(1, prev + direction);
                return newPage <= totalPagesSales ? newPage : prev;
            });
        }
    };

    return (
        <div className="statistics-page">
            <div className='div_table'>
                <h2>Stock Statistics</h2>
                <table className="statistics-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Current Quantity</th>
                            <th>Stock Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedStockStatistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat["Nom du produit"]}</td>
                                <td>{stat["Quantité actuelle"]}</td>
                                <td>{stat["Statut du stock"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <span className="total-count">Total: {stockStatistics.length}</span>
                    <button 
                        onClick={() => handlePageChange('stock', -1)} 
                        disabled={currentPageStock === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPageStock} of {totalPagesStock}</span>
                    <button 
                        onClick={() => handlePageChange('stock', 1)} 
                        disabled={currentPageStock === totalPagesStock}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className='div_card'>
                <h2>Daily Sales Statistics</h2>
                <table className="statistics-table">
                    <thead>
                        <tr>
                            <th>Sale Date</th>
                            <th>Total Quantity</th>
                            <th>Adjusted Total</th>
                            <th>Sales Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDailySalesStatistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{new Date(stat["sale_date"]).toLocaleDateString()}</td>
                                <td>{stat["total_quantity"]}</td>
                                <td>{stat["adjusted_total"]}</td>
                                <td>{stat["sales_message"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <span className="total-count">Total: {dailySalesStatistics.length}</span>
                    <button 
                        onClick={() => handlePageChange('sales', -1)} 
                        disabled={currentPageSales === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPageSales} of {totalPagesSales}</span>
                    <button 
                        onClick={() => handlePageChange('sales', 1)} 
                        disabled={currentPageSales === totalPagesSales}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatisticsPage;
