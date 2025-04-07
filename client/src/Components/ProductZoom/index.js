import { useState, useEffect } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const ProductZoom = (props) => {
    const baseUrl = "http://localhost:4000/uploads/";

    // **Fix: Reset zoomImage when a new product is selected**
    const [zoomImage, setZoomImage] = useState("");

    useEffect(() => {
        if (props?.images?.length > 0) {
            setZoomImage(`${baseUrl}${props.images[0]}`); // Set the first image as default
        }
    }, [props.images]); // Runs when images change

    return (
        <div className="productZoom">
            <div className='productZoom position-relative'>
                <div className="badge badge-primary">28%</div>

                {/* Main Image Section */}
                <div className="main-image">
                    {zoomImage ? (
                        <InnerImageZoom src={zoomImage} zoomType="hover" zoomScale={1.5} className="w-100"/>
                    ) : (
                        <p>No image available</p> // Handle missing images
                    )}
                </div>

                {/* Thumbnail Slider */}
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    navigation
                    modules={[Navigation]}
                    className="zoomSlider"
                >
                    {props?.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="item">
                                <img 
                                    src={`${baseUrl}${img}`} 
                                    className="w-100" 
                                    onClick={() => setZoomImage(`${baseUrl}${img}`)}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ProductZoom;
