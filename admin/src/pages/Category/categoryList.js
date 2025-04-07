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

const Category=()=>{
   
    const [catData,setCatData] = useState([]);

    const context = useContext(MyContext);

    useEffect(()=>{
      window.scrollTo(0,0);
      context.setProgress(20)

      fetchDataFromApi('/api/category').then((res)=>{
        setCatData(res);
        context.setProgress(100)

      })
    },[]);



    const deleteCat=(id)=>{
      deleteData(`/api/category/${id}`).then((res)=>{
        fetchDataFromApi('/api/category').then((res)=>{
          setCatData(res);
        })
      })
    }

    const handleChange = (event,value) =>{
      context.setProgress(40)

      fetchDataFromApi(`/api/category?page=${value}`).then((res)=>{
        setCatData(res);
        context.setProgress(100)
      })
    }

    return(
        <>
        <div className="right-content w-100 CategoryPage ">
            <div className='card shadow border-0 w-100  p-4 res-col' onClick={handleClick}>
                <h5 className='mb-0 color-white'>Category List</h5>

                <div className='ml-auto d-flex align-items-center'>


                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_ color-black-light'>
                    <StyledBreadcrumb
                    component="a"
                    href="/"
                    label="Home"
                    
                    icon={<HomeIcon fontSize="small" />}
                    />
                   
                    <StyledBreadcrumb
                    label="Category"
                    deleteIcon={<ExpandMoreIcon />}
                    onDelete={handleClick}
                    />
                </Breadcrumbs>

                <Link to="/category/add"><Button className='btn-blue ml-3 '>&nbsp;Add Category</Button></Link>
                </div>
            </div>


        <div className="card shadow border-0 p-3 mt-4">

              <div className="table-responsive mt-3">
                <div className="table table-bordered v-align">
                 
                  <thead className="thead-dark">
                    <tr>
                      
                      <th>CATEGORY</th>
                      <th>IMAGE</th> 
                      <th>COLOR</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                   {
                    
                      catData?.categoryList?.length!== 0 && catData?.categoryList?.map((item,index)=>{
                        return(
                          <tr>
                          
                          <td>{item.name}</td>
                          
                          <td>
                            <div className="d-flex productBox">
                              <div className="imgWrapper">
                                <div className="img">
                                  <img src={`${context.baseUrl}/uploads/${item.images[0]}`} className="w-100"/>
                                </div>
                              </div>
                        </div>

                        </td>
                          <td>{item.color}</td>
                          <td>
                            <div className="actions d-flex align-items-center">
                              <Link to={`/category/edit/${item.id}`}>
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
                    catData?.totalPages>1 &&
                      <div className="d-flex tableFooter">
                        <Pagination count={catData?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange}/>
                      </div>
                  }
                </div>
              </div>
            </div>
    </div>

    </>
    )
}

export default Category;
