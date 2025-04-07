import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardBox from '../Dashboard/Components/dashboardBox';

import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import React, {useState } from 'react';
import { Select} from '@mui/material';

import { FaEye } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';    
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';


import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



//breadcrumbs
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }); 

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

const Products=()=>{
    
    const context = useContext(MyContext);
    const [showBy, setShowBy] = useState('');
    const [categoryBy, setCategoryBy] = useState('');
    const [categoryVal, setCategoryVal] = useState(1);
    const [catData, setCatData] = useState([]);
    
    

    const [productList, setProductList] = useState([]);

    const [formFields, setFormFields] = useState({
            
            category:''
           
        })

    useEffect(() =>{
      window.scrollTo(0,0);
      context.setProgress(40);

      fetchDataFromApi('/api/product').then((res)=>{
        setProductList(res);
        context.setProgress(100);
      })
    },[]);

    const deleteProduct=(id)=>{
        context.setProgress(40);
        deleteData(`/api/product/${id}`).then((res)=>{
            context.setProgress(100);
            context.setAlertBox({
              open:true,
              error:false,
              msg:'Product Deleted!'
            })
            fetchDataFromApi('/api/product').then((res)=>{
              setProductList(res);
            })
        })
    }

     const handleChange = (event,value) =>{
          context.setProgress(40)
    
          fetchDataFromApi(`/api/product?page=${value}`).then((res)=>{
            setProductList(res);
            context.setProgress(100)
          })
        }

  const handleChangeCategory= (e)=>{
    setCategoryVal(e.target.value);
    setFormFields(()=>({
        ...formFields,
       category:e.target.value
    }))
  }

  const handleShowBy= (e)=>{
    setShowBy(e.target.value);
    setFormFields(()=>({
        ...formFields,
       category:e.target.value
    }))
  }

    return(
        <>
        <div className="right-content w-100 ProductsPage">
            <div className='card shadow border-0 w-100  p-4 res-col' onClick={handleClick}>
                <h5 className='mb-0 color-white'>Product List</h5>

                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_ color-black-light'>
                    <StyledBreadcrumb
                    component="a"
                    href="/"
                    label="Home"
                    
                    icon={<HomeIcon fontSize="small" />}
                    />
                   
                    <StyledBreadcrumb
                    label="Products"
                    deleteIcon={<ExpandMoreIcon />}
                    onDelete={handleClick}
                    />
                <Link to="/product/add"><Button className='btn-blue ml-3 '>&nbsp;Add Product</Button></Link>
                </Breadcrumbs>

            </div>


        <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2">
            <div className="col-md-12">
                <div className="dashboardBoxWrapper d-flex">
                    <DashboardBox color={["#1da256","#48d483"]} icon={<FaUserCircle/>} />
                    <DashboardBox color={["#c012e2","#eb64fe"]} icon={<IoMdCart/>}/>
                    <DashboardBox color={["#2c78e5","#60aff5"]} icon={<FaBagShopping/>}/>
                    
                </div>
            </div>
        </div>


        <div className="card shadow border-0 p-3 mt-4">
              <h3 className="hd">Best Selling Products</h3>

              <div className="row cardFilters mt-3">
                {/* SHOW BY Dropdown */}
                <div className="col w-50">
                  <h5>SHOW BY</h5>

                  <Box sx={{ minWidth: 100 }}>
                            <FormControl fullWidth>
                                           
                              <NativeSelect
                                value={showBy}
                                onChange={handleShowBy}
                                defaultValue={null}
                                inputProps={{
                                   id: 'uncontrolled-native',
                                  }}
                              >
                            <option value={null}>Select</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                            
                              </NativeSelect>
                             </FormControl>
                    </Box>
                </div>

                {/* CATEGORY BY Dropdown */}
                <div className="w-50">
                  <h5>CATEGORY BY</h5>
                    <Box sx={{ minWidth: 100 }}>
                            <FormControl fullWidth>
                                           
                              <NativeSelect
                                value={categoryVal}
                                onChange={handleChangeCategory}
                                defaultValue={null}
                                inputProps={{
                                   id: 'uncontrolled-native',
                                  }}
                              >
                            <option value={null}>Select</option>
                            {
                              context.catData?.categoryList?.length!== 0 && context.catData?.categoryList?.map((cat,index)=>{
                                  return(
                                    <option value={cat.id} key={index}>{cat.name}</option>
                                      )
                                })
                            }
                              </NativeSelect>
                             </FormControl>
                    </Box>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <div className="table table-bordered v-align">
                 
                  <thead className="thead-dark">
                    <tr>
                      <th>PRODUCT</th>
                      <th>CATEGORY</th>
                      <th>BRAND</th> 
                      <th>PRICE</th>
                      <th>RATING</th>
                      <th>DISCOUNT</th> 
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      productList?.products?.length!==0 && productList?.products?.map((item,index)=>{
                        return(
                            <tr key={index}>
                                
                                <td>
                                  <div className="d-flex productBox">
                                    <div className="imgWrapper">
                                      <div className="img">
                                        <img src={`${context.baseUrl}/uploads/${item?.images[0]}`} className="w-100"/>
                                      </div>
                                    </div>
                                  <div className="info pl-0 ">
                                    <h6>{item?.name}</h6>
                                    <p>{item?.description}</p>
                                  </div>
                              </div>
                              </td>
                                <td>{item?.category?.name}</td>
                                <td>{item?.brand}</td>
                                <td><del className="old">Rs{item?.oldPrice}</del>
                                    <span className="new text-danger">Rs{item?.price}</span>
                                </td>
                                <td> <Rating name="half-rating-read" defaultValue={item?.rating} precision={0.5} readOnly  size="small" /></td>
                                
                                <td>{item?.discount}</td>
                                <td>
                                  <div className="actions d-flex align-items-center">
                                    <Button className="secondary" color="secondary"><FaEye/></Button>
                                    <Link to={`/product/edit/${item.id}`}>
                                      <Button className="success" color="success"><IoPencil/></Button>
                                    </Link>
                                    <Button className="error" color="error" onClick={()=>deleteProduct(item.id)}><IoClose/></Button>
                                  </div>
                                </td>
                            </tr>
                            )
                          })
                        }
                        
  
                  </tbody>
                  <hr className="hrSize"/>

                  {
                    productList?.totalPages>1 && 
                      <div className="d-flex tableFooter">
                        <Pagination count={productList?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange}/>
                      </div>
                  }


                </div>
              </div>

            </div>
        

    </div>
    
    </>
    )
}

export default Products;