import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import allCategoryStyle from '../css/myBids.module.css';
import axios from 'axios';

export default function AllCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("User")) {
            navigate('/');
        }
    }, [navigate]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('./data/Categories.json');
                setCategories(response.data.categories);
                localStorage.removeItem('selected_Item')
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleUpdate = (item) => {
        localStorage.setItem("selected_Item", JSON.stringify(item));
        const itemDetails = JSON.parse(localStorage.getItem("selected_Item"))
        navigate(`/update`);
    };

    const handleDelete = (id) => {
        const updatedCategories = categories.filter((category) => category.id !== id);
        setCategories(updatedCategories);
        alert("Category deleted successfully!");
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCategories = categories.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={allCategoryStyle.container}>
            <h1>All Categories</h1>

            <div className={allCategoryStyle.searchContainer}>
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <table className={allCategoryStyle.tableContainer}>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <div className={allCategoryStyle.btnSection}>
                                        <button onClick={() => handleUpdate(item)}>Update</button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
