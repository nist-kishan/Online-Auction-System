import React, { useEffect, useState } from "react";
import addTitleStyle from "../css/addAdmin.module.css";
import { useNavigate } from "react-router-dom";

export default function UpdateCategory() {
    const navigate = useNavigate(); 

    const [data, setData] = useState({
        name: "",
        description: "",
    });

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.name || !data.description) {
            alert("Please fill in all fields.");
            return;
        }
        localStorage.setItem('selected_Item',JSON.stringify(data))
        alert("Your category is successfully updated.");
        setData({ name: "", description: "" });

        navigate("/all_category");
    };

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem("selected_Item")) || { name: "", description: "" };
        setData(item);
    }, []);

    return (
        <div className={addTitleStyle.container}>
            <div className={addTitleStyle.containerMainContainer}>
                <h1>Update Category</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Category Title</label>
                    <input type="text" name="name" value={data.name} onChange={handleOnChange} />

                    <label htmlFor="description">Category Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                        placeholder="Enter description"
                        className={addTitleStyle.description}
                    ></textarea>

                    <div className={addTitleStyle.btnContainer}>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
