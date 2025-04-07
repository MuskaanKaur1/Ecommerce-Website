import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { useContext } from "react";
import { MyContext } from "../../App";

const Wishlist = () => {
    const { user, wishlistItems = [],setWishlistItems, removeFromWishlist, addToCart } = useContext(MyContext); // Ensure wishlistItems is always an array

     // Remove item from wishlist
     const handleRemove = (id) => {
        setWishlistItems(prevWishlist => prevWishlist.filter(item => item.id !== id));
    };

    return (
        <section className="section wishlistPage">
            <div className="container">
                {!user ? (
                    <div className="empty-wishlist text-center">
                        <h2>Your wishlist is empty</h2>
                        <p>Sign in to view your wishlist</p>
                        <Link to="/SignIn">
                            <Button className="btn-blue bg-red btn-lg btn-round btn-big mr-2">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                ) : wishlistItems.length === 0 ? (
                    <div className="empty-wishlist text-center">
                        <h2>Your wishlist is empty</h2>
                        <p>Start adding items you love</p>
                        <Link to="/">
                            <Button className="btn-blue bg-red btn-lg btn-round btn-big mr-2">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-9 pr-5">
                            <div className="table responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th width="40%">Product</th>
                                            <th width="20%">Price</th>
                                            <th width="20%">Actions</th>
                                            <th width="10%">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistItems.map((item) => (
                                            <tr key={item.id}>
                                                <td width="40%">
                                                    <Link to={`/product/${item.id}`}>
                                                        <div className="d-flex align-items-center wishlistItemimg">
                                                            <div className="info px-3">
                                                                <h6>{item.name}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td width="20%">${item.price.toFixed(2)}</td>
                                                <td width="20%">
                                                    <Button
                                                        className="btn-blue btn-sm"
                                                        onClick={() => addToCart(item)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </td>
                                                <td width="10%">
                                                <span 
                                                        className="remove" 
                                                        onClick={() => handleRemove(item.id)}
                                                        style={{ cursor: "pointer", color: "red" }} // Make icon clickable and red
                                                    >
                                                        <IoCloseOutline />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};


export default Wishlist;
