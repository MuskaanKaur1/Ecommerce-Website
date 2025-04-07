import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from '../../assets/images/Logo.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SignIn=()=>{

    const context = useContext(MyContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
        return () => context.setisHeaderFooterShow(true);  //  Restore when leaving page
    }, []);
    

    const handleSignin = async (e) => {
        e.preventDefault();
        
        const res = await fetch("http://localhost:4000/api/user/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
            console.log("User Data:", data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            
            context.setUser(data.user);   // Update user state in context
            context.setIsLogin(true);     // Mark user as logged in
            context.setisHeaderFooterShow(true);
        
            navigate("/");
        }
         else {
          alert(data.msg);
        }
    };
    

    return(
        <>
        <section className="section signInPage">
            
            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo}/>
                    </div>

                   
                    <form className="mt-3" onSubmit={handleSignin}> 
                        <h2> Sign In</h2>

                        <div className="form-group ">
                            <TextField id="filled-basic" label="Email" type="email" required variant="filled"  size="small" className="w-100" 
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="form-group ">
                            <TextField id="filled-basic" label="Password" type="password" required variant="filled"  size="small"className="w-100" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        {/* <a className="border-effect cursor row">Forget Password?</a>*/}

                        <div className="d-flex align items-center mt-3 mb-3">
                        <Button className="btn-blue btn-lg btn-big col" type="submit">Sign In</Button>
                        <Link to="/"> <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={()=>context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                        </div>
                        

                        <p>Not Registered? <Link to="/SignUp" className="border-effect">SignUp</Link> </p>
                        {/*<h6 className="mt-3 text-center font-weight-bold">Or continue with social account</h6>

                       
                        <Button className="googleImg"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS53QVG-0mxeuhm8Vg_w0646YfPvJK3Q0HGA&s" /></Button>*/}
                        
                         

                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignIn;