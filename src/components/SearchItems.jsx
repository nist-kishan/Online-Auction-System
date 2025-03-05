import { useState, useEffect } from "react";
import BiddingCard from "./BiddingCard";
import searchItemsStyle from "../css/searchItems.module.css"
import axios from "axios";

function SearchItems() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("./data/BiddingItems.json");
                setItems(response.data.items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={searchItemsStyle.container}>
            <div className={searchItemsStyle.searchBox}>
                <input
                    type="text"
                    placeholder="Search categories..."
                    className={searchItemsStyle.searchItems}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className={searchItemsStyle.btn} type="button">Search</button>
            </div>

            <div className={searchItemsStyle.cardContainer}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <BiddingCard item={item} key={item.id}/>
                    ))
                ) : (
                    <li>No matching items found for bidding</li>
                )}
            </div>
        </div>
    );
}

export default SearchItems;
