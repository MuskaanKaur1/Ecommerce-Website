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
                        <li><Link to='/product/upload'>Product Upload</Link></li>
                    </ul>


                
            </li>
            
            <li>
                <Link to='/'>
                    <Button className={`w-100 mt-0 ${activeTab===2 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(2)}>
                        <span className='icon'><FaCartArrowDown/></span>
                            <span className='name'>&nbsp;Orders</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>

            <li>
                <Link to=''>
                    <Button className={`w-100 mt-0 ${activeTab===3 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(3)}>
                        <span className='icon'><MdMessage/></span>
                            <span className='name'>&nbsp;Messages</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>
            <li>
                <Link to=''>
                    <Button className={`w-100 mt-0 ${activeTab===4 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(4)}>
                        <span className='icon'><IoIosNotifications/></span>
                            <span className='name'>&nbsp;Notifications</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>

            <li>
                <Link to=''>
                    <Button className={`w-100 mt-0 ${activeTab===5 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(5)}>
                        <span className='icon'><IoSettingsSharp/></span>
                            <span className='name'>&nbsp;Settings</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>
            <li>
                <Link to=''>
                    <Button className={`w-100 mt-0 ${activeTab===6 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(6)}>
                        <span className='icon'><BiLogIn/></span>
                            <span className='name'>&nbsp;Login</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li>

            <li>
                <Link to=''>
                    <Button className={`w-100 mt-0 ${activeTab===7 && isToggleSubmenu===true ? 'active': ''}`} onClick={()=>isOpenSubmenu(7)}>
                        <span className='icon'><FaUser/></span>
                            <span className='name'>&nbsp;SignUp</span>
                        <span className='arrow'><FaAngleRight/></span>
                    </Button>
                </Link>
            </li> 
           
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