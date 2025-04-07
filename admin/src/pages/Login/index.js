import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import {MyContext} from '../../App';
import { RiUser3Fill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import googleIcon from "../../assets/images/googleIcon.png";




const Login=()=>{

    const [isShowPassword,setisShowPassword] = useState(false);
    
    const context = useContext(MyContext);

    useEffect(()=>{
        context.setisHideSidebarAndHeader(true);
    },[]);
    return(
        <>
        
            <section className="loginSection">
                <div className="loginBox">
                <div className="logo text-center"><img src={Logo} className="logo1 " alt="Logo"/>
                    <h5 className="font-weight-bold mt-2">Login</h5>
                </div>

                <div className="wrapper mt-3 card border p-4">
                    <form>
                        
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><IoMdMail/></span>
                            <input type="text" className="form-control" placeholder="Enter your email" />
                        </div>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><MdLock/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className="form-control" placeholder="enter password" />

                            {/*
                            <span className="toggleShowPassword" onClick={()=>setisShowPassword(!isShowPassword)}>
                                {isShowPassword===true ? <FaEyeSlash/>: <FaEye/>} 
                            </span>
                        */}
                        </div>

                        <div className="form-group">
                            <Button className="btn-blue btn-lg btn-big w-100">Sign In</Button>
                        </div>

                        <div className="form-group text-center mt-2">
                            <Link to={'/forgot-password'} className="link">FORGOT PASSWORD</Link>
                        </div>

                        <hr/>

                        <div className="form-group mb-4 position-relative text-center">
                            <img src={googleIcon} className="googleIcon " alt="googleIcon"/>
                        </div>
                       

                    </form>
                </div>

                <div className="wrapper2 mt-3 card border footer ">
                    <span className='text-center mt-2'>
                        <p >Don't have an account?</p>
                        <Link to={'/Register'} className="link color">Register</Link>
                    </span>
                </div>

                </div>
            </section>
        </>
    )
}

export default Login;