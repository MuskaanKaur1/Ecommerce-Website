import HomeBanner from "../../Components/HomeBanner";
import banner from "../../assets/images/banner.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner4.png";

import Button from '@mui/material/Button';
import { FaLongArrowAltRight } from "react-icons/fa";
import * as React from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import HomeCat from "../../Components/HomeCat";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation } from 'swiper/modules';

import { CiMail } from "react-icons/ci";
import newsletter from "../../assets/images/newsletter.png";
import ProductItem from "../../Components/ProductItem";
import banner6 from "../../assets/images/banner6.png";
import { fetchDataFromApi } from "../../utils/api";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";

import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useNavigate } from "react-router-dom"; 


const Home=()=>{


    const [catData, setCatData] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [electronicsData, setElectronicsData] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    const { searchQuery } = useContext(MyContext); 
      
    const context = useContext(MyContext);

    const navigate = useNavigate();

      useEffect(()=>{
        window.scrollTo(0,0);

        setSelectedCat(context.categoryData?.name);

        fetchDataFromApi('/api/category').then((res)=>{
            setCatData(res);
        })

        fetchDataFromApi('/api/product/featured').then((res)=>{
            setFeaturedProducts(res)
        })
        
    },[])

    useEffect(() => {
        fetchDataFromApi("/api/product").then((res) => {
            setProductsData(res.products);
        });
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selectCat = (cat) => {
        navigate(`/category/${cat}`); // Navigate to category page
    };
    
    
    
    useEffect(() => {
        console.log("Selected Category:", selectedCat); // Debugging
        if (selectedCat) {
            fetchDataFromApi("/api/product").then((res) => {
                console.log("API Response:", res.products); // Debugging
                const filtered = res.products.filter(
                    product => product.category?.name === selectedCat // ✅ Correct field check
                );
                console.log("Filtered Products:", filtered); // Debugging
                setFilteredData(filtered);
            });
        }
    }, [selectedCat]);
    
                   


        const filteredProducts = productsData.filter(product =>
            (!selectedCat || product.category === selectedCat) && // Filter by category
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
        );
        
        fetchDataFromApi(`/api/product`).then(res => console.log(res.products));





    return(
        <>
       <HomeBanner/>
       
       {
            context.categoryData?.length !==0 && <HomeCat catData={context.categoryData} selectCat={selectCat}/>
        }


       <section className='homeProducts'>
        <div className='row'>
            <div className='col-md-3'>
                <div className="banner">
                    <img src={banner} className="cursor" />
                </div>
                <div className="banner mt-5">
                    <img src={banner2} className="cursor" />
                </div>
                <div className="banner mt-5">
                    <img src={banner3} className="cursor" />
                </div>
                <div className="banner mt-5">
                    <img src={banner4} className="cursor" />
                </div>
            </div>

            <div className='col-md-9 productRow'>
                <div className="d-flex align-items-center">
                    <div className="info w-75">
                        <h3 className="mb-0 hd">BEST SELLERS</h3>
                        <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                    </div>
                    <div className="ml-auto">
                    <Button className="viewAllBtn ml-auto btn-blue btn-round btn-big text-white" onClick={() => navigate("/all-products")}>View All<FaLongArrowAltRight/></Button>
                        </div>
                        </div>

                    <div className="product_row w-100 mt-4">
                    <Swiper slidesPerView={4} spaceBetween={10} slidesPerGroup={2} modules={[Navigation]} className="mySwiper">
                        {filteredProducts.length !== 0 ? (
                            filteredProducts.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ProductItem item={item} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </Swiper>


                </div>


{/*

                <div className="product_row w-100 mt-4">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    slidesPerGroup={3}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        filteredData?.length!==0 && filteredData?.map((item,index) => {
                            return(
                                <SwiperSlide key={index}>
                                    <ProductItem item={item}/>
                                </SwiperSlide>

                            )
                        })
                    }
                </Swiper>
            </div>
*/}        
         


            <div>
           <div className="banner">
                <img src={banner6} className="cursor" />
           </div>
 
            </div>
                <div className="d-flex align-items-center mt-5">
                    <div className="info">
                        <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                        <p className="text-light text-sml mb-0">New products with updated stocks</p>
                        </div>
                        <Button className="viewAllBtn ml-auto btn-blue btn-round btn-big text-white" onClick={() => navigate("/all-products")}>View All<FaLongArrowAltRight/></Button>

                    </div>

                    <div className="product_row w-100 mt-4">
                        <div className="row">
                            {/* First row: First 5 products */}
                            <div className="col-12">
                                <Swiper slidesPerView={4} spaceBetween={10} slidesPerGroup={5} modules={[Navigation]} className="mySwiper">
                                    {filteredProducts.slice(0, 5).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <ProductItem item={item} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Second row: Next 5 products */}
                            <div className="col-12 mt-4">
                                <Swiper slidesPerView={4} spaceBetween={10} slidesPerGroup={5} modules={[Navigation]} className="mySwiper">
                                    {filteredProducts.slice(5, 10).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <ProductItem item={item} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>

{/*
                <div className="d-flex align-items-center mt-5">
                    <div className="info w-75">
                        <h3 className="mb-0 hd">FEATURED PRODUCTS</h3>
                        <p className="text-light text-sml mb-0">New products with updated stocks</p>
                    </div>
                    <Button className="viewAllBtn ml-auto">View All<FaLongArrowAltRight/></Button>
                </div>

                <div className="product_row w-100 mt-4">

                
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >

                {
                    productsData?.products?.length !==0 && productsData?.products?.map((item,index) => {
                        return(
                            <SwiperSlide key={index}>
                                <ProductItem item={item}/>
                            </SwiperSlide>

                        )
                    })
                }
                    
                </Swiper>
                </div>
*/}            

            </div>
        </div>
       </section>

       <section class="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="text-white mb-1">$20 discount for your first order</p>
                    <h3 class="text-white">Join our newsletter and get...</h3>
                    <p class="text-white">Join our email subscription now to get updates on<br/> promotions and coupons.</p>
                    <form class="mt-4">
                    <div>
                    <CiMail/><input type="text"  placeholder="Your Email Address"/>
                    <button className="bg-purple">Subscribe</button>
                    </div>
                    
                        </form>
                        </div>
                        <div class="col-md-6">
                            <img src={newsletter}/>
                        </div>
            </div>
        </div>
        </section>
      


       
        </>
    )
}

export default Home;