import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';


import React, {useContext,useEffect, useState } from 'react';


import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';    
import { Link } from "react-router-dom";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';




import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




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


const SubCatList=()=>{
   
    const [subCatData,setSubCatData] = useState([]);
    const context = useContext(MyContext);


    useEffect(()=>{
      window.scrollTo(0,0);
      context.setProgress(20)


      fetchDataFromApi('/api/subCat').then((res)=>{
        setSubCatData(res);
        context.setProgress(100)
      })
    },[]);


    const deleteCat=(id)=>{
      deleteData(`/api/subCat/${id}`).then((res)=>{
        fetchDataFromApi('/api/subCat').then((res)=>{
          setSubCatData(res);
        })
      })
    }
   
    const handleChange = (event,value) =>{
      context.setProgress(40)


      fetchDataFromApi(`/api/subCat?page=${value}`).then((res)=>{
        setSubCatData(res);
        context.setProgress(100)
      })
    }
   


    return(
        <>
        <div className="right-content w-100 CategoryPage ">
            <div className='card shadow border-0 w-100  p-4 res-col' onClick={handleClick}>
                <h5 className='mb-0 color-white'>Sub Category List</h5>


                <div className='ml-auto d-flex align-items-center'>




                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_ color-black-light'>
                    <StyledBreadcrumb
                    component="a"
                    href="/"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                    />
                   
                    <StyledBreadcrumb
                    label="Sub Category"
                   
                    />
                </Breadcrumbs>


                <Link to='/subCat/add'><Button className='btn-blue ml-3 '>&nbsp;Add SubCategory</Button></Link>
                </div>
            </div>




        <div className="card shadow border-0 p-3 mt-4">


              <div className="table-responsive mt-3">
                <div className="table table-bordered v-align">
                 
                  <thead className="thead-dark">
                    <tr>
                     
                      <th>CATEGORY IMAGE</th>
                      <th>CATEGORY</th>
                      <th>SUB CATEGORY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>


                  <tbody>
                   {
                   
                    subCatData?.subCategoryList?.length!== 0 && subCatData?.subCategoryList?.map((item,index)=>{
                        return(
                          <tr>
                          <td>
                            <div className="d-flex productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src={item.category?.images[0]} className="w-100"/>
                                </div>
                              </div>
                        </div>


                        </td>


                        <td>{item.category?.name}</td>
                        <td>{item.subCat}</td>


                          <td>
                            <div className="actions d-flex align-items-center">
                              <Link to={`/subCategory/edit/${item.id}`}>
                                  <Button className="success" color="success" ><IoPencil/></Button>
                              </Link>


                              <Button className="error" color="error" onClick={()=>deleteCat(item.id)}><IoClose/></Button>
                            </div>
                          </td>
                          </tr>
                        )
                      })
                   }
                  </tbody>
                  <hr className="hrSize"/>


                  {
                    subCatData?.totalPages>1 &&
                      <div className="d-flex tableFooter">
                        <Pagination count={subCatData?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange}/>
                      </div>
                  }
                </div>
              </div>
            </div>
    </div>
    </>
    )
}


export default SubCatList;