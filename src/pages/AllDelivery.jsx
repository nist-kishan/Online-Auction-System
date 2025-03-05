import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allDeliveryStyle from '../css/myBids.module.css';
import axios from 'axios';

export default function AllDelivery() {
    const navigate = useNavigate();
    const [allDelivery, setAllDelivery] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('/data/AllDelivery.json');
                setAllDelivery(response.data.delivery);
            } catch (error) {
                console.error('Error fetching delivery data:', error);
            }
        };
        fetchDeliveries();
    }, []);

    return (
        <div className={allDeliveryStyle.container}>
            <h1>All Deliveries</h1>

            <table className={allDeliveryStyle.tableContainer}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Address</th>
                        <th>Seller</th>
                    </tr>
                </thead>
                <tbody>
                    {allDelivery.length > 0 ? (
                        allDelivery.map((delivery, index) => (
                            <tr key={index}>
                                <td>{delivery.first_name}</td>
                                <td>{delivery.last_name}</td>
                                <td>{delivery.email}</td>
                                <td>{delivery.phone}</td>
                                <td>{delivery.address}</td>
                                <td>{delivery.seller}</td>
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
