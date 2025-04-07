import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';


import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';


import { MyContext } from '../../App';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { editData, fetchDataFromApi, postData } from '../../utils/api';


import {Link, useParams} from 'react-router-dom';
import { useEffect } from 'react';




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






const EditSubCat=()=>{


    const [data, setData] = useState([]);
    const [categoryVal, setCategoryVal] = useState(1);
    const [subcategoryVal, setsubCategoryVal] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formdata = new FormData();


    let {id} = useParams();
   


    const context = useContext(MyContext);


    const [formFields, setFormFields] = useState({
        category:'',
        subCat:'',  
    })


    useEffect(()=>{
        fetchDataFromApi(`/api/subCat/${id}`).then((res)=>{
            setData(res);
            setCategoryVal(res.category.id);
            setFormFields(()=>({
                ...formFields,
                category:res.category.id,
                subCat:res.subCat
            }))
        })
    },[]);


    const handleChangeCategory= (e)=>{
        setCategoryVal(e.target.value);
        setFormFields(()=>({
            ...formFields,
           category:e.target.value
        }))
      }


    const inputChange=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value
        }))
      }


      const editSubCategory=(e)=>{
        e.preventDefault();
       
        formdata.append('category',formFields.category);
        formdata.append('subCat',formFields.subCat);




        if(formFields.category===""){
            context.setAlertBox({
                open:true,
                msg:'Please select a category',
                error:true
            });
            return false;
   
        }


        if(formFields.subCat==="" ){
            context.setAlertBox({
                open:true,
                error:true,
                msg:'Please add sub category'
            });
            return false;
        }


        editData(`/api/subCat/${id}`,formFields).then(res=>{
            setIsLoading(false);
            navigate('/subCategory');
        })


      }




    return(
        <div className="right-content w-100">
            <div className='card shadow border-0 w-100 p-4 res-col'>
                <h5 className='mb-0 color-white'>Edit Sub-Category</h5>
                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_'>
                    <StyledBreadcrumb
                        component="a"
                        href="/dashboard"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />


                    <StyledBreadcrumb
                        label="Edit SubCategory"
                        component="a"
                        href="/category"
                        />


                    <StyledBreadcrumb
                        label="Add Sub-Category"
                        href="/category/add"
                    />
                </Breadcrumbs>
            </div>


            <form className='form' onSubmit={editSubCategory}>
            <div className='row'>
                <div className='col-sm-7'>
                    <div className='card p-4'>
                        <h5 className="mb-4 color-white">Basic Information</h5>


                        <div className='row'>
                        <div className='col w-100'>
                                    <h6 >CATEGORY</h6>
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
                        <div className='form-group col w-100'>
                            <h6 >SUB CATEGORY</h6>
                            <input type='text' className='w-100' name="subCat" value={formFields.subCat} onChange={inputChange}/>
                        </div>
                        </div>


                <Button type="submit" className='btn-blue btn-lg w-100' ><FaCloudUploadAlt/>&nbsp;{isLoading===true ? <CircularProgress color="inherit" className='loader'/>: 'PUBLISH AND VIEW'}</Button>
                    </div>
                </div>




            </div>
            </form>
        </div>
           
    )
}


export default EditSubCat;
