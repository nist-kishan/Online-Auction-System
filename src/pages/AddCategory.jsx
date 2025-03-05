import React, { useState } from 'react'
import addTitleStyle from '../css/addAdmin.module.css'
export default function AddCategory() {
    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.title || !data.description) {
            alert("Please fill in all fields.");
            return;
        }
        alert("Your Admin is Successfully Register.");
        setData({ title: '', description: '' });
        return;
    }
    return (
        <div className={addTitleStyle.container}>
            <div className={addTitleStyle.containerMainContainer}>
                <h1>Add Category</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Category Title</label>
                    <input type="text" name='title' value={data.title} onChange={handleOnChange} placeholder='Enter title'/>
                    <label htmlFor="description">Category Description</label>
                    <textarea name='description' value={data.description} onChange={handleOnChange} placeholder='Enter description' className={addTitleStyle.description}></textarea>
                    <div className={addTitleStyle.btnContainer}>
                        <button>Add Category</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
