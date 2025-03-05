import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import allOrderStyle from '../css/myBids.module.css'
import axios from 'axios'
export default function AllOrders() {
    const navigate=useNavigate();
    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const orderFetching = async () => {
            try {
                const orders = await axios.get('./data/AllOrders.json');
                setAllOrder(orders.data.orders);
            } catch (error) {
                console.error('Error in Fetching All Orders Data', error)
            }
        }
        orderFetching();
    }, [])
    return (
        <div className={allOrderStyle.container}>
            <h1>All Orders</h1>
            <input type="text"  />
            <button></button>
            <table className={allOrderStyle.tableContainer}>
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
                    </tr>
                </thead>

                <tbody>
                    {allOrder.length > 0 ? (
                        allOrder.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td><img src={order.product_image} alt={order.name} width="100" /></td>
                                <td>{order.product_name}</td>
                                <td>Rs.{order.category}</td>
                                <td>Rs.{order.seller}</td>
                                <td>{order.asking_price}</td>
                                <td>{order.win_price}</td>
                                <td>{order.quantity}</td>
                                <td>Rs.{order.customer}</td>
                                <td>Rs.{order.order_status}</td>
                                <td>{order.delivery_contact}</td>
                                <td>{order.delivery_time}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No order placed yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
