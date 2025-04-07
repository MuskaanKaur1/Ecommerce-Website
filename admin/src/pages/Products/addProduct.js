import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import Button from '@mui/material/Button';
import {  useState } from "react";
import Rating from '@mui/material/Rating';

import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';

import { FaCloudUploadAlt } from "react-icons/fa";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdImages } from "react-icons/io";
import { useRef } from 'react';
import { deleteImages, fetchDataFromApi, postData } from '../../utils/api';
import { useEffect } from 'react';

import { MyContext } from '../../App';
import { useContext } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


    


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
  }) ;


  

const AddProduct=()=>{

    

    const [catData, setCatData] = useState([]);
    const [categoryVal, setCategoryVal] = useState(1);

    const [isFeaturedValue, setIsFeaturedValue] = useState('');  
    const [ratingsValue, setRatingValue] = useState(1);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);

    //const [productRams, setIsProductRams] = useState('');
    //const [productSize, setIsProductSize] = useState('');
    //const [productWeight, setIsProductWeight] = useState('');
    

    const productImages=useRef(); 
    const navigate = useNavigate();

    const context = useContext(MyContext); 

    const [isLoading, setIsLoading] = useState(false);

    const formdata = new FormData();
    const [files, setFiles] = useState([]);
    const [imgFiles,setImgFiles] = useState();
    const [previews, setPreviews] = useState([]);


    const [formFields, setFormFields] = useState({
        name:'',
        description:'',
        brand:'',
        price:null,
        oldPrice:null,
        //catName:'',
        category:'',
        countInStock:null,
        rating:null,
        isFeatured:null,
        discount:null,
        //productRAMS:'',
        //productSIZE:'',
        //productWEIGHT:''
    })
   

    useEffect(()=>{
         window.scrollTo(0,0);
         context.setProgress(20)
   
//        setCatData(context.catData);
        fetchDataFromApi('/api/category').then((res)=>{
        setCatData(res);
        console.log(res);
        context.setProgress(100)
       })
    },[]);

    useEffect(()=>{
        if(!imgFiles) return;

        let tmp = [];
        for(let i=0; i<imgFiles.length; i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        //free memory
        for(let i=0; i<objectUrls.length; i++){
            return()=>{
                URL.revokeObjectURL(objectUrls[i])
            }
        }

    },[imgFiles])


  const addProduct=(e)=>{
    e.preventDefault();

    formdata.append('name',formFields.name);
    formdata.append('description',formFields.description);
    formdata.append('brand',formFields.brand);
    formdata.append('price',formFields.price);
    formdata.append('oldPrice',formFields.oldPrice);
    formdata.append('category',formFields.category);
    //formdata.append('catName',formFields.catName);
    formdata.append('countInStock',formFields.countInStock);
    formdata.append('rating',formFields.rating);
    formdata.append('isFeatured',formFields.isFeatured);
    formdata.append('discount',formFields.discount);
    //formdata.append('productRAMS',formFields.productRAMS);
    //formdata.append('productSIZE',formFields.productSIZE);
    //formdata.append('productWEIGHT',formFields.productWEIGHT);



    if(formFields.name===""){
        context.setAlertBox({
            open:true,
            msg:'Please add product name',
            error:true
        });
        return false;
    }

    if(formFields.description===""){
        context.setAlertBox({
            open:true,
            msg:'Please add product description',
            error:true
        });
        return false;
    }

    if(formFields.brand===""){
        context.setAlertBox({
            open:true,
            msg:'Please add product brand',
            error:true
        });
        return false;

    }

    if(formFields.price===null){
        context.setAlertBox({
            open:true,
            msg:'Please add product price',
            error:true
        });
        return false;

    }

    if(formFields.oldPrice===null){
        context.setAlertBox({
            open:true,
            msg:'Please add product oldPrice',
            error:true
        });
        return false;

    }

    if(formFields.category===""){
        context.setAlertBox({
            open:true,
            msg:'Please select a category',
            error:true
        });
        return false;

    }

    if(formFields.countInStock===null){
        context.setAlertBox({
            open:true,
            msg:'Please add product count in stock',
            error:true
        });
        return false;

    }

    if(formFields.rating===null ){
        context.setAlertBox({
            open:true,
            msg:'Please add product rating',
            error:true
        });
        return false;

    }

    if(formFields.isFeatured===null ){
        context.setAlertBox({
            open:true,
            msg:'Please select the product is featured or not',
            error:true
        });
        return false;

    }

    if(formFields.discount===null ){
        context.setAlertBox({
            open:true,
            msg:'Please add discount',
            error:true
        });
        return false;

    }
{/*
    if(formFields.productRAMS===null ){
        context.setAlertBox({
            open:true,
            msg:'Please add product ram',
            error:true
        });
        return false;

    }

    if(formFields.productSIZE===null ){
        context.setAlertBox({
            open:true,
            msg:'Please add product size',
            error:true
        });
        return false;

    }

    if(formFields.productWEIGHT===null ){
        context.setAlertBox({
            open:true,
            msg:'Please add product weight',
            error:true
        });
        return false;

    }
*/}

{/*
    if(formFields.images.length===0){
        context.setAlertBox({
            open:true,
            msg:'Please add product images',
            error:true
        });
        return false;

    }
*/}
    setIsLoading(true);



    postData('/api/product/create', formFields).then((res)=>{

        context.setAlertBox({
            open:true,
            msg:'The product is Created!',
            error:false
        });
        setIsLoading(false);

       {/* setFormFields({
            name:'',
            description:'',
            brand:'',
            price:0,
            oldPrice:0,
            category:'',
            subCat:'',
            countInStock:0,
            rating:0,
            isFeatured:false,
            images:[],
        });*/}

        navigate('/products');
    })
  }

  const inputChange=(e)=>{
    setFormFields(()=>({
        ...formFields,
        [e.target.name]:e.target.value
    })) 
  }
  
  
{/*
  const onChangeFile = async(e, apiEndPoint) =>{
    try{
        const imgArr = [];
        const files = e.target.files;
        setImgFiles(e.target.files)
        for(var i=0; i<files.length; i++){
            const file = files[i];
            imgArr.push(file);
            formdata.append(`images`,file);
        }

        setFiles(imgArr);
        
        postData(apiEndPoint, formdata).then((res) =>{
            console.log(imgArr)
        });
    }
    catch(error){
        console.log(error)
    }
  }
*/}
  const onChangeFile = async(e, apiEndPoint) =>{
          try{
              const imgArr = [];
              const files = e.target.files;
  
              for(var i=0; i<files.length; i++){
  
                   //validate file type
                   if(files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' )){
                      setImgFiles(e.target.files)
  
                  const file = files[i];
                  imgArr.push(file);
                  formdata.append(`images`,file);
                   }
                 else{
                  context.setAlertBox({
                      open:true,
                      error:true,
                      msg:'Please select a valid JPG, JPEG or PNG image file'
                  });
              }
          }
          
          setIsSelectedFiles(true);
          setFiles(imgArr);

          postData(apiEndPoint, formdata).then((res) =>{
              context.setAlertBox({
                  open:true,
                  error:false,
                  msg:'Images Uploaded!'
            });
      });
          
      }catch(error){
            console.log(error)
          }
        }

  const handleChangeCategory= (e)=>{
    setCategoryVal(e.target.value);
    setFormFields(()=>({
        ...formFields,
       category:e.target.value
    }))
  }




  const handleChangeisFeaturedValue = (e) => {
    setIsFeaturedValue(e.target.value);
    setFormFields(()=>({
        ...formFields,
       isFeatured:e.target.value
    }))

    }
{/*
    const handleChangeisProductRams = (e) => {
        setIsProductRams(e.target.value);
        setFormFields(()=>({
            ...formFields,
            productRAMS:e.target.value
        }))
    }

    const handleChangeisProductSize = (e) => {
        setIsProductSize(e.target.value);
        setFormFields(()=>({
            ...formFields,
            productSIZE:e.target.value
        }))
    }

    const handleChangeisProductWeight = (e) => {
        setIsProductWeight(e.target.value);
        setFormFields(()=>({
            ...formFields,
            productWEIGHT:e.target.value
        }))
    }
    
    const selectCat=(cat)=>{
        formFields.catName=cat;  
    }
    
*/}

    return(
        
        <div className="right-content w-100 productUploadPage">
            <div className='card shadow border-0 w-100 p-4 res-col'>
                <h5 className='mb-0 color-white'>Product Upload</h5>
                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_'>
                    <StyledBreadcrumb
                        component="a"
                        href="/dashboard"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    <StyledBreadcrumb
                        label="Products"
                        component="a"
                         href="/products"
                        />

                    <StyledBreadcrumb
                        label="Product Upload"
                       
                    />
                </Breadcrumbs>
            </div>

        <form className='form' onSubmit={addProduct} >
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card p-4'>
                        <h5 className="mb-4 color-white">Basic Information</h5>

                        <div className='form-group'>
                            <h6>PRODUCT NAME</h6>
                            <input type='text' className='w-100' name="name" value={formFields.name} onChange={inputChange}/>
                        </div>
                        
                        <div className='form-group'>
                            <h6>DESCRIPTION</h6>
                            <textarea rows={5} cols={8} className='w-100' name="description" value={formFields.description} onChange={inputChange}/>
                        </div>
                  

                        <div className='form-group mt-2 '>
                            <div className='row priceBox'>
                                <div className='col w-100'>
                                    <h6>NEW PRICE</h6>
                                    <input type='text' name="price" value={formFields.price} onChange={inputChange}/>                       
                                    </div>

                                <div className='col w-100'>
                                    <h6>OLD PRICE</h6>
                                    <input type='text' name="oldPrice" value={formFields.oldPrice} onChange={inputChange}/>
                                </div>

                                <div className='col w-100'>
                                    <h6>BRAND</h6>
                                    <input type='text' name="brand" value={formFields.brand} onChange={inputChange}/>
                                </div>

                            </div>
                        </div>
                       

                        <div className='form-group mt-2 '>
                            <div className='row priceBox'>
                                <div className='col w-100'>
                                    <h6>CATEGORY</h6>
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
                                                 catData?.categoryList?.length!== 0 && catData?.categoryList?.map((cat,index)=>{
                                                    return(
                                                        <option value={cat.id} key={index} >{cat.name}</option>
                                                    )
                                                })
                                            }
                                            
                                            </NativeSelect>
                                            
                                           

                                        </FormControl>
                                    </Box>                             
                                </div>
                                
                                <div className='col w-100'>
                                    <h6>DISCOUNT</h6>
                                    <input type='text' name="discount" value={formFields.discount} onChange={inputChange}/>
                                </div>
                                
                            </div>
                        </div>

{/*                      
                        <div className='form-group mt-2 '>
                            <div className='row priceBox'>
                            <div className='col w-100'>
                                    <h6>PRODUCT RAM </h6>
                                    
                                    <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                value={productRams}
                                                onChange={handleChangeisProductRams}
                                            defaultValue={null}
                                            inputProps={{
                                                id: 'uncontrolled-native',
                                            }}
                                            >
                                            <option value={null}>Select</option>
                                            <option value={'4GB'}>4GB</option>
                                            <option value={'6GB'}>6GB</option>
                                            <option value={'8GB'}>8GB</option>
                                            <option value={'12GB'}>12GB</option>
                                            </NativeSelect>     
                                        </FormControl>
                                    </Box>
                                                       
                                </div>

                                <div className='col w-100'>
                                    <h6>PRODUCT SIZE </h6>
                                    
                                    <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                value={productSize}
                                                onChange={handleChangeisProductSize}
                                                defaultValue={null}
                                                inputProps={{
                                                    id: 'uncontrolled-native',
                                                }}
                                            >
                                            <option value={null}>Select</option>
                                            <option value={'XS'}>XS</option>
                                            <option value={'S'}>S</option>
                                            <option value={'M'}>M</option>
                                            <option value={'L'}>L</option>
                                            <option value={'XL'}>XL</option>
                                            <option value={'XXL'}>XXL</option>

                                            </NativeSelect>     
                                        </FormControl>
                                    </Box>
                                                       
                                </div>

                                <div className='col w-100'>
                                    <h6>PRODUCT WEIGHT </h6>
                                    
                                    <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                value={productWeight}
                                                onChange={handleChangeisProductWeight}
                                            defaultValue={null}
                                            inputProps={{
                                                id: 'uncontrolled-native',
                                            }}
                                            >
                                            <option value={null}>Select</option>
                                            <option value={'500GM'}>500GM</option>
                                            <option value={'1KG'}>1KG</option>
                                            <option value={'2KG'}>2KG</option>
                                            <option value={'3KG'}>3KG</option>
                                            <option value={'4KG'}>4KG</option>
                                            </NativeSelect>     
                                        </FormControl>
                                    </Box>
                                                       
                                </div> 
                                                                
                            </div>
                        </div>
*/}
                        <div className='form-group mt-2 '>
                            <div className='row priceBox'>
                                <div className='col w-100'>
                                    <h6>PRODUCT STOCK </h6>
                                    <input type='text' name="countInStock" value={formFields.countInStock}onChange={inputChange}/>
                                </div>   

                                          

                           <div className='col w-100'>
                                    <h6>IS FEATURED </h6>
                                    
                                    <Box sx={{ minWidth: 100 }}>
                                        <FormControl fullWidth>
                                            <NativeSelect
                                                value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
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

                                <div className='col w-100'>
                            
                                    <h6>RATINGS</h6>
                                    <Rating 
                                        name="size-small" defaultValue={null} size="small" 

                                            onChange={(event,newValue) =>{
                                                setRatingValue(newValue);
                                                setFormFields(()=>({
                                                    ...formFields,
                                                    rating:newValue
                                                }))
                                            }} />
                                </div>              
                            </div>
                        </div>    

                    </div>
                </div>
                  
            </div>

            <div className='card p-4 imgUploadSec'>
                        <h5 className="mb-4 color-white">Media And Published</h5>

                        <div className="imgUploadBox d-flex align-items-center">
                            

                            {
                                previews?.length !==0 && previews?.map((img,index) =>{
                                    return(
                                        <div className='uploadBox' key={index}>
                                            <img src={img} className='w-100'/>
                                        </div>
                                    )
                                })
                            }
                           

                            <div className="uploadBox " >
                                <input type="file" multiple onChange={(e) =>onChangeFile(e, '/api/product/upload')} name="images"/>
                                <div className='info'>
                                    <IoMdImages/>
                                    <h5 className='color-white'>image upload</h5>
                                </div>
                            </div>

                            </div> 

                            <br/>

                       
                            <Button type="submit" className='btn-blue btn-lg w-100' ><FaCloudUploadAlt/>&nbsp;{isLoading===true ? <CircularProgress color="inherit" className='loader'/>: 'PUBLISH AND VIEW'}</Button>                        

            </div>


            </form>
        </div>
    )
}
export default AddProduct;