import React from 'react'
import part1Style from "../../css/homePagePart1.module.css"
export default function Part1() {
    return (
        <div className={part1Style.container}>
            <div className={part1Style.message}>
                <p>Bid, Win, Thrive: Your Auction Adventure Begins!</p>
                <p>Inspiring acutions connecting bidders,forging digital commerce journeys together.</p>
                <div className={part1Style.lastMessage}>
                <div className={part1Style.leftImage}></div>
                <p>Elevate Acutins,Empower Bidders</p>
                <div className={part1Style.rightImage}></div>
                </div>
            </div>
            <div className={part1Style.sideImage}>
            </div>
        </div>
    )
}
