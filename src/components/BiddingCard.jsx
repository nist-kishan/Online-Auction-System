import React from 'react'
import biddingCardStyle from "../css/biddingCard.module.css"
import { useNavigate } from 'react-router-dom'
export default function BiddingCard({ item }) {
    const navigate=useNavigate();

    const {id, name,description,category,image,starting_price } = item

    const handleSelectedProduct=()=>{
        localStorage.setItem("Product_Info",JSON.stringify(item))
        navigate('/${id}')
    }
    return (
        <div className={biddingCardStyle.container}>
            <div className={biddingCardStyle.productImage}>
                <img src={image} alt="product Image" />
            </div>
            <div className={biddingCardStyle.description}>
                <p>Catogories: <strong>{category}</strong></p>
                <p><strong>{name}</strong></p>
                <p>{description}</p>
                <div className={biddingCardStyle.bidOperation}>
                    <button className={biddingCardStyle.btn} type="button" onClick={handleSelectedProduct}>Start bid</button>
                    <p>Price: <strong>Rs.{starting_price}</strong></p>
                </div>
            </div>
        </div>
    )
}
