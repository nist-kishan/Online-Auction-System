import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import headerStyle from "./css/header.module.css";

export default function Header() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isLogIn, setIsLogIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("./data/Categories.json"); // Replace with backend API URL
                const data = response.data.categories;
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();

        const userData = localStorage.getItem("User");
        if (userData) {
            const user = JSON.parse(userData);
            setIsLogIn(true);
            setRole(user.role);
        }
    }, []);

    const handleChange = (e) => {
        setSelectedCategories([e.target.value]);
    };

    const handleLogOut = () => {
        localStorage.removeItem("User");
        setRole(null);
        setIsLogIn(false);
        navigate("/");
    };

    return (
        <div className={headerStyle.container}>
            <div className={headerStyle.contentMenu}>
                <div className={headerStyle.icon}>
                    <Link to="/">
                        <img src="./images/appIcon.png" alt="App Icon" />
                    </Link>
                </div>

                <select
                    onChange={handleChange}
                    defaultValue="All Categories"
                    className={headerStyle.selectMenu}
                >
                    <option value="All Categories">All Categories</option>
                    {categories.map((data) => (
                        <option value={data.name} key={data.id}>
                            {data.name}
                        </option>
                    ))}
                </select>

                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>

                    {role === "admin" && (
                        <>
                            <li><Link to="/new_admin">Register Admin</Link></li>
                            <li><Link to="/add_category">Add Category</Link></li>
                            <li><Link to="/all_product">All Products</Link></li>
                            <li><Link to="/all_category">All Categories</Link></li>
                            <li><Link to="/all_delivery">All Deliveries</Link></li>
                            <li><Link to="/view_customers">View Customers</Link></li>
                        </>
                    )}

                    {role === "sales" && (
                        <>
                            <li><Link to="/seller_orders">Seller Orders</Link></li>
                            <li><Link to="/add_category">Register Delivery</Link></li>
                            <li><Link to="/all_product">Delivery Persons</Link></li>
                            <li><Link to="/all_category">Add Product</Link></li>
                            <li><Link to="/wallet">My Wallet</Link></li>
                        </>
                    )}

                    {role === "customer" && (
                        <>
                            <li><Link to="/my_bids">My Bids</Link></li>
                            <li><Link to="/my_orders">My Orders</Link></li>
                            <li><Link to="/wallet">My Wallet</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <div className={headerStyle.authenicationMenu}>
                <ul>
                    {!isLogIn ? (
                        <>
                            <li><Link to="/register">Register Customer</Link></li>
                            <li><Link to="/login">Login User</Link></li>
                        </>
                    ) : (
                        <>
                            <h3>Account: <strong>{role}</strong></h3>
                            <li>
                                <Link to="/" onClick={handleLogOut}>Logout</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
