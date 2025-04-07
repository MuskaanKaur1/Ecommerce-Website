import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import Footer from "./Components/Footer";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ProductModel from "./Components/ProductModel";
import { fetchDataFromApi } from "./utils/api";
import Profile from './Components/Profile'; // Import Profile component
import Wishlist from './Pages/WishList/Wishlist';
import AllProducts from "./Pages/All Products/AllProducts";
import CategoryPage from './Pages/CategoryPage/CategoryPage';



const MyContext =createContext();

function App() {

  const [countryList,setCountryList]= useState([]);
  const [selectedCountry,setselectedCountry]= useState('');
  
  const[isOpenProductModel,setisOpenProductModel]=useState(false);  

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

 
  const[isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [productsData, setProductsData] = useState();

  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const [isLogin, setIsLogin] = useState(localStorage.getItem("user") ? true : false);

  const[activeCat, setActiveCat] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [wishlistItems, setWishlistItems] = useState([]);  // Add this in your context provider

  const [searchQuery, setSearchQuery] = useState("");


  useEffect(()=>{
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  },[]);


  fetchDataFromApi('/api/category').then((res)=>{
    if (res.categoryList && res.categoryList.length > 0) {
        setCategoryData(res.categoryList);
        setActiveCat(res.categoryList[0].name);
    } else {
        console.log("No categories found");
        setCategoryData([]);
        setActiveCat("");
    }
});



  useEffect(()=>{
    isOpenProductModel.open===true &&
    fetchDataFromApi(`/api/product/${isOpenProductModel.id}`).then((res)=>{
      setProductsData(res);
    })
  },[isOpenProductModel]);

  const getCountry=async(url)=>{
    const response=await axios.get(url).then((res)=>{
      setCountryList(res.data.data)
    })
  }


  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    if (storedUser) {
        setUser(storedUser);
        setIsLogin(true);
    }
}, []);



  const addToCart = (product) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
            return prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + product.quantity } // Correctly add selected quantity
                    : item
            );
        }
        return [...prevItems, { ...product }]; // Add new product with selected quantity
    });
};


  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

const values={
  countryList,
  selectedCountry,
  setselectedCountry,
  isHeaderFooterShow,
  setisHeaderFooterShow,
  isLogin,
  setIsLogin,
  isOpenProductModel,
  setisOpenProductModel,
  productsData,
  setProductsData,
  categoryData,
  setCategoryData,
  activeCat,  
  setActiveCat,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  user,
  setUser,
  wishlistItems, 
  setWishlistItems,
  searchQuery,    
  setSearchQuery
}



  return (
    <BrowserRouter>
    <MyContext.Provider value={values}>

    {
      isHeaderFooterShow === true && <Header/>
    }

    
    <Routes>
      <Route path='/' exact={true} element={<Home/>}/>
      <Route path='/cat/:id' exact={true} element={<Listing/>}/>
      <Route path='/product/:id' exact={true} element={<ProductDetails/>}/>
      <Route path='/cart' exact={true} element={<Cart/>}/>
      <Route path='/SignIn' exact={true} element={<SignIn/>}/>
      <Route path='/SignUp' exact={true} element={<SignUp/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/category/:category" element={<CategoryPage />} key={window.location.pathname} />
      


    </Routes>

    {
      isHeaderFooterShow === true && <Footer/>
    }


    {
      isOpenProductModel.open ===true && <ProductModel data={productsData}/>
    }
    </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export {MyContext}