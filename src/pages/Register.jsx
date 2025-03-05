import React, { useEffect, useState } from "react";
import registerStyle from "../css/register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("User")){
            navigate('/')
        }
    },[])

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contact: "",
        street: "",
        city: "",
        pinCode: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
        if (!formData.street.trim()) newErrors.street = "Street is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.pinCode.trim()) newErrors.pinCode = "Pin code is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (validateForm()) {
            console.log("Form Submitted:", formData);
            alert("Registration Successful!");
            localStorage.setItem("User",JSON.stringify({email:formData.email,role:"customer"}))
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                contact: "",
                street: "",
                city: "",
                pinCode: "",
            });
            navigate('/')
        }
    };

    return (
        <div className={registerStyle.container}>
            <h2 className={registerStyle.heading}>Register</h2>
            <form className={registerStyle.form} onSubmit={handleSubmit}>
                <div className={registerStyle.formGroup}>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <span className={registerStyle.error}>{errors.firstName}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <span className={registerStyle.error}>{errors.lastName}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className={registerStyle.error}>{errors.email}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className={registerStyle.error}>{errors.password}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Contact</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
                    {errors.contact && <span className={registerStyle.error}>{errors.contact}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Street</label>
                    <input type="text" name="street" value={formData.street} onChange={handleChange} />
                    {errors.street && <span className={registerStyle.error}>{errors.street}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                    {errors.city && <span className={registerStyle.error}>{errors.city}</span>}
                </div>

                <div className={registerStyle.formGroup}>
                    <label>Pin Code</label>
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                    {errors.pinCode && <span className={registerStyle.error}>{errors.pinCode}</span>}
                </div>

                <button type="submit" className={registerStyle.submitButton}>Register</button>
            </form>
        </div>
    );
}
