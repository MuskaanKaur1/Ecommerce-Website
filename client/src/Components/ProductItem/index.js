import ProductModel from "../ProductModel";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";  // Import both icons
import Button from '@mui/material/Button';
import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";  //  Correct import
import { MyContext } from "../../App";
import Slider from "react-slick";

const ProductItem = (props) => {
    const context = useContext(MyContext);
    const [isOpenProductModel, setisOpenProductModel] = useState({
        id: '',
        open: false
    });
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef();
    const { wishlistItems, setWishlistItems } = useContext(MyContext); // Wishlist context

      //  Check if item is in wishlist
      const isInWishlist = wishlistItems.some(item => item.id === props.item._id);

      // Toggle Wishlist Function
      const toggleWishlist = () => {
          setWishlistItems(prevWishlist =>
              isInWishlist
                  ? prevWishlist.filter(item => item.id !== props.item._id) // Remove if already in wishlist
                  : [...prevWishlist, { id: props.item._id, name: props.item.name, price: props.item.price }]
          );
      };

    const viewProductDetails = (id) => {
        context.setisOpenProductModel({
            id: id,
            open: true
        });
    };

    const closeProductModel = () => {
        setisOpenProductModel({ id: '', open: false });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: true,
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPlay();
            }
        }, 20);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }
        }, 20);
    };

    return (
        <>
            <div className={`productItem ${props.itemView}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="imgWrapper">
                        <Link to={`/product/${props.item._id}`}>  
                    <div className="imgInner">
                    
                            {isHovered && props?.item?.images[1] ? (
                                <img 
                                    src={`http://localhost:4000/uploads/${props?.item?.images[1]}`} 
                                    className="w-100 hover-image"
                                    alt={props?.item?.name} 
                                    onError={(e) => { e.target.src = "/fallback-image.jpg"; }} 
                                />
                            ) : (
                                <img 
                                    src={`http://localhost:4000/uploads/${props?.item?.images[0]}`} 
                                    className="w-100" 
                                    alt={props?.item?.name} 
                                    onError={(e) => { e.target.src = "/fallback-image.jpg"; }} 
                                />
                            )}

                        </div>
                    </Link>

                    <span className="badge badge-primary">{props?.item?.discount}%</span>

                    <div className="actions">
                        <Button onClick={() => viewProductDetails(props.item._id)}>
                            <AiOutlineFullscreen />
                        </Button>
                        
                         {/*  Wishlist Button with Toggle Effect */}
                         <Button onClick={toggleWishlist}>
                        {isInWishlist ? (
                            <IoMdHeart style={{ fontSize: '20px', color: "red" }} />  //  Red filled heart when in wishlist
                        ) : (
                            <IoMdHeartEmpty style={{ fontSize: '20px', color: "#ffffff", stroke: "black", strokeWidth: "10" }} />  //  White empty heart with black outline
                        )}
                    </Button>


                    </div>
                </div>

                <div className="info">
                    <Link to={`/product/${props.item._id}`}>
                    <h5>
                    {props?.item?.name.length > 30 
                        ? props?.item?.name.substr(0, 30) + '...' 
                        : props?.item?.name}
                    </h5>

                    </Link>
                    <span className="text-success d-block">In stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />
                    <div className="d-block">
                        <span className="oldPrice">Rs{props?.item?.oldPrice}</span>
                        <span className="newPrice text-danger ml-3">Rs{props?.item?.price}</span>
                    </div>
                </div>
            </div>

            {isOpenProductModel.open && <ProductModel data={props.item} closeProductModel={closeProductModel} />}
        </>
    );
};

export default ProductItem;
