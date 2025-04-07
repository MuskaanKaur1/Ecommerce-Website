import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoIosSearch } from "react-icons/io";
import { MyContext } from "../../../App";

const SearchBox = () => {
    const { setSearchQuery } = useContext(MyContext); // Get function from context
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        setSearchQuery(value); // Update global state
    };

    return (
        <div className="headerSearch ml-3 mr-3">
            <input 
                type="text" 
                placeholder="Search for products..." 
                value={query} 
                onChange={handleSearch} 
            />
            <Button><IoIosSearch /></Button>
        </div>
    );
};

export default SearchBox;
