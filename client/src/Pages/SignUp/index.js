import { useContext, useEffect,useState } from "react";
import { MyContext } from "../../App";
import Logo from '../../assets/images/Logo.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate  } from "react-router-dom";


const SignUp=()=>{

    const context = useContext(MyContext);
    const navigate = useNavigate();  // For redirecting user after signup

    // State to store input values
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        context.setisHeaderFooterShow(false);
        return () => context.setisHeaderFooterShow(true);  // Restore when unmounting
    }, []);
    

    // Function to handle user signup
    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Client-side validations
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!phoneRegex.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email must be a valid Gmail address (e.g., example@gmail.com).");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const res = await fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, email, password }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            context.setUser(data.user);  //  Update global user state
            context.setIsLogin(true);    //  Mark as logged in
            context.setisHeaderFooterShow(true);
            navigate("/SignIn");               //  Redirect to home or cart instead of SignIn
        }
        else {
            alert(data.msg);
        }
    };
    


    return(
        <>
        <section className="section signInPage signUpPage">
            
            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <img src={Logo}/>
                    </div>

                   
                    <form className="mt-2" onSubmit={handleSignup}>
                    <h2> Sign Up</h2>

                    <div className="row d-flex align-items-center">
                        <div className="col-md-6 ">
                            <div className="form-group ">
                                <TextField  label="Name" type="text" required variant="standard"  size="small" className="w-100"
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group ">
                                <TextField  label="Phone No" type="text" required variant="standard" className="w-100"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                        <div className="form-group ">
                           
                            <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="form-group ">
                           
                            <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        {/* <a className="border-effect cursor row">Forget Password?</a> */}
                        <div className="d-flex align items-center mt-2 mb-2">
                            <div className="row w-100">
                            <div className="col-md-6">
                                <Button className="btn-blue btn-lg btn-big col" type="submit">Sign Up</Button>
                            </div>

                            <div className="col-md-6">
                                <Link to="/" className="d-block w-100" > <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={()=>context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                                </div>
                            </div>

                            </div>
                        
                        
                        

                        <p>Already have an account? <Link to="/SignIn" className="border-effect">SignIn</Link> </p>
                        {/*<h6 className="mt-3 text-center font-weight-bold">Or continue with social account</h6>

                       
                        <Button className="googleImgSignup"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS53QVG-0mxeuhm8Vg_w0646YfPvJK3Q0HGA&s" /></Button>*/}
                        
                         

                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUp;