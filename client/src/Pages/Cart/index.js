import axios from "axios";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { IoMdCart } from "react-icons/io";
import QuantityBox from "../../Components/QuantityBox";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

const Cart = () => {
    const { user, cartItems=[], removeFromCart, setCartItems} = useContext(MyContext);

    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    // Function to update quantity in cart
    const updateQuantity = (id, quantity) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item
            )
        );
    };
    
    useEffect(() => {
        setCartItems(prevItems => 
            prevItems.map(item => ({
                ...item,
                quantity: Number(item.quantity) || 1,  // Ensure quantity is always at least 1
            }))
        );
    }, []);
    
    
    // Calculate subtotal and total
    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => {
            const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
            return acc + itemTotal;
        }, 0).toFixed(2);
    };
    
    const totalPrice = calculateSubtotal(); // Store total price
    
    const handleCheckout = async () => {
        if (!address) {
            alert("Please enter your address before placing the order.");
            return;
        }
    
        const orderData = {
            user: user._id,
            cartItems: cartItems.map(item => ({
                id: item.id || item._id,  // Ensure 'id' is included
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
            })),
            totalPrice: parseFloat(totalPrice),
            address,
        };
        
    
        console.log("Sending order data:", orderData);
    
        try {
            const response = await axios.post("http://localhost:4000/api/order/place-order", orderData);
            
            console.log("Order Response:", response.data);
    
            alert("Order placed successfully! ");
    
            setShowModal(false);  // Close modal
            setCartItems([]);      // Clear cart after successful order
    
        } catch (error) {
            console.error("Checkout Error:", error.response ? error.response.data : error.message);
            alert("Error placing order. Please try again.");
        }
    };
    
    
    console.log("Cart Items before placing order:", cartItems);

    return (
        <section className="section cartPage">
            <div className="container">
                {/* If user is not logged in, show sign-in message and button */}
                {!user ? (
                    <div className="empty-cart text-center">
                        <h2>Your cart is empty</h2>
                        <p>Sign in to shop</p>
                        <Link to="/SignIn">
                            <Button className="btn-blue bg-red btn-lg btn-round btn-big mr-2">
                                Sign In 
                            </Button>
                        </Link>
                    </div>
                ) : cartItems.length === 0 ? (
                    // If user is logged in but has no items
                    <div className="empty-cart text-center">
                         <h2>Your cart is empty</h2>
                        <p>Start adding items to your cart</p>
                        <Link to="/">
                            <Button className="btn-blue bg-red btn-lg btn-round btn-big mr-2">
                                Shop Now
                            </Button>
                        </Link>

                    </div>
                ) : (
                    // If user is logged in and has items, show the cart table and details
                    <div className="row">
                        <div className="col-md-9 pr-5">
                            <div className="table responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th width="35%">Product</th>
                                            <th width="15%">Unit Price</th>
                                            <th width="25%">Quantity</th>
                                            <th width="15%">Subtotal</th>
                                            <th width="10%">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map(item => (
                                            <tr key={item.id}>
                                                <td width="35%">
                                                    <Link to={`/product/${item.id}`}>
                                                        <div className="d-flex align-items-center cartItemimg">
                                                            <div className="info px-3">
                                                                <h6>{item.name}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td width="15%">Rs:{(Number(item.price) || 0).toFixed(2)}</td>
                                                <td width="25%">
                                                <QuantityBox
                                                    quantity={item.quantity ?? 1}  // Ensure quantity is always at least 1
                                                    onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                                                />

                                                </td>
                                                <td width="15%">
                                                    Rs:{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                                                </td>
                                                <td width="10%">
                                                    <span className="remove" onClick={() => handleRemove(item.id)}>
                                                        <IoCloseOutline />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card shadow p-3 cartDetails">
                                <h5>CART TOTALS</h5>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Subtotal</span>
                                    <span className="ml-auto text-red font-weight-bold">Rs:{totalPrice}</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Shipping</span>
                                    <span className="ml-auto">Free</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Estimate for</span>
                                    <span className="ml-auto"><b>India </b></span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Total</span>
                                    <span className="ml-auto text-red font-weight-bold">Rs:{totalPrice}</span>
                                </div>
                                <Button className='btn-blue bg-red btn-lg btn-round ml-3'onClick={() => setShowModal(true)}>
                                    <IoMdCart />&nbsp; Cash On Delivery
                                </Button>

                                {showModal && (
                                    <div className="modal">
                                    <div className="modal-content">
                                        <h2>Enter Your Address</h2>
                                        <input
                                        type="text"
                                        placeholder="Enter your address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            marginBottom: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px"
                                        }}
                                        />
                                        <div>
                                            <Button onClick={handleCheckout} style={{ background: "green", color: "white" }}>Confirm Order</Button>
                                            <Button onClick={() => setShowModal(false)} style={{ background: "red", color: "white" }}>Cancel</Button>
                                        </div>
                                        </div>
                                    </div>
                                )}




                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
