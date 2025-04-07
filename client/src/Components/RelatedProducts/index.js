import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation } from 'swiper/modules';
import React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from '../ProductItem';



const RelatedProducts=(props)=>{
    return(
        <>
        <div className='col-md-9 productRow1 mt-3'>
                <div className="d-flex align-items-center">
                    <div className="info w-75">
                        <h3 className="mb-0 hd"></h3>
                    </div>
                </div>


                
                <div className="product_row w-100 mt-0">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    slidesPerGroup={3}
                    modules={[Navigation]}
                    className="mySwiper"
                >

{/*                    {
                        props?.data?.length !==0 && props?.data?.map((item,index)=>{
                            return(
                                <SwiperSlide key={index}>
                                    <ProductItem item={item}/>
                                </SwiperSlide>
                            )
                        })
                    }
*/}                 
                </Swiper>
            </div>
            </div>
        </>
    )
}

export default RelatedProducts;