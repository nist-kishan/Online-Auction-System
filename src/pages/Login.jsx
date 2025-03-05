import React, { useState,useEffect } from "react";
import loginStyle from "../css/loginStyle.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        whichUser:"customer"
    });

    useEffect(() => {
        if (localStorage.getItem("User")) {
            navigate('/')
        }
    }, [])

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhichUser=(e)=>{
        formData.whichUser=e.target.value;
    }


    const validateForm = () => {
        let newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (validateForm()) {
            alert("Login Successful!");
            localStorage.setItem("User",JSON.stringify({email:formData.email,role:formData.whichUser}))
            navigate("/");
        }
    };

    return (
        <div className={loginStyle.container}>
            <div>
                <form className={loginStyle.form} onSubmit={handleSubmit}>
                    <h2 className={loginStyle.heading}>Login</h2>
                    <em>Login For:<select defaultValue="customer" onChange={handleWhichUser}>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="saler">SalesMan</option>
                    </select></em>

                    <div className={loginStyle.formGroup}>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className={loginStyle.error}>{errors.email}</span>}
                    </div>

                    <div className={loginStyle.formGroup}>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className={loginStyle.error}>{errors.password}</span>}
                    </div>

                    <button type="submit" className={loginStyle.submitButton}>Login</button>
                </form>
            </div>
        </div>
    );
}
