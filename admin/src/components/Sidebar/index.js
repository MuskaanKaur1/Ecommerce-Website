import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BiLock } from "react-icons/bi";





const Sidebar=()=>{

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);   


    const isOpenSubmenu=(index)=>{
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu)
    }

    return(
        <>
       <div className="sidebar">

        
        <ul>
            <li><Button className='mainPages'>Main Pages</Button></li>
            <li> 
                <Link to=''>
                    <Button className={`w-100 mt-4 ${activeTab===0 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(0)}>
                        <span className='icon'><MdDashboard/></span>
                            <span className='name'>&nbsp;Dashboard</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>

            <li>
                <Button className={`w-100 mt-0 ${activeTab===1 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(1)}>
                    <span className='icon'><FaProductHunt/></span>
                        <span className='name'>&nbsp;Products</span>
                    <span className='arrow'><FaAngleRight/></span>
                    
                </Button>
               
                    <ul className='submenu'>
                        <li><Link to='/products'>Product List</Link></li>
                        <li><Link to='/product/details'>Product View</Link></li>
                        <li><Link to='/product/add'>Product Upload</Link></li>
                        {/*<li><Link to='/productRAMS/add'>Add Product Ram</Link></li>
                        <li><Link to='/productRAMS/list'>Product Ram List</Link></li>
                        <li><Link to='/productSize/add'>Add Product Size</Link></li>
                        <li><Link to='/productSize/list'>Product Size List</Link></li>
                        <li><Link to='/productWeight/add'>Add Product Weight</Link></li>
                        <li><Link to='/productWeight/list'>Product Weight List</Link></li>*/}
                    </ul>
                
            </li>

            <li>
                <Button className={`w-100 mt-0 ${activeTab===2 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(2)}>
                    <span className='icon'><FaProductHunt/></span>
                        <span className='name'>&nbsp;Categories</span>
                    <span className='arrow'><FaAngleRight/></span>
                    
                </Button>
               
                    <ul className='submenu'>
                        <li><Link to='/category'>Category List</Link></li>
                        <li><Link to='/category/add'>Add a Category</Link></li>
                        {/*<li><Link to='/subCategory'>Sub Category List</Link></li>
                        <li><Link to='/subCat/add'>Add SubCategory</Link></li>*/}
                    </ul>
                
            </li>
{/*
            <li>
                <Button className={`w-100 mt-0 ${activeTab===3 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(3)}>
                    <span className='icon'><FaProductHunt/></span>
                        <span className='name'>&nbsp;ChatApp</span>
                    <span className='arrow'><FaAngleRight/></span>
                </Button>

                    <ul className='submenu'>
                        <li><Link to=''>Login</Link></li>
                        <li><Link to=''>Chat</Link></li>
                        <li><Link to=''>Pofile</Link></li>
                    </ul>
                    
               
            </li>

            <li>
                <Button className={`w-100 mt-0 ${activeTab===4 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(4)}>
                    <span className='icon'><FaProductHunt/></span>
                        <span className='name'>&nbsp;Chatbot</span>
                    <span className='arrow'><FaAngleRight/></span>
                    
                </Button>
            </li>
*/}            
            
           
        </ul>

        <br/>

        <div className='logoutWrapper'>
            <div className='logoutBox'>
                <Button variant="contained" className='sVgSize'><BiLock/>&nbsp;Logout</Button>
            </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>



        </div>
        </>
    )
}
export default Sidebar;