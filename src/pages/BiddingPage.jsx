import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import biddingPageStyle from "../css/biddingPage.module.css";

export default function BiddingPage() {
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [bidMoney,setBidMoney]=useState("")

    useEffect(() => {
        const storedItem = JSON.parse(localStorage.getItem("Product_Info")) || null;
        setItem(storedItem);
    }, []);

    if (!item) {
        return <p>Loading product details...</p>;
    }

    const handleCancel = () => {
        if (localStorage.getItem("Product_Info")) {
            localStorage.removeItem("Product_Info")
            navigate("/")
        }
    }

    const handleOnChange=(e)=>{
        setBidMoney(e.target.value);
        console.log(e.target.value);
    }

    const handleBid = () => {
        console.log(`Bid placed at ${item.bid_history.amount}`);
    
        if (!bidMoney) {
            alert("Please enter a valid bid amount.");
            return;
        }
        const latestBid = item.bid_history[item.bid_history.length - 1].amount;
        
    
        if(Number(latestBid)<=Number(bidMoney)){
            const newBid = { bidder: "Kishan", amount: bidMoney };
            setItem(prevItem => ({
                ...prevItem,
                bid_history: [...(prevItem.bid_history || []), newBid]
            }));
        
            localStorage.setItem("Product_Info", JSON.stringify({
                ...item,
                bid_history: [...(item.bid_history || []), newBid]
            }));
        }
        else{
            alert("Your bid amount isn't enought for bidding")
        }
    };
    

    return (
        <div className={biddingPageStyle.container}>
            <div className={biddingPageStyle.productImages}>
                <img src={item.image || "default-image.jpg"} alt="Product" />
            </div>
            <div className={biddingPageStyle.productInfo}>
                <h1>{item.name || "No Name"}</h1>
                <div className={biddingPageStyle.productDescription}>
                    <h3>Description</h3>
                    <p>{item.description || "No description available."}</p>
                </div>

                <div className={biddingPageStyle.productStatus}>
                    <div className={biddingPageStyle.productExpiry}>
                        <h3>Product Expiry:</h3>
                        {item.auction_end_time || "No end time available"}
                    </div>

                    <div className={biddingPageStyle.status}>
                        <h3>Status:</h3>
                        Availability
                    </div>
                </div>

                <div className={biddingPageStyle.SellerDetails}>
                    <h2>Seller Details:</h2>
                    <div>
                        <h3>
                            Name: <Link to="#">{item.seller?.name || "Unknown Seller"}</Link>
                        </h3>
                        <p>Rating: <strong>{item.seller?.rating || "No rating"}</strong></p>
                    </div>
                </div>

                <div className={biddingPageStyle.currentBidInfo}>
                    <p>Asking Price: <strong>{item.current_bid || "Not available"}</strong></p>
                    <p>Stock: <strong>{item.stock || "Not available"}</strong></p>
                </div>

                <div className={biddingPageStyle.biddingValueBox}>
                    <div className={biddingPageStyle.searchBox}>
                        <input
                            type="number"
                            value={bidMoney}
                            placeholder="Enter your bid"
                            onChange={handleOnChange}
                            className={biddingPageStyle.bidBox}
                        />
                        <button className={biddingPageStyle.btn} type="button" onClick={handleBid}>Place Bid</button>
                        <button className={biddingPageStyle.btn} type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>

            </div>

            <div className={biddingPageStyle.bidInfo}>
                <h1>Product Bids</h1>

                {item.bid_history?.length > 0 ? (
                    item.bid_history.map((history, index) => (
                        <div key={index} className={biddingPageStyle.bidData}>
                            <p><strong>{history.bidder}</strong></p>
                            <em>{history.amount}</em>
                        </div>
                    ))
                ) : (
                    <p>No bids yet.</p>
                )}


            </div>
        </div>
    );
}
