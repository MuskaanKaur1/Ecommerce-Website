import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import ProductItem from "../../Components/ProductItem";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        window.scrollTo(0, 0);
        
        fetchDataFromApi("/api/product").then((res) => {
            setProducts(res.products);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="row">

                
                {products.length !== 0 ? (
                    products.map((item, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <ProductItem item={item} />
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
