import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from 'react';
import { GoTriangleRight } from "react-icons/go";



const NavBar=(props)=>{

    const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

    return(
        <>
         <nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3 navPart1'>
                        <div className='catWrapper'>
                            <Button className='allCatTab align-items-center' onClick={()=>setisopenSidebarVal(!isopenSidebarVal)}>
                                <span className='icon1 mr-2'><IoIosMenu/></span>
                                <span className='text'>ALL CATEGORIES</span>
                                <span className='icon2 ml-2'><GoTriangleDown/></span>
                            </Button>

                            <div className={`sidebarNav ${isopenSidebarVal===true ? 'open': ''}`}>
                                <ul>
                                    <li ><Link to="/"><Button>Men<GoTriangleRight className='ml-auto'/> </Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>T-Shirts</Button></Link>
                                        <Link to="/"><Button>Jeans</Button></Link>
                                        <Link to="/"><Button>Shirts </Button></Link>
                                        <Link to="/"><Button>Accessories</Button></Link>
                                        <Link to="/"><Button>Footwear</Button></Link>
                                        <Link to="/"><Button>Trousers</Button></Link>
                                        <Link to="/"><Button>Ethnic wear</Button></Link>
                                    </div>   
                                    </li>
                                    <li ><Link to="/"><Button>Women<GoTriangleRight className='ml-auto'/> </Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>Kurtis & Suits </Button></Link>
                                        <Link to="/"><Button>Tunics & Tops</Button></Link>
                                        <Link to="/"><Button>Sarees</Button></Link>
                                        <Link to="/"><Button>Skirts</Button></Link>
                                        <Link to="/"><Button>Palazzos</Button></Link>
                                        <Link to="/"><Button>Tshirts</Button></Link>
                                        <Link to="/"><Button>Jeans</Button></Link>
                                        <Link to="/"><Button>Trousers</Button></Link>
                                        <Link to="/"><Button>Accessories</Button></Link>
                                    </div>
                                    </li>
                                    <li ><Link to="/"><Button>Kids <GoTriangleRight className='ml-auto'/></Button></Link>
                                    <div className='submenu shadow'>
                                        <Link to="/"><Button>Tops & Tees</Button></Link>
                                        <Link to="/"><Button>Dresses</Button></Link>
                                        <Link to="/"><Button>Jeans</Button></Link>
                                        <Link to="/"><Button>Baby Girl</Button></Link>
                                        <Link to="/"><Button>T-Shirts</Button></Link>
                                        <Link to="/"><Button>Jeans</Button></Link>
                                        <Link to="/"><Button>Party Wear</Button></Link>
                                        <Link to="/"><Button>Baby Boy</Button></Link>
                                    </div>
                                    </li>
                                    <li ><Link to="/"><Button>Footwear </Button></Link></li>
                                    <li ><Link to="/"><Button>Watches </Button></Link></li>
                                    <li ><Link to="/"><Button>Accessories </Button></Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-9 navPart2 d-flex align-items-center'>
                        <ul className='list list-inline '>
                            <li className='list-inline-item'><Link to="/"><FaHome/>&nbsp; Home</Link></li>

                            {
                                props.navData?.length !==0 && props.navData?.map((item, index)=>{
                                    return(
                                        <li className='list-inline-item'>
                                            <Link to={`/cat/${item?.id}`}><Button>{item?.category}</Button></Link>
                                        </li>
                                    )
                                })
                            }
                            

                            <li className='list-inline-item'><Link to="/"><FaShoppingBag/>&nbsp; Shop</Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>Men</Button></Link>
                                    <Link to="/"><Button>Women</Button></Link>
                                    <Link to="/"><Button>Kids </Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'>
                                <Link to="/">Men</Link>
                                <div className='submenu shadow'>
                                    <Link to="/"><Button>T-Shirts</Button></Link>
                                    <Link to="/"><Button>Jeans</Button></Link>
                                    <Link to="/"><Button>Shirts </Button></Link>
                                    <Link to="/"><Button>Accessories</Button></Link>
                                    <Link to="/"><Button>Footwear</Button></Link>
                                    <Link to="/"><Button>Trousers</Button></Link>
                                    <Link to="/"><Button>Ethnic wear</Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'><Link to="/">Women</Link>
                            <div className='submenu shadow'>
                                    <Link to="/"><Button>Kurtis & Suits </Button></Link>
                                    <Link to="/"><Button>Tunics & Tops</Button></Link>
                                    <Link to="/"><Button>Sarees</Button></Link>
                                    <Link to="/"><Button>Skirts</Button></Link>
                                    <Link to="/"><Button>Palazzos</Button></Link>
                                    <Link to="/"><Button>Tshirts</Button></Link>
                                    <Link to="/"><Button>Jeans</Button></Link>
                                    <Link to="/"><Button>Trousers</Button></Link>
                                    <Link to="/"><Button>Accessories</Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'><Link to="/">Kids</Link>
                            <div className='submenu shadow'>
                                    <Link to="/"><Button>Tops & Tees</Button></Link>
                                    <Link to="/"><Button>Dresses</Button></Link>
                                    <Link to="/"><Button>Jeans</Button></Link>
                                    <Link to="/"><Button>Baby Girl</Button></Link>
                                    <Link to="/"><Button>T-Shirts</Button></Link>
                                    <Link to="/"><Button>Jeans</Button></Link>
                                    <Link to="/"><Button>Party Wear</Button></Link>
                                    <Link to="/"><Button>Baby Boy</Button></Link>
                                </div>
                            </li>
                            <li className='list-inline-item'><Link to="/">About Us</Link></li>
                            <li className='list-inline-item'><Link to="/"><FaPhoneAlt/>&nbsp; Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar;