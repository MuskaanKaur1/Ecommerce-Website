import DashboardBox from "./Components/dashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from '../dataset/weather';

import React, { useContext, useEffect, useState } from 'react';

import { FaEye } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';    
import { MyContext } from "../../App";
import { Link } from "react-router-dom";


import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';

import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { deleteData, fetchDataFromApi } from '../../utils/api';



const showBys = [
  'Men','Women','Kids','Electonics','Grocery','Bag','Footwear','Acessories',
];

const categoryBys = [
  'Shirts', 'Jeans', 'T-Shirts', 'Shorts', 'Dresses', 'Skirts', 'Trousers', 'Jumpsuits',
]


const Dashboard=()=>{
  
  const chartSetting = {
    yAxis: [
      {
        label: '',
        
          },
        ],
        width: 500,
        height: 300,
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
          },
        },
      };

      const [productList, setProductList] = useState([]);

      const context = useContext(MyContext);

      useEffect(()=>{
        context.setisHideSidebarAndHeader(false);

        window.scrollTo(0,0);
        context.setProgress(40);
      
        fetchDataFromApi("/api/product").then((res)=>{
          setProductList(res);
          context.setProgress(100);
        })
      },[]);

      const [isShowby, setIsShowby] = useState(''); 
      const [isCatby, setIsCatby] = useState(''); 

      const [formFields, setFormFields] = useState({
        showBy:'',
        categoryBy:'',
      });
      

      const handleChangeisShowby = (e) => {
        setIsShowby(e.target.value);
        setFormFields(()=>({
            ...formFields,
           isFeatured:e.target.value
        }))
    
        }

        const handleChangeCategory = (e) => {
          setIsCatby(e.target.value);
          }
            
      
       const deleteProduct=(id)=>{
              context.setProgress(40);
              deleteData(`/api/product/${id}`).then((res)=>{
                  context.setProgress(100);
                  context.setAlertBox({
                    open:true,
                    error:false,
                    msg:'Product Deleted!'
                  })
                  fetchDataFromApi("/api/product").then((res)=>{
                    setProductList(res);
                  })
              })
          }
      
           const handleChange = (event,value) =>{
                context.setProgress(40)
          
                fetchDataFromApi(`/api/products?page=${value}`).then((res)=>{
                  setProductList(res);
                  context.setProgress(100)
                })
              }
      
      
  
    return(
        <>
        <div className="right-content w-100 DashboradPage">
            <div className="row dashboardBoxWrapperRow">
                <div className="col-md-8">
                    <div className="dashboardBoxWrapper d-flex">
                        <DashboardBox color={["#1da256","#48d483"]} icon={<FaUserCircle/>} />
                        <DashboardBox color={["#c012e2","#eb64fe"]} icon={<IoMdCart/>}/>
                        <DashboardBox color={["#2c78e5","#60aff5"]} icon={<FaBagShopping/>}/>
                        <DashboardBox color={["#e1950e","#f3cd29"]} icon={<GiStarsStack/>}/>
                    </div>
                              
                </div>

                <div className="col-md-4 pl-0 topPart2">
                    <div className="box graphBox">
                        <h5 className="text-white">Total Sales</h5>
                        <span className="text-white">$3,787,681.00</span>
                        <p className="text-white">$3,578.90 in last month</p>
                        

                            <BarChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[
                                { dataKey: 'london', label: 'London', valueFormatter },
                                { dataKey: 'paris', label: 'Paris', valueFormatter },
                                { dataKey: 'newYork', label: 'New York', valueFormatter },
                                { dataKey: 'seoul', label: 'Seoul', valueFormatter },
                            ]}
                            {...chartSetting}
                            />
  
                    </div>
                </div>
            </div>

            
                
            <div className="card shadow border-0 p-3 mt-4">
              <h3 className="hd">Best Selling Products</h3>

              <div className="row cardFilters mt-3">
                  <form className='form'>
                {/* SHOW BY Dropdown */}
                <div className="row">
                  <div className='col w-50'>
                 
                  <div className='form-group '>
                  <h6>SHOW BY</h6>

                            <Box sx={{ minWidth: 100 }}>
                              <FormControl fullWidth>
                                          <NativeSelect
                                                value={isShowby}
                                                onChange={handleChangeisShowby}
                                            defaultValue={1}
                                            inputProps={{
                                                id: 'uncontrolled-native',
                                            }}
                                            >
                                            <option value={1}>None</option>
                                            <option value={2}>Name1</option>
                                            <option value={3}>Name2</option>
                                            <option value={4}>Name3</option>
                                            <option value={5}>Name4</option>
                                          </NativeSelect>     
                                </FormControl>
                              </Box>
                      </div>
                    </div>
               

                {/* CATEGORY BY Dropdown */}
                <div className="col w-50">
                 
                  <div className='form-group'>
                  <h6>CATEGORY BY</h6>
                  <Box sx={{ minWidth: 100 }}>
                  <FormControl fullWidth>
                  <NativeSelect
                      value={setIsCatby}
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
                </div>
                </form>
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
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      productList?.products?.length!==0 && productList?.products?.map((item,index)=>{
                        return(
                            <tr>
                                
                                <td>
                                  <div className="d-flex productBox">
                                    <div className="imgWrapper">
                                      <div className="img">
                                        <img src={`${context.baseUrl}/uploads/${item.images[0]}`} className="w-100"/>
                                      </div>
                                    </div>
                                  <div className="info pl-0">
                                    <h6>{item.name}</h6>
                                    <p>{item.description}</p>
                                  </div>
                              </div>
                              </td>
                                <td>{item.category?.name}</td>
                                <td>{item.brand}</td>
                                <td><del className="old">Rs{item.oldPrice}</del>
                                    <span className="new text-danger">Rs{item.price}</span>
                                </td>
                                <td> <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly  size="small" /></td>
                                
                                <td>
                                  <div className="actions d-flex align-items-center">
                                    <Button className="secondary" color="secondary"><FaEye/></Button>
                                    <Button className="success" color="success"><IoPencil/></Button>
                                    <Button className="error" color="error" onClick={()=>deleteProduct(item.id)}><IoClose/></Button>
                                  </div>
                                </td>
                            </tr>
                            )
                          })
                        }
                        
                      

                   

                   
                  </tbody>
                  <hr className="hrSize"/>

                  <div className="d-flex tableFooter">
                    <Pagination count={productList?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange}/>
                  </div>

                 
                  

                </div>
              </div>
            </div>
                
        </div>

        </>
    )
}
export default Dashboard;