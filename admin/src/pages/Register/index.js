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
import googleIcon from "../../assets/images/googleIcon.png";
import { TbShieldCheckFilled } from "react-icons/tb";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { postData } from "../../utils/api";




const Register=()=>{

    const [inputIndex, setInputIndex] = useState(null); 
    const [isShowPassword,setisShowPassword] = useState(false);
    const [isShowConfirmPassword, setisShowConfirmPassword] = useState(false); 
    const [formfields, setFormfields] = useState({
        name: "",
        email:"" ,
        phone:"", 
        password:"", 
        confirmPassword:"", 
        isAdmin:true 
    });

    //const history = useNavigate(); 
   
    
    const context = useContext(MyContext);

    const onchangeInput=(e)=>{ 
        setFormfields(()=>({ 
            ...formfields, 
            [e.target.name]:e.target.value 
        }))
    }
    
    const signUp = (e) =>{
        e.preventDefault(); 

        if(formfields.name===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"Name cannot be blank"
            })
            return false;
        }

        if(formfields.email===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"Email cannot be blank"
            })
            return false;
        }

        if(formfields.phone===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"Phone No cannot be blank"
            })
            return false;
        }

        if(formfields.password===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"password cannot be blank"
            })
            return false;
        }

        if(formfields.confirmPassword===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"confirmPassword cannot be blank"
            })
            return false;
        }

        postData("/api/user/signup",formfields).then((res)=>{
            console.log(res)
        })
    }

    useEffect(()=>{
        context.setisHideSidebarAndHeader(true);

        window.scrollTo(0,0);
      },[])
    return(
       
        
            <section className="loginSection signUpSection">
                <div className="row">
                    <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
                        <h1>BEST FASHION ECOMMERCE DASHBOARD & ADMIN PANEL</h1>
                        <p className="mt-2">This is an admin panel.This helps manage products and customers.An admin panel or a control panel is a system that enables administrators and other website workers to conduct various tasks like monitoring, maintaining, and controlling certain business processes. An admin dashboard is one of the core components of a control panel.</p>
                        <Link to={'/'}>
                        <Button className="btn-blue btn-lg btn-round"><FaHome/>Go to Home</Button></Link>
                    </div>

                    <div className="col-md-4">
                    <div className="loginBox">
                <div className="logo text-center">
                    <img src={Logo} className="logo1 " alt="Logo"/>
                    <h5 className="font-weight-bold mt-2">Create an Account</h5>
                </div>

                <div className="wrapper mt-3 card border p-4">
                    <form onSubmit={signUp}>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><RiUser3Fill/></span>
                            <input type="text" className="form-control" placeholder="Enter your name" name="name" onChange={onchangeInput}/>
                        </div>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><IoMdMail/></span>
                            <input type="text" className="form-control" placeholder="Enter your email" name="email" onChange={onchangeInput}/>
                        </div>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><FaPhoneAlt/></span>
                            <input type="text" className="form-control" placeholder="Enter your Phone No" name="phone" onChange={onchangeInput}/>
                        </div>
                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><MdLock/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className="form-control" placeholder="Enter your password" name="password" onChange={onchangeInput}/>
                        
                        {/*
                            <span className="toggleShowPassword" onClick={()=>setisShowPassword(!isShowPassword)}>
                                {isShowPassword===true ? <FaEyeSlash/>: <FaEye/>} 
                            </span>
                        */}

                        </div>

                        <div className="form-group mb-3 position-relative">
                            <span className="icon"><TbShieldCheckFilled/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className="form-control" placeholder="Confirm your password" name="confirmPassword" onChange={onchangeInput}/>
                        </div>

                        <FormGroup>
                            <FormControlLabel required control={<Checkbox defaultChecked size="small" />} label="I agree to all Terms & Conditions" />
                        </FormGroup>


                        <div className="form-group mt-3">
                            <Button className="btn-blue btn-lg btn-big w-100">Sign In</Button>
                        </div>

                        <hr/>

                        <div className="form-group mb-3 position-relative text-center">
                            <img src={googleIcon} className="googleIcon " alt="googleIcon"/>
                        </div>
                       
                        
                        <div className='text-center mt-2'>
                            Already have an account?
                            <Link to={'/Login'} className="link color">Login</Link>
                        </div>
                       


                    </form>
                </div>

               

                </div>
                    </div>
                </div>


                
            </section>
        
    )
}
export default Register;