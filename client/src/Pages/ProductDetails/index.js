import Rating from '@mui/material/Rating';
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import Button from '@mui/material/Button';
import { MdShoppingCart } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import ProductZoom from '../../Components/ProductZoom';
import QuantityBox from '../../Components/QuantityBox';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from "../../App";
import ProductReviews from '../../Components/ProductReviews/ProductReviews';




const ProductDetails=()=>{

    const[activeSize, setActiveSize] = useState(0);
    const[activeTabs, setActiveTabs] = useState(0);
    const [productData, setProductData] = useState(null);
    const { addToCart,setCartItems, wishlistItems, setWishlistItems } = useContext(MyContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);


    const {id} = useParams();
    
    const isActive=(index)=>{
        setActiveSize(index);
    }

    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi(`/api/product/${id}`).then((res)=>{
              setProductData(res);
            })
    },[id])

    // Function to check if the product is already in the wishlist
    const isInWishlist = wishlistItems.some(item => item.id === productData?.id);

     // Function to add product to the wishlist
     const toggleWishlist = () => {
        setWishlistItems(prevWishlist => {
            const itemExists = prevWishlist.some(item => item.id === productData?.id);
    
            if (itemExists) {
                return prevWishlist.filter(item => item.id !== productData?.id); // Remove from wishlist
            } else {
                return [...prevWishlist, { ...productData }]; // Add to wishlist
            }
        });
    };
    
    if (!productData) return <div>Loading...</div>;

    

    return(
        <>
        <section className="productDetails section">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 pl-5 seze">
                    <ProductZoom images={productData?.images} discount={productData?.discount}/>
                    </div>

                    <div className="col-md-7 pl-5">
                    <h2 className="hd text-capitalize">{productData?.name}</h2>
                    <ul className="list list-inline d-flex align-items-center">
                        <li className="list-inline-item">
                            <div className="d-flex align-items-center">
                                <span className="text-light mr-2">Brands:</span>
                                
                                <span>{productData?.brand}</span>

                            </div>
                        </li>
                        
                    </ul>
                    <div className="d-flex align-items-center">
                            <Rating name="half-rating-read" defaultValue={productData?.rating} precision={0.5} readOnly size="small" className='mb-2'/>
                        
                        </div>

                        <div className="d-flex info">
                            <span className="oldPrice ">Rs:{productData?.oldPrice}</span>
                            <span className="newPrice text-danger ml-3">Rs:{productData?.price}</span>
                        </div>
                        <span className="badge bg-success ">In stock</span>
                        <p className='mt-3'>{productData?.description}</p>
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

                            <Button 
                            className='btn-blue btn-1 btn-big btn-round ml-3'
                            onClick={() => addToCart({ ...productData, quantity })} // Pass the product with quantity to add to the cart
                            >
                            <MdShoppingCart /> &nbsp;Add to Cart
                            </Button>

                            <Tooltip title="Add to Wishlist" placement="top">
                            <Button className='btn-round btn-lg btn-big btn-circle ml-4' onClick={toggleWishlist}>
                            <CiHeart color={isInWishlist ? "red" : "black"} />

                            </Button>

                            </Tooltip>
                            
                            
                        </div>
                       
                    </div>

                </div>

                <div className="card mt-5 p-5 detailsPageTabs">
                    <div className="customTabs">
                        <ul className="list list-inline">
                            <li className="list-inline-item">
                                <Button className={`${activeTabs === 0 && 'active'}`} onClick={()=>setActiveTabs(0)}>Description</Button>
                            </li>
                            <li className="list-inline-item">
                                <Button className={`${activeTabs === 1 && 'active'}`} onClick={()=>setActiveTabs(1)}>Additional Information</Button>
                            </li>
                            <li className="list-inline-item">
                                <Button className={`${activeTabs === 2 && 'active'}`} onClick={()=>setActiveTabs(2)}>Reviews</Button>
                            </li>
                        </ul>
                    {
                        activeTabs===0 && <div className="tabContent">
                        <p>{productData?.description}</p>
                        <br/>


                        <h5>Product Information</h5>
                       <hr/>
                       <ul>
                        <li>Brand:&nbsp;&nbsp;NVAASA MIX N' MATCH</li>
                        <li>Manufacturer:&nbsp;&nbsp;Reliance Retail Limited</li>
                        <li>Manufacturer Address:&nbsp;&nbsp;3Rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai-400002,India</li>
                        <li>Country of Origin:&nbsp;&nbsp;India</li>
                        <li>Marketed By:&nbsp;&nbsp;Reliance Retail Limited Shed No-77/80, Indian Corporation Godown Mankoli Naka, Village Dapode Taluka, Bhiwandi Dist. Thane Maharashtra PIN-421302</li>
                        <li>Net Quantity:&nbsp;&nbsp;1 N</li>
                        <li>Product Type:&nbsp;&nbsp;Kurtas</li>
                        </ul>
                        <br/>


                        <h5>About Brand</h5>
                        <hr/>
                        <p>Every day is different, so should be your look! Avaasa brings a designer collection of women’s Indian wear and ethnic clothes, including floral print kurtas, block print kurtis, colourful shrugs, churidar leggings and more in a range of hues.</p>
                        <br/>
                        <h5>Return Policy</h5>
                        <hr/>
                        <p>This product is returnable within 10 daysknow more.</p>



                        

                       
                    </div>
                    }

                        {activeTabs===1 && 

                        <div className="tabContent">
                            <br/>
                            <h5>Product Information</h5>
                            <hr/>
                            <ul>
                                <li>Manufacturer Information:Sanganer, Jaipur Rajasthan</li>
                                <li>Importer Information:No information available</li>
                                <li>Packer Information:sanganer jaipur</li>
                                <li>Net Weight(g):130</li>
                                <li>Supplier Information:wardrobe_trend c/o of xyzCompany</li>
                            </ul>
                            <br/>
                            <h5>Contact Information</h5>
                            <hr/>
                            <p>Meesho operates as a marketplace wherein third-party sellers engage in the sale of products to customers. To contact a seller, kindly dispatch a written communication to the address provided below including the product page URL.
                            To,
                            Seller Name - wardrobe_trend
                            PID - 392458573
                            Seller Mailbox: Contact Seller
                            3rd Floor, Wing-E, Helios Business Park,
                            Kadubeesanahalli Village, Varthur Hobli, Outer Ring Road,
                            Bengaluru, Karnataka 560103
                            </p>
                            <br/>
                            <h5>Legal Disclaimer</h5>
                            <hr/>
                            <p>Suppliers listing their products on Meesho are solely responsible for the accuracy of product information. You shall use the products in safe and legal manner, and it shall not be used for any illegal purpose. The actual product packaging, material and design may contain more or different information as mentioned here including nutritional information, declarations, claims, instructions of use, warning, disclaimers et. al. It is recommended you read the product label before using/consuming any products and do not solely rely on the product information provided on this platform. Meesho shall not assume any loss, claims, damages, or injury, that may arise from the violent or illegal use, or misuse of the product sold by the suppliers over Meesho.
                            </p>
                            <div className="table-responsive">
                                <hr/>
                                <h5>Product Details</h5>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr className="stand-up">
                                            <th>Name</th><td><p>Women Embroidered Flared Kurta</p></td></tr>
                                        <tr className="folded-wo-wheels"><th>Fabric </th><td><p>Rayon</p></td></tr><tr className="folded-w-wheels"><th>Sleeve Length </th><td><p>Three-Quarter Sleeves</p></td></tr>
                                        <tr className="door-pass-through"><th>Pattern</th><td><p>Printed</p></td></tr>
                                        <tr className="frame"><th>Como of</th><td><p>Single</p></td></tr>
                                        <tr className="weight-wo-wheels"><th>Sizes </th><td>
                                            <p>S (Bust Size : 36 in, Size Length: 45 in)</p>
                                            <p>M (Bust Size : 38 in, Size Length: 48 in)</p>
                                            <p>L (Bust Size : 40 in, Size Length: 48 in)</p>
                                            <p>XL (Bust Size : 42 in, Size Length: 48 in)</p>
                                            <p>XXL (Bust Size : 44 in, Size Length: 45 in)</p>
                                            </td></tr>
                                        
                                        <tr className="pa_color"><th>Color</th><td><p>Black, Blue, Red, White</p></td></tr>
                                        </tbody></table>

                               
                            </div>
                        </div>
                        }

                        {
                            activeTabs===2 &&
                            <ProductReviews />

                        }

                        
                    </div>
                </div>

            </div>
        </section>
        </>
    )
}

export default ProductDetails;
