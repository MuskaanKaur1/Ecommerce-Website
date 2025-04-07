import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import SearchBox from "../Searchbox";

import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

import { FaUser } from "react-icons/fa6";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { BsShieldShaded } from "react-icons/bs";
import { useContext, useState } from "react";
import Divider from '@mui/material/Divider';
import UserAvatarImgComponent from "../userAvatarImg";


import { IoMenuOutline } from "react-icons/io5";
import { MyContext } from "../../App";




const Header=()=>{

    const context = useContext(MyContext);
  

    return(
        <>
      <header >
        <div className="container-fluid w-100">
            <div className="row d-flex align-items-center w-100">
                <div className="col-sm-2 part1 ">
                    <Link to={"/"}><img src={Logo} className="logo " alt="Logo"/></Link>
                </div>


                {
                    MyContext.windowWidth>992 &&
                <div className="col-sm-2 d-flex align-items-center part2 res-hide">
                
                   <SearchBox/>
                </div>
                }


                
                <div className="col-sm-8 d-flex align-items-center justify-content-end part3 navPart2">

                        <ul className='list list-inline d-flex align-items-center'>
                            
                            

{/*
                            <li className='list-inline-item'><Link to="/"><GrCart/></Link>
                                <div className='submenu shadow'>
                                    <div className="head pl-3 pb-0">
                                        <h4>Orders (6)</h4>
                                    </div>
                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczKl5vEPUjm_OnLhKitGWL0zy8nFOg8H78g&s" className="imgSize"/>
                                        </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Meena</b></p>
                                            <p> <b>Total price:</b>$200</p>
                                        </span>
                                    </div>
                                </div>

                                <Divider/>

                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjocpD8FmO9dhbP4l7GypY_UYB-fkUqbDbZg&s" className="imgSize"/>
                                    </span>
                                </div>

                                <div className="info d-flex align-items-center justify-content-center">
                                    <span>
                                        <p className="mb-0 mt-0"><b>Jubayer</b></p>
                                        <p> <b>Total price:</b>$120</p>
                                    </span>
                                </div>
                                </div>

                                <Divider />
                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfHAI5TQ1OZicPaCFBxQkfIanwkzsTuNLUw&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Rebeka</b></p>
                                            <p> <b>Total price:</b>$80</p>
                                        </span>
                                    </div>
                                </div>

                                <Divider />

                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIcAg8qIRvgVcPN8qnMQ18XucdmyPXZzYkQ&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Ram</b></p>
                                            <p> <b>Total price:</b>$500</p>
                                        </span>
                                    </div>
                                </div>

                                <Divider />

                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKCV6PLyj49Ngc3RuldQLgyFlRbU8NHNRIw&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Ria</b></p>
                                            <p> <b>Total price:</b>$300</p>
                                        </span>
                                    </div>
                                </div>

                                <Divider />

                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopeijwlKQvSqi3g94LQwnfe-9-dJmO_SErg&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Sam</b></p>
                                            <p> <b>Total price:</b>$50</p>
                                        </span>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className='list-inline-item'><Link to="/"><MdOutlineEmail/></Link>
                                <div className='submenu shadow'>
                                <div className="head pl-3 pb-0">
                                        <h4>Messages</h4>
                                    </div>
                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczKl5vEPUjm_OnLhKitGWL0zy8nFOg8H78g&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                        <p className="mb-0 mt-0"><b>Meena</b>&nbsp;added </p>
                                        <p> <b>Red sleeveless top</b></p>
                                        </span>
                                    </div>
                                </div>


                                    <div className="d-flex align-items-center">
                                        <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjocpD8FmO9dhbP4l7GypY_UYB-fkUqbDbZg&s" className="imgSize"/>
                                        </span>
                                        </div>

                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>
                                            <p className="mb-0 mt-0"><b>Jubayer</b>&nbsp;writes in blog</p>
                                            <p> <b>Best outfit </b></p>
                                            </span>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfHAI5TQ1OZicPaCFBxQkfIanwkzsTuNLUw&s" className="imgSize"/>
                                        </span>
                                        </div>

                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>
                                                <p className="mb-0 mt-0"><b>Rebeka</b>&nbsp;give a review to</p>
                                                <p> <b>Exclusive Long Kaptan</b></p>
                                            </span>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIcAg8qIRvgVcPN8qnMQ18XucdmyPXZzYkQ&s" className="imgSize"/>
                                        </span>
                                        </div>

                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>
                                                <p className="mb-0 mt-0"><b>Ram</b>&nbsp;created a new account</p>
                                                
                                            </span>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKCV6PLyj49Ngc3RuldQLgyFlRbU8NHNRIw&s" className="imgSize"/>
                                        </span>
                                        </div>

                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>
                                                <p className="mb-0 mt-0"><b>Ria</b>&nbsp;ordered a new dress</p>
                                                
                                            </span>
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopeijwlKQvSqi3g94LQwnfe-9-dJmO_SErg&s" className="imgSize"/>
                                        </span>
                                        </div>

                                        <div className="info d-flex align-items-center justify-content-center">
                                            <span>
                                                <p className="mb-0 mt-0"><b>Sam</b>&nbsp;added to his favorite list</p>
                                                <p> <b>Leather belt</b></p>
                                            </span>
                                        </div>
                                    </div>



                                </div>
                            </li>
*/}

                            <li className='list-inline-item' onClick={()=>context.setThemeMode(!context.themeMode)}><MdOutlineLightMode/>
                                {/*<div className='submenu shadow'>
                                        <Link to="/"><Button>Light</Button></Link>
                                        <Link to="/"><Button>Dark</Button></Link>
                                    </div>*/}
                            </li>
                            <li className='list-inline-item'><IoMdNotificationsOutline/>
                                <div className='submenu shadow'>
                                    <div className="head pl-3 pb-0">
                                        <h4>Notifications</h4>
                                    </div>
                            <Divider />


                            <div className="d-flex align-items-center">
                                <div className="userImg">
                                <span className="rounded-circle">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczKl5vEPUjm_OnLhKitGWL0zy8nFOg8H78g&s" className="imgSize"/>
                                </span>
                                </div>

                                <div className="info d-flex align-items-center justify-content-center">
                                    <span>
                                        <p className="mb-0 mt-0"><b>Meena</b>&nbsp;added </p>
                                        <p> <b>Red sleeveless top</b></p>
                                    </span>
                                </div>
                            </div>


                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjocpD8FmO9dhbP4l7GypY_UYB-fkUqbDbZg&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Jubayer</b>&nbsp;writes in blog</p>
                                            <p> <b>Best outfit </b></p>
                                        </span>
                                    </div>
                                </div>


                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfHAI5TQ1OZicPaCFBxQkfIanwkzsTuNLUw&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Rebeka</b>&nbsp;give a review to</p>
                                            <p> <b>Exclusive Long Kaptan</b></p>
                                        </span>
                                    </div>
                                </div>


                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIcAg8qIRvgVcPN8qnMQ18XucdmyPXZzYkQ&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Ram</b>&nbsp;created a new account</p>
                                            
                                        </span>
                                    </div>
                                </div>


                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFKCV6PLyj49Ngc3RuldQLgyFlRbU8NHNRIw&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Ria</b>&nbsp;ordered a new dress</p>
                                            
                                        </span>
                                    </div>
                                </div>


                                <div className="d-flex align-items-center">
                                    <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSopeijwlKQvSqi3g94LQwnfe-9-dJmO_SErg&s" className="imgSize"/>
                                    </span>
                                    </div>

                                    <div className="info d-flex align-items-center justify-content-center">
                                        <span>
                                            <p className="mb-0 mt-0"><b>Sam</b>&nbsp;added to his favorite list</p>
                                            <p> <b>Leather belt</b></p>
                                        </span>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className='list-inline-item' onClick={()=>context.openNav()}><IoMenuOutline/></li>
                            
                            <li className='list-inline-item  d-flex align-items-center'><Button className="myAcc d-flex align-items-center mr-0 p-0">
                                <div>
                                    <UserAvatarImgComponent img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_P69PJobk4IBT7q62Nl5NlKnnfjVLjZUsA&s'}/>
                                </div>
                            </Button><div className="userInfo  ">
                            
                                        <h5 className="mb-0">Muskaan Kaur</h5>
                                        <p className="mb-0">@Kaur451</p>
                                    </div>
                                <div className='submenu shadow'>
                                   
                                    <Link to="/"><Button><Avatar className="avatarSize" />&nbsp;My account</Button></Link>
                                    <Link to="/"><Button><BsShieldShaded className="avatarSize" />&nbsp; Reset password</Button></Link>
                                    <Link to="/"><Button><Settings fontSize="small" />&nbsp; Settings</Button></Link>
                                    <Link to="/Login"><Button><FaUser/>  &nbsp; Login</Button></Link>
                                    <Link to="/Register"><Button><FaUser/>&nbsp; Register</Button></Link>
                                    <Link to="/"><Button><Logout fontSize="small" />&nbsp; Logout</Button></Link>

                                </div>
                                   
                                    
                                
                            </li> 
                                    

                        </ul>         
                    </div>



            </div>
        </div>
      </header>
        </>
    )
}
export default Header;