import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ProductItem from "../../Components/ProductItem/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CategoryPage = () => {
    const { category } = useParams(); // Get category from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state


    useEffect(() => {
        console.log("Fetching category:", category); // Debugging
    
        if (category) {
            setLoading(true); // Start loading
            fetchDataFromApi(`/api/product?category=${category}`).then((res) => {
                console.log("Filtered API Response:", res.products); // Debugging
                setProducts(res.products || []); // Ensure it doesn't break if `res.products` is undefined
                setLoading(false); // Stop loading
            }).catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false); // Stop loading even if there's an error
            });
        }
    }, [category]);
    
    
    
    

    // Function to split products into chunks of 4
    const chunkProducts = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    // Split the products into rows of 4
    const productChunks = chunkProducts(products, 4);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 hd">{category} Products</h2>

            <div className="product_row w-100 mt-4">
                <div className="row">
                {loading ? (
                    <p className="text-center">Loading products...</p> 
                ) : products.length > 0 ? ( 

                        productChunks.map((chunk, index) => (
                            <div className="col-12" key={index}>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    slidesPerGroup={4}
                                    navigation
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    {chunk.map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <ProductItem item={item} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;