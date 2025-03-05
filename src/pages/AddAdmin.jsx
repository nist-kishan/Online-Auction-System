import React, { useState } from 'react'
import addAdminStyle from '../css/addAdmin.module.css'
export default function AddAdmin() {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            alert("Please fill in all fields.");
            return;
        }
        alert("Your Admin is Successfully Register.");
        setData({ email: '', password: '' });
        return;
    }
    return (
        <div className={addAdminStyle.container}>
            <div className={addAdminStyle.mainContainer}>
                <h1>Admin Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={data.email} onChange={handleOnChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={data.password} onChange={handleOnChange} />
                    <div className={addAdminStyle.btnContainer}>
                        <button>Register</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
