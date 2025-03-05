import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allCustomerStyle from '../css/myBids.module.css';
import axios from 'axios';

export default function AllCustomers() {
    const navigate = useNavigate();
    const [allCustomer, setAllCustomer] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const CustomerFetching = async () => {
            try {
                const Customers = await axios.get('./data/CustomerDetails.json');
                setAllCustomer(Customers.data.persons);
            } catch (error) {
                console.error('Error in Fetching All Customer Data', error);
            }
        };
        CustomerFetching();
    }, []);

    return (
        <div className={allCustomerStyle.container}>
            <h1>All Customers</h1>

            <table className={allCustomerStyle.tableContainer}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone NO.</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {allCustomer.length > 0 ? (
                        allCustomer.map((Customer, index) => (
                            <tr key={index}>
                                <td>{Customer.first_name}</td>
                                <td>{Customer.last_name}</td>
                                <td>{Customer.email}</td>
                                <td>{Customer.phone}</td>
                                <td>{Customer.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No Customer yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
