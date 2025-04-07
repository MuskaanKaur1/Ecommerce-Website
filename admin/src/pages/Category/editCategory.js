import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import Button from '@mui/material/Button';
import {  useState, useContext} from "react";

import { FaCloudUploadAlt } from "react-icons/fa";
import { editData, fetchDataFromApi, postData } from '../../utils/api';
import { IoMdImages } from "react-icons/io";

import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { useEffect } from 'react';

import {Link, useParams} from 'react-router-dom'; 

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

  

const EditCategory=()=>{

    const [formFields, setFormFields] = useState({
        name:'',   
        images:[],
        color:''
    });

    const navigate = useNavigate();

    let {id} = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [category, setcategory] = useState([]);
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);

    const [files, setFiles] = useState([]);
     const [imgFiles,setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const formdata = new FormData();


    const context = useContext(MyContext);

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


    useEffect(()=>{
        context.setProgress(40);
        fetchDataFromApi(`/api/category/${id}`).then((res)=>{
            setcategory(res);
            setFormFields({
                name:res.name,
                color:res.color
            });
            setPreviews(res.images);
            context.setProgress(100);
        });
    }, []);



    const changeInput = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

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
      
                      setFiles(imgArr);
      
                      setIsSelectedFiles(true);
      
                      postData(apiEndPoint, formdata).then((res) =>{
                          context.setAlertBox({
                              open:true,
                              error:false,
                              msg:'Images Uploaded!'
                          });
                  });
                      
                  }else{
                      context.setAlertBox({
                          open:true,
                          error:true,
                          msg:'Please select a valid JPG, JPEG or PNG image file'
                      });
                  }
              }
                  
              }catch(error){
                  console.log(error)
              }
            }


    const editCategory = (e) =>{
        e.preventDefault();

        formdata.append('name',formFields.name);
        formdata.append('color',formFields.color);

        if(formFields.name!=="" && formFields.color!=="" && isSelectedFiles!==false){
            setIsLoading(true);
        
        editData(`/api/category/${id}`,formFields).then(res=>{
            context.setAlertBox({
                open:true,
                msg:'The category is updated!',
                error:false
            });
            setIsLoading(false);
            navigate('/category');
        })
        }

        else{
            context.setAlertBox({
                open:true,
                error:true,
                msg:'Please fill all the fields'
            })
            return false;
        }
        
    }

 

    return(
        
        <div className="right-content w-100">
            <div className='card shadow border-0 w-100 p-4 res-col'>
                <h5 className='mb-0 color-white'>Edit Category</h5>
                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_'>
                    <StyledBreadcrumb
                        component="a"
                        href="/dashboard"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    <StyledBreadcrumb
                        label="Category"
                        component="a"
                        href="/category"
                        />

                    <StyledBreadcrumb
                        label="Add Category"
                        href="/category/add"
                    />
                </Breadcrumbs>
            </div>

        <form className='form' onSubmit={editCategory}>
            <div className='row'>
                <div className='col-sm-7'>
                    <div className='card p-4'>
                        <h5 className="mb-4 color-white">Basic Information</h5>
                        
                        <div className='form-group'>
                            <h6>Category Name</h6>
                            <input type='text' className='w-100' name='name' value={formFields.name} onChange={changeInput}/>
                        </div>
                       

                        <div className='form-group'>
                            <h6>Color</h6>
                            <input type='text' className='w-100' name='color' value={formFields.color} onChange={changeInput}/>
                        </div>

                       
                        <div className='imgUploadSec'>
                        <h5 className="mb-4 color-white">Media And Published</h5>

                        <div className="imgUploadBox d-flex align-items-center">
                            

                            {
                                previews?.length !==0 && previews?.map((img,index) =>{
                                    return(
                                        <div className='uploadBox' key={index}>
                                            {
                                                isSelectedFiles === true ?
                                                <img src={`${img}`} className='w-100'/>
                                                :
                                                <img src={`${context.baseUrl}/uploads/${img}`} className='w-100'/>
                                            }
                                        </div>
                                    )
                                })
                            }
                           

                            <div className="uploadBox " >
                                <input type="file" multiple onChange={(e) =>onChangeFile(e, '/api/category/upload')} name="images"/>
                                <div className='info'>
                                    <IoMdImages/>
                                    <h5 className='color-white'>image upload</h5>
                                </div>
                            </div>

                            </div> 

                            <br/>

                       
                            <Button type="submit" className='btn-blue btn-lg w-100' ><FaCloudUploadAlt/>&nbsp;{isLoading===true ? <CircularProgress color="inherit" className='loader'/>: 'PUBLISH AND VIEW'}</Button>                        

            </div>    

                    </div>

                </div>


            </div>
            </form>
        </div>
    )
}
export default EditCategory;
