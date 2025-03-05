import React from 'react'

export default function AllContact() {
  return (
    <div className={myBidStyle.container}>
                <h1>My Bids</h1>
                <table className={myBidStyle.tableContainer}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Seller</th>
                            <th>Asking Price</th>
                            <th>Bid Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {myBid.length > 0 ? (
                            myBid.map((bid, index) => (
                                <tr key={index}>
                                    <td><img src={bid.product_image} alt={bid.name} width="100" /></td>
                                    <td>{bid.name}</td>
                                    <td>{bid.seller}</td>
                                    <td>Rs.{bid.asking_price}</td>
                                    <td>Rs.{bid.bid_amount}</td>
                                    <td>{bid.status}</td>
                                    <td><button className={myBidStyle.viewBtn}>{bid.action}</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No bids placed yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
  )
}
