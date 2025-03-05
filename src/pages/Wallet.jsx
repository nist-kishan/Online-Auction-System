import React, { useState } from 'react'
import walletStyle from "../css/wallet.module.css"
export default function Wallet() {
    const [myBalance, setMyBalance] = useState(0);
    const [addMoney, setAddMoney] = useState("");
    const handleBalance = (e) => {
        setAddMoney(e.target.value);
    }

    const handleAddMoney = () => {
        if (!addMoney || isNaN(addMoney) || parseFloat(addMoney) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        setMyBalance((prevBalance) => prevBalance + parseFloat(addMoney));
        setAddMoney("");
    }
    return (
        <div className={walletStyle.container}>
            <div className={walletStyle.mainContainer}>
                <div className={walletStyle.currentBalance}>
                    <h1>My Wallet</h1>
                    <p>Wallet Balance <strong>{myBalance}</strong></p>
                </div>
                <div className={walletStyle.addBalance}>
                    <h1>Add Money in Wallet</h1>
                    <p>Amount <input type="number" placeholder='Enter amount' onChange={handleBalance} value={addMoney} /></p>
                    <div className={walletStyle.btnContainer}>
                    <button onClick={handleAddMoney} className={walletStyle.addBtn}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
