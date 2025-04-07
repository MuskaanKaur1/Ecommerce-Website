import { IoShirtOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { PiSealPercent } from "react-icons/pi";
import { PiCurrencyCircleDollarDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";



const Footer=()=>{
    return(
        <>
        <footer>
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><IoShirtOutline/></span>
                        <span className="ml-2">Everyday fresh products</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><BsTruck/></span>
                        <span className="ml-2">Free delivery for order over $70</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><PiSealPercent/></span>
                        <span className="ml-2">Daily Mega Discounts</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><PiCurrencyCircleDollarDuotone/></span>
                        <span className="ml-2">Best price on the market</span>
                    </div>
                </div>
                        

                    <div className="row mt-5 linksWrap">
                        <div className="col">
                            <h5>Shop Now</h5>
                             <ul>
                                <li><Link to="#">Collections</Link></li>
                                <li><Link to="#">Trendy Products</Link></li>
                                <li><Link to="#">New Arrivals</Link></li>
                                <li><Link to="#">Featured Products</Link></li>
                                <li><Link to="#">Sitemaps</Link></li>
                             </ul>
                        </div>
                    

                        <div className="col">
                        <h5>Let Us Help You</h5>
                             <ul>
                                <li><Link to="#">Your Account</Link></li>
                                <li><Link to="#">Returns Centre</Link></li>
                                <li><Link to="#">Recalls and Product Safety Alerts</Link></li>
                                <li><Link to="#">100% Purchase Protection</Link></li>
                                <li><Link to="#">Help  </Link></li>
                             </ul>
                        </div>

                        <div className="col">
                            <h5>Connect with Us</h5>
                             <ul>
                                <li><Link to="#"><FaFacebook /><span className="ml-2">Facebook</span></Link></li>
                                <li><Link to="#"><FaTwitter/><span className="ml-2">Twitter</span></Link></li>
                                <li><Link to="#"><IoLogoInstagram/><span className="ml-2">Instagram</span></Link></li>
                                <li><Link to="#"><AiFillYoutube/><span className="ml-2">Youtube</span></Link></li>
                                <li><Link to="#"><FaLinkedin/><span className="ml-2">LinkedIn</span></Link></li>
                             </ul>
                        </div>

                        <div className="col">
                            <h5>Reach Us</h5>
                             <ul>
                                <li><Link to="#"><CiLocationOn/><span className="ml-2">Some area,some street,Mumbai,India</span></Link></li>
                                <li><Link to="#"><MdOutlinePhone/><span className="ml-2">+91 123456789</span></Link></li>
                                <li><Link to="#"><AiTwotoneMail/><span className="ml-2">shopZone@gmail.com</span></Link></li>
                             </ul>                            
                        </div>  
                    </div>
                        
                        
                <div className="copyright mt-3 pt-3 pb-3 d-flex">
                    <p className="mb-0">Copyright 2024. All rights reserved</p>
                    <ul className="list list-inline ml-auto mb-0">
                        <li className="list-inline-item">
                            <Link to="#"><IoLogoInstagram/></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#"><AiFillYoutube/></Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#"><FaTwitter/></Link>
                        </li>
                    </ul>
                </div>  
                        
                    
                
            </div>
        </footer>
        </>
    )
}
export default Footer;