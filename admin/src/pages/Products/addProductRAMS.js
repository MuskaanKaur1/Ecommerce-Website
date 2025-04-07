import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import { FaCloudUploadAlt } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


import Button from '@mui/material/Button';
import {  useState, useContext, useEffect} from "react";
import { MyContext } from "../../App";

import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';

import { FaEye } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { postData } from '../../utils/api';



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


const AddProductRAMS=()=>{


    const [catData, setCatData] = useState([]);
    const [categoryVal, setCategoryVal] = useState(1);
    const [subcategoryVal, setsubCategoryVal] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();




    const context = useContext(MyContext);


    const [formFields, setFormFields] = useState({
        productRAMS:'',
    })


    const inputChange=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value
        }))
      }


      const AddRams=(e)=>{
        e.preventDefault();


        const formdata = new FormData();

        formdata.append('productRAMS',formFields.productRAMS);       
       
        if(formFields.productRAMS===""){
            context.setAlertBox({
                open:true,
                msg:'Please select a product Ram',
                error:true
            });
            return false;  
        }
       
        postData('/api/productRAMS/create',formFields).then((res)=>{
            setIsLoading(false);
            navigate('/subCategory'); 
        })
      }


    

    return(
        <div className="right-content w-100 productRAMS">
            <div className='card shadow border-0 w-100 p-4 res-col'>
                <h5 className='mb-0 color-white'>Add Product RAMS</h5>
                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_'>
                    <StyledBreadcrumb
                        component="a"
                        href="/dashboard"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    <StyledBreadcrumb
                        label="Add Product RAMS"
                        href="/productRAMS/add"
                    />
                </Breadcrumbs>
            </div>


            <form className='form' onSubmit={AddRams}>
            <div className='row'>
                <div className='col-sm-9'>
                    <div className='card p-4'>
                        <h5 className="mb-4 color-white">Basic Information</h5>


                        <div className='row'>
                            <div className='form-group col-md-4 w-100'>
                                <h6 >PRODUCT RAM</h6>
                                <input type='text' className='w-100' name="productRAMS" value={formFields.productRAMS} onChange={inputChange}/>
                            </div>
                        </div>


                <Button type="submit" className='btn-blue btn-lg w-100' ><FaCloudUploadAlt/>&nbsp;{isLoading===true ? <CircularProgress color="inherit" className='loader'/>: 'PUBLISH AND VIEW'}</Button>
                    </div>
                </div>
               </div>
            </form>


            <div className='row'>
                <div className='col-md-4'>
                <div className='card'>
                <div className="table-responsive mt-3">
                    <table className="table table-bordered v-align">
                    
                    <thead className="thead-dark">
                        <tr>
                        <th>PRODUCT RAM</th>
                        
                        <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <div className="actions d-flex align-items-center">
                                    <Button className="secondary" color="secondary"><FaEye/></Button>
                                    <Button className="success" color="success"><IoPencil/></Button>
                                    <Button className="error" color="error" ><IoClose/></Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
                </div>
            </div>
            
        </div>           
    )
}

export default AddProductRAMS;