import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allOrdersStyle from '../css/myBids.module.css';
import axios from 'axios';

export default function SellerOrder() {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const sellerName = JSON.parse(localStorage.getItem('User'))
                const response = await axios.get('/data/AllOrders.json');
                const allOrders = response.data.orders;
                const sellerOrders = allOrders.filter(order => order.seller === sellerName.email);
                setAllOrders(sellerOrders);
            } catch (error) {
                console.error('Error fetching orders data:', error);
            }
        };
        fetchDeliveries();
    }, []);

    return (
        <div className={allOrdersStyle.container}>
            <h1>All Deliveries</h1>

            <table className={allOrdersStyle.tableContainer}>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Seller</th>
                        <th>Asking Price</th>
                        <th>Win Price</th>
                        <th>Quantity</th>
                        <th>Customer</th>
                        <th>Order Status</th>
                        <th>Delivery Contact</th>
                        <th>Delivery Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.length > 0 ? (
                        allOrders.map((orders, index) => (
                            <tr key={index}>
                                <td>{orders.order_id}</td>
                                <td><img src={orders.product_image} alt={orders.name} width="100" /></td>
                                <td>{orders.product_name}</td>
                                <td>Rs.{orders.category}</td>
                                <td>Rs.{orders.seller}</td>
                                <td>{orders.asking_price}</td>
                                <td>{orders.win_price}</td>
                                <td>{orders.quantity}</td>
                                <td>{orders.customer}</td>
                                <td>{orders.order_status}</td>
                                <td>{orders.delivery_contact}</td>
                                <td>{orders.delivery_time}</td>
                                <td>{
                                    true?(<button className={allOrdersStyle.viewBtn} disabled style={{backgroundColor:'white', color:'black'}}>Assigned</button>):(<button className={allOrdersStyle.viewBtn}>Assign</button>)
                                }
                                
                                
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No deliveries available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
