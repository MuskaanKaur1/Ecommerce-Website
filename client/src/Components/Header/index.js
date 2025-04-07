import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import CountryDropDown from '../CountryDropDown';
import Button from '@mui/material/Button';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import SearchBox from './SearchBox';
//import NavBar from './NavBar';
import { MyContext } from '../../App';
import { useEffect, useState, useContext } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiOutlineChatAlt2 } from "react-icons/hi";





const Header=()=>{
const context = useContext(MyContext);
const { cartItems, setUser, user } = useContext(MyContext); // Get user and setUser from context


const [anchorEl, setAnchorEl] = useState(null);

   
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


   // Fetch user from localStorage and set in context when component mounts
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);
}, [setUser]); // Runs once when the component mounts



    return(
        <>
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="logoWrapper d-flex align-items-center">
                    <Link to={'/'}><img src={Logo} alt='Logo'/></Link>
                    </div>

                <div className='col-sm-10  d-flex align-items-center part2'>
                    {
                        context.countryList.length!==0 && <CountryDropDown/> 
                    } 

                    <SearchBox/>     

                    <div className='part3 d-flex align-items-center ml-auto'>

                    {user ? ( // If logged in, show user dropdown

                        // If logged in, show the avatar with a dropdown
                        <div className="ml-auto showByfilter">
                            <div className='position relative '>
                            <Button onClick={handleClick} className='circle mr-5'>
                                <AiOutlineUser/>
                            </Button>
                            <span className='count d-flex align-items-center justify-content-center'></span>
                                {user.name}
                            </div>
                            

                            <Menu
                                className="w-100 menuDrop"
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openDropdown}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to="/profile">{user.name || "Profile"}</Link>  
                                    {/* Shows user's name if available */}
                                </MenuItem>
                                <MenuItem onClick={() => { 
                                    localStorage.removeItem("user"); 
                                    context.setUser(null);
                                    context.setIsLogin(false);
                                    window.location.href = "/"; 
                                }}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        // If not logged in, show SignIn button
                        <Link to="/SignIn">
                            <Button className='btn-blue btn-lg btn-round btn-big mr-2'>SignIn</Button>
                        </Link>
                    )
                }



                        
                        <div className='ml-auto heartTab'>
                            <div className='position relative '>
                            <Link to="/wishlist"><Button className='circle mr-4' ><GoHeart/></Button></Link>
                                <span className='count d-flex align-items-center justify-content-center'></span>
                                Wishlist
                            </div>
                        </div>
                        
                        <div className='ml-auto cartTab'>
                            <div className='position relative '>
                            <Link to="/cart"><Button className='circle  mr-4'><AiOutlineShoppingCart/></Button></Link>
                                <span className='count d-flex align-items-center justify-content-center'>{cartItems.length}</span>
                                Cart
                            </div>
                        </div>
                        
                    </div>
                </div>
                   
                </div>
            </div>
        </header>

        

       
        </>
    )
}

export default Header;