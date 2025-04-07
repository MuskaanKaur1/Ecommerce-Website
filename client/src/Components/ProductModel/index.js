import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IoMdClose } from "react-icons/io";
import Rating from '@mui/material/Rating';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { IoMdHeart } from "react-icons/io";  

import QuantityBox from '../QuantityBox';
import ProductZoom from '../ProductZoom';
import { useState, useEffect, useContext } from "react";
import { MyContext } from '../../App';


const ProductModel=(props)=>{

    const context = useContext(MyContext);
    const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useContext(MyContext);
    const [activeSize, setActiveSize] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const [isFavorite, setIsFavorite] = useState(false);

    const productToAdd = {
        id: props?.data?.id,
        name: props?.data?.name,
        price: props?.data?.price,
        imageUrl: props?.data?.images?.[0]
    };

    
    const isActive=(index)=>{
        setActiveSize(index);
    }

     // ✅ Update local state when `wishlistItems` changes
     useEffect(() => {
        setIsFavorite(wishlistItems.some(item => item.id === productToAdd.id));
    }, [wishlistItems, productToAdd.id]);


    const addToCart = () => {
        setCartItems(prevItems => {
            const existingProduct = prevItems.find(item => item.id === productToAdd.id);
            return existingProduct
                ? prevItems.map(item => 
                    item.id === productToAdd.id 
                        ? { ...item, quantity: item.quantity + quantity } 
                        : item
                )
                : [...prevItems, productToAdd];
        });

        context.setisOpenProductModel(false);
    };
    
    
    // ✅ Toggle Wishlist Function
    const toggleWishlist = () => {
        setWishlistItems(prevWishlist =>
            isFavorite
                ? prevWishlist.filter(item => item.id !== productToAdd.id) // Remove from wishlist
                : [...prevWishlist, productToAdd] // Add to wishlist
        );

        setIsFavorite(!isFavorite); // Toggle local state to update UI immediately
    };



    return(
        <>
        <Dialog open={context.isOpenProductModel} className='productModel' onClose={()=> context.setisOpenProductModel(false)}>
            <Button className="closeIcon" onClick={()=> context.setisOpenProductModel(false)}><IoMdClose/></Button> 
            

                <div className='row mt-2 productDetailsModel'>
                    <div className="col-md-5">

        {/*Product zoom starts here*/}

        <ProductZoom images={props?.data?.images || []} discount={props?.data?.discount} />

                        
                    </div>

        {/*Product zoom ends here*/}


                    <div className="col-md-7">
                        <div className='d-flex align-items-center'>
                            <h4 className="mb-1 font-weight-bold ">{props?.data?.name}</h4> 
                        </div>
                         
                        <div className='d-flex align-items-center'>
                            <span>Brands:</span>     
                            <span className='ml-2'><b>{props?.data?.brand}</b></span>
                        </div>    

                        <div className='d-flex align-items-center'>
                                <Rating className=" mt-2 mb-2" name="read-only" value={props?.data?.rating} readOnly size="small" precision={0.5} />
                        </div>

                                <div className="d-block">
                                    <span className="oldPrice ">Rs:{props?.data?.oldPrice}</span>
                                    <span className="newPrice text-danger ml-3">Rs:{props?.data?.price}</span>
                                </div>
                                <span className="badge bg-success">In stock</span>
                                <p className='mt-3'>{props?.data?.description}</p>


{/*                               
                                <div className="productSize d-flex align-items-center mb-0 pl-4">
                                    <span className='Text'>Select Size &nbsp;</span>
                                    <ul className='list list-inline'>
                                        <li className='list-inline-item'><a className={`tag ${activeSize===0 ? 'active':''}`} onClick={()=>isActive(0)}>S</a></li>
                                        <li className='list-inline-item'><a className={`tag ${activeSize===1 ? 'active':''}`} onClick={()=>isActive(1)}>M</a></li>
                                        <li className='list-inline-item'><a className={`tag ${activeSize===2 ? 'active':''}`} onClick={()=>isActive(2)}>L</a></li>
                                        <li className='list-inline-item'><a className={`tag ${activeSize===3 ? 'active':''}`} onClick={()=>isActive(3)}>XL</a></li>
                                    </ul>
                                </div>
*/} 


                                <div className='d-flex align-items-center'>
                                    <QuantityBox quantity={quantity} onQuantityChange={setQuantity} />
                                    <Button className='btn-blue btn-1 btn-big btn-round ml-3' onClick={addToCart}>
                                        Add to Cart
                                    </Button>
                                </div>

                                <div className='d-flex align-items-center mt-4 actions'>
                                    
                                {/* ✅ Toggle Wishlist Button with Dynamic Heart Color */}
                            <Button 
                                className='btn-round btn-sml' 
                                variant="outlined" 
                                onClick={toggleWishlist}
                                >
                                <IoMdHeart  style={{ color: isFavorite ? "red" : "black" }}/>&nbsp;{isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                            </Button>

                            
                                    
                                </div>


                            </div>

            </div>
        </Dialog>
        </>
    )
}

export default ProductModel;