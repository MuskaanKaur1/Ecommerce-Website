import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomeCat = ({ catData, selectCat }) => {

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        console.log("Clicked Category:", category); // Debugging
        if (!category) {
            console.error("Category is undefined!");
            return;
        }
        navigate(`/category/${encodeURIComponent(category)}`);
    };
    
    
    

    return (
        <>
            <section className="homeCat">
                <div className="container">
                    <h3 className="mb-4 hd">Featured Categories</h3>
                    <Swiper
                        slidesPerView={7}
                        spaceBetween={15}
                        navigation={true}
                        slidesPerGroup={1}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {catData?.length > 0 &&
                            catData.map((cat, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="item text-center cursor category-circle"
                                        style={{ background: cat.color }}
                                        onClick={() => handleCategoryClick(cat?.name)} // Ensure it's defined
                                    >
                                        <img
                                            src={`http://localhost:4000/uploads/${encodeURIComponent(cat.images[0])}`}
                                            alt={cat.name || "Category Image"}
                                            onError={(e) => (e.target.src = "fallback-image.png")}
                                        />
                                    </div>
                                    <h5 className="text-center">{cat.name}</h5>
                                </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default HomeCat;
