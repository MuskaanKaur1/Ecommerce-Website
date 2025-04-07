import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

const QuantityBox = ({ quantity = 1, onQuantityChange = () => {} }) => {
    const [inputVal, setInputVal] = useState(quantity);

    useEffect(() => {
        setInputVal(quantity); // Sync state when quantity prop changes
    }, [quantity]);

    const handleMinus = () => {
        if (inputVal > 1) {
            const newVal = inputVal - 1;
            setInputVal(newVal);
            onQuantityChange(newVal);
        }
    };

    const handlePlus = () => {
        const newVal = inputVal + 1;
        setInputVal(newVal);
        onQuantityChange(newVal);
    };

    const handleChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setInputVal(value);
            onQuantityChange(value);
        }
    };

    return (
        <div className='quantityDrop d-flex align-items-center'>
            <Button onClick={handleMinus}><FaMinus/></Button>
            <input type='number' value={inputVal} onChange={handleChange} min="1"/>
            <Button onClick={handlePlus}><FaPlus/></Button>
        </div>
    );
};

export default QuantityBox;
