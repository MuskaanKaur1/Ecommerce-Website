import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation,Autoplay } from 'swiper/modules';
import HomeBanner1 from '../../assets/images/HomeBanner1.png'
import HomeBanner2 from '../../assets/images/HomeBanner2.png'
import HomeBanner3 from '../../assets/images/HomeBanner3.png'
import HomeBanner4 from '../../assets/images/HomeBanner4.png'


const HomeBanner=()=>{

    

    return(
    <>
    <div className="container mt-3">
        <div className="homeBannerSection">
        <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={true}
                    loop={false}
                    autoplay={{
                      delay:2500,
                      disableOnInteraction:false,  
                    }}
                    modules={[Navigation,Autoplay]}
                    className="mySwiper"
                >

                <SwiperSlide>
                <div className="item">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/efd94113852091.562790f4bc406.jpg" className="w-100"/>
                </div>
                </SwiperSlide>

                <SwiperSlide>
                <div className="item">
                    <img src={HomeBanner2} className="w-100"/>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="item">
                    <img src="https://ciyashop.potenzaglobalsolutions.com/home-slider/wp-content/uploads/sites/18/2018/05/shop.jpg" className="w-100"/>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="item">
                    <img src="https://styleclothe.com/wp-content/uploads/2022/09/slide-2.jpg" className="w-100"/>
                </div>
                </SwiperSlide>
            </Swiper>
        </div>
        </div>
        
        </>
    )
}

export default HomeBanner;

