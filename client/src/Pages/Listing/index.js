import Sidebar from "../../Components/Sidebar";
import Button from '@mui/material/Button';
import { MdOutlineMenu } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { GoTriangleDown } from "react-icons/go";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';

import { useParams } from "react-router-dom";


const Listing=()=>{


    const [anchorEl, setAnchorEl] = useState(null);

    const [productView, setProductView] = useState('four');
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const{id} = useParams();

    useEffect(()=>{
        alert(id)
    },[id])

    return(
        <>
        <section className="product_listing_page">
            <div className="container">
                <div className="productListing d-flex">
                    <Sidebar/>

                    <div className="content_right"> 
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQld9aUdRX0OJVglxiDkxlvhHj8F_8uHzYwcg&s" className="w-100" style={{borderRadius:'8px'}}/>



                        <div className="showBy mt-3 mb-3 d-flex align-items-center">
                            <div className="d-flex btnWrapper">
                                <Button className={productView==='one' && 'act'} onClick={()=>setProductView('one')}><MdOutlineMenu/></Button>
                                <Button className={productView==='two' && 'act'} onClick={()=>setProductView('two')}><IoGrid/></Button>
                                <Button className={productView==='three' && 'act'} onClick={()=>setProductView('three')}><CgMenuGridR/></Button>
                                <Button className={productView==='four' && 'act'} onClick={()=>setProductView('four')}><TfiLayoutGrid4Alt/></Button>
                            </div>

                            <div className="ml-auto showByfilter">
                                <Button onClick={handleClick}>Show 9<GoTriangleDown/></Button>

                                <Menu
                                    className="w-100 "
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openDropdown}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>10</MenuItem>
                                    <MenuItem onClick={handleClose}>20</MenuItem>
                                    <MenuItem onClick={handleClose}>30</MenuItem>
                                </Menu>
                            </div>
                        </div>

                        <div className="productListing">
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                            <ProductItem itemView={productView}/>
                        </div>

                        <div className="d-flex align-items-center justify-content-center mt-5">
                            <Pagination count={10} color="primary" size="large"/>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Listing;