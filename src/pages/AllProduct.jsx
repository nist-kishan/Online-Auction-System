import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allProductStyle from '../css/myBids.module.css';
import axios from 'axios';

export default function AllProducts() {
    const navigate = useNavigate();
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const productFetching = async () => {
            try {
                const products = await axios.get('./data/BiddingItems.json');
                setAllProduct(products.data.items);
            } catch (error) {
                console.error('Error in Fetching All Product Data', error);
            }
        };
        productFetching();
    }, []);

    return (
        <div className={allProductStyle.container}>
            <h1>All Products</h1>

            <table className={allProductStyle.tableContainer}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Starting Price</th>
                        <th>Seller</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allProduct.length > 0 ? (
                        allProduct.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={product.image} alt={product.name} width="100" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.stock}</td>
                                <td>Rs. {product.starting_price}</td>
                                <td>{product.seller.name}</td>
                                <td>{product.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No product placed yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
