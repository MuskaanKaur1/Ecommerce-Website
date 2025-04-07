import Dashboard from "./pages/Dashboard";
import './App.css';
import './responsive.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import React,{ createContext, useEffect, useState, useRef } from "react";
import Register from "./pages/Register";

import Products from "./pages/Products";
import AddProduct from "./pages/Products/addProduct";
import EditProduct from "./pages/Products/editProduct";
import ProductDetails from "./pages/ProductDetails";

import Category from "./pages/Category/categoryList";
import AddCategory from "./pages/Category/addCategory";
import EditCategory from "./pages/Category/editCategory";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from "react-top-loading-bar";
import { fetchDataFromApi } from "./utils/api";
import AddProductRAMS from "./pages/Products/addProductRAMS";



const MyContext = createContext();


function App() {

  const [isLogin,setIsLogin] = useState(true);
  const [isHideSidebarAndHeader,setisHideSidebarAndHeader] = useState(false);
  const [themeMode,setThemeMode] = useState(true);

  const [isOpenNav,setIsOpenNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [catData, setCatData] = useState([]);

  
    
  const [progress, setProgress] = useState(0);
  const [baseUrl, setBaseUrl] = useState("http://localhost:4000");

  const [alertBox, setAlertBox] = useState({
    msg:'',
    error:false,
    open:false
  })


  useEffect(()=>{

    const theme_Mode = localStorage.getItem('themeMode');

    if(themeMode===true){
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode','light');
    }
    else{
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode','dark');
    }
  },[themeMode]);


  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open:false,
    });
  };

  useEffect(()=>{
      setProgress(40)
      fetchCategory();
      //fetchSubCategory();

      setProgress(100)
  },[]);

  const fetchCategory=()=>{
    fetchDataFromApi('/api/category').then((res)=>{
      setCatData(res);
      setProgress(100);
    })
  }
  
  useEffect(()=>{

    const handleResize = ()=>{
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize',handleResize);

  return()=>{
    window.removeEventListener('resize',handleResize);
  };
  },[]);



  const openNav=()=>{
    setIsOpenNav(true);
  }

  const values={
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    alertBox, 
    setAlertBox,
    progress,
    setProgress,
    baseUrl,
    setBaseUrl,
    catData,
    setCatData,
    fetchCategory,
  }


  return (
    
    <BrowserRouter>
    <MyContext.Provider value={values}>
    <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className="topLoadingBar"
      />


    <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertBox.error===false ? "success" : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertBox.msg}
        </Alert>
      </Snackbar>


      {
         isHideSidebarAndHeader!==true && 
        <Header/>
      }
    
    <div className="main ">
      {
        isHideSidebarAndHeader!==true && 
        <>
        <div className={`sidebarOverlay d-none  ${isOpenNav===true && 'show'}`} onClick={()=>setIsOpenNav(false)}>
          <div className={`sidebarWrapper ${isOpenNav===true ? 'open' : ''}`} >
            <Sidebar/>
          </div>
        </div>
        </>
      }

      <div className={`content ${ isHideSidebarAndHeader!==true && 'full'}`}>
        <Routes>
          <Route path="/" exact={true} element={<Dashboard/>}/>
          <Route path="/dashboard" exact={true} element={<Dashboard/>}/>
          <Route path="/Login" exact={true} element={<Login/>}/>
          <Route path="/Register" exact={true} element={<Register/>}/>
          <Route path="/products" exact={true} element={<Products/>}/>
          <Route path="/product/add" exact={true} element={<AddProduct/>}/>
          <Route path="/product/edit/:id" exact={true} element={<EditProduct/>}/>
          <Route path="/product/details" exact={true} element={<ProductDetails/>}/>
          <Route path="/category" exact={true} element={<Category/>}/>
          <Route path="/category/add" exact={true} element={<AddCategory/>}/>
          <Route path="/category/edit/:id" exact={true} element={<EditCategory/>}/>


        </Routes>
      </div>
    </div>

    </MyContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
export {MyContext};
