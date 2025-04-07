import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardBox from '../Dashboard/Components/dashboardBox';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { IoMdColorPalette } from "react-icons/io";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { IoPricetagsSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdPublishedWithChanges } from "react-icons/md";
import Button from '@mui/material/Button';

import { LiaStarSolid } from "react-icons/lia";
import UserAvatarImgComponent from '../../components/userAvatarImg';
import Rating from '@mui/material/Rating';
import { useRef } from 'react';




//breadcrumbs
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591



const ProductDetails=()=>{

  const productSliderBig= useRef();
  const productSliderSml= useRef();


  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }; 

  const goToSlide=(index)=>{
    productSliderBig.current.slickGoTo(index);
   
  }
  
    return(
        <div className="right-content w-100">
            <div className='card shadow border-0 w-100  p-4 res-col'>
                <h5 className='mb-0 color-white'>Product View</h5>
                <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs_'>
                    <StyledBreadcrumb
                        component="a"
                        href="/dashboard"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    <StyledBreadcrumb
                        label="Products"
                        component="a"
                       href="/products"
                        />

                    <StyledBreadcrumb
                        label="Product View"
                       
                    />
                </Breadcrumbs>
            </div>

            <div className='card productdetailsSection'>
              <div className='row'>
                <div className='col-md-5'>
                  <div className='sliderWrapper pt-3 pb-3 pl-4 pr-4'>
                    <h6 className='mb-3 gallery flex-row'>PRODUCT GALLERY</h6>
                  <Slider {...productSliderOptions} ref={productSliderBig} className='sliderBig'>
                    <div className='item1 p-4'>
                      <img src="https://m.media-amazon.com/images/I/41+y518eUxL.jpg" className='w-100'/>
                    </div>
                    <div className='item1 p-4'>
                      <img src="https://m.media-amazon.com/images/I/517EG4or+eL._AC_UL320_.jpg" className='w-100'/>
                    </div>
                    <div className='item1 p-4'>
                      <img src="https://m.media-amazon.com/images/I/51OkoJ2P36L._AC_UL320_.jpg" className='w-100'/>
                    </div>
                    <div className='item1 p-4'>
                      <img src="https://images-eu.ssl-images-amazon.com/images/I/51S904DOXKL._AC_UL165_SR165,165_.jpg" className='w-100'/>
                    </div>
                    <div className='item1 p-4'>
                      <img src="https://m.media-amazon.com/images/I/61kwbxcaVjL._AC_UL320_.jpg" className='w-100'/>
                    </div>
                    <div className='item1 p-4'>
                      <img src="https://m.media-amazon.com/images/I/41fUCF+u7yL._AC_UL320_.jpg" className='w-100'/>
                    </div>
                  </Slider>

                    <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="sliderSmall"  
                      ref={productSliderSml}
                    >
        

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(0)}>
                      <img src="https://m.media-amazon.com/images/I/41+y518eUxL.jpg" className='w-100'/>
                    </div></SwiperSlide>

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(1)}>
                      <img src="https://m.media-amazon.com/images/I/517EG4or+eL._AC_UL320_.jpg" className='w-100'/>
                    </div></SwiperSlide>

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(2)}>
                      <img src="https://m.media-amazon.com/images/I/51OkoJ2P36L._AC_UL320_.jpg" className='w-100'/>
                    </div></SwiperSlide>

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(3)}>
                      <img src="https://images-eu.ssl-images-amazon.com/images/I/51S904DOXKL._AC_UL165_SR165,165_.jpg" className='w-100'/>
                    </div></SwiperSlide>

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(4)}>
                      <img src="https://m.media-amazon.com/images/I/61kwbxcaVjL._AC_UL320_.jpg" className='w-100'/>
                    </div></SwiperSlide>

                    <SwiperSlide>
                      <div className='item' onClick={()=>goToSlide(5)}>
                      <img src="https://m.media-amazon.com/images/I/41fUCF+u7yL._AC_UL320_.jpg" className='w-100'/>
                    </div></SwiperSlide>
                   
                    </Swiper>
                </div>
                </div>

                <div className='col-md-7 productDetailsInfo'>
                  <div className='pt-3 pb-3 pl-4 pr-4'>
                    <h6 className='mb-3 '>PRODUCT DETAILS</h6>
                    <h4 className='mb-4 color-white'>Formal suits for men wedding slim fit 3 piece dress business party jacket
                    </h4>

                    <div className='productInfo'>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdBrandingWatermark/></span>
                          <span className='name'>Brand:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>Ecstasy</span>
                        </div>
                      </div>


                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><BiSolidCategoryAlt/></span>
                          <span className='name'>Categories:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>Men</span>
                        </div>
                      </div>
                     
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoIosPricetags/></span>
                          <span className='name'>Tags:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span ><Button>Suite</Button>
                                <Button>Party Dress</Button>
                                <Button>Smart</Button>
                                <Button>Man</Button> </span>
                        </div>
                      </div>

                     
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoMdColorPalette/></span>
                          <span className='name'>Color:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span><Button>Red </Button>
                          <Button>Blue </Button>
                          <Button>White</Button></span>
                        </div>
                      </div>


                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPhotoSizeSelectLarge/></span>
                          <span className='name'>Size:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span><Button>S</Button> <Button>M</Button> <Button>L</Button> <Button>XL</Button></span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoPricetagsSharp/></span>
                          <span className='name'>Price:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>$35.00</span>
                        </div>
                      </div>

                     
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><LiaStarSolid/></span>
                          <span className='name'>Review:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>(03) Review</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><PiShoppingCartFill/></span>
                          <span className='name'>In Stock:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>(68) Piece</span>
                        </div>
                      </div>

                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdPublishedWithChanges/></span>
                          <span className='name'>Published:</span>
                        </div>

                        <div className='col-sm-7'>
                          <span className='color-black-light'>02 Feb 2020</span>
                        </div>
                      </div>

                    </div>
                </div>
                </div>
              </div>

              <div className='p-4 mb-3'>
                  <h4 className='mt-4 mb-3 color-white'>Product Description</h4>
                  <p className='color-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! Sit voluptatem delectus nam, molestiae, repellendus ab sint quo aliquam debitis amet natus doloremque laudantium? Repudiandae, consequuntur, officiis quidem quo deleniti, autem non laudantium sequi error molestiae ducimus accusamus facere velit consectetur vero dolore natus nihil temporibus aspernatur quia consequatur? Consequuntur voluptate deserunt repellat tenetur debitis molestiae doloribus dicta. In rem illum dolorem atque ratione voluptates asperiores maxime doloremque laudantium magni neque ad quae quos quidem, quaerat rerum ducimus blanditiis reiciendis</p>


                 
                  <h4 className='mt-4 mb-3 color-white'>Rating Analytics</h4>
                    <div className='ratingSection mt-4'>
                      <div className='ratingGrow d-flex align-items-center mb-2'>
                        <div className='col-1 color-white'>
                          5 Star
                        </div>

                        <div className='col-2 '>
                        <div class="progress">
                            <div className="progress-bar" style={{width:'90%'}}>
                            </div>
                          </div>
                        </div>

                        <div className='col-3 color-white'>
                          90%
                        </div>
                      </div>
                    

                   
                      <div className='ratingGrow d-flex align-items-center mb-2'>
                        <div className='col-1 color-white'>
                          4 Star
                        </div>

                        <div className='col-2 '>
                        <div class="progress">
                            <div className="progress-bar" style={{width:'70%'}}>
                            </div>
                          </div>
                        </div>

                        <div className='col-3 color-white'>
                          70%
                        </div>
                      </div>
                    

                   
                      <div className='ratingGrow d-flex align-items-center mb-2'>
                        <div className='col-1 color-white'>
                          3 Star
                        </div>

                        <div className='col-2 '>
                        <div class="progress">
                            <div className="progress-bar" style={{width:'50%'}}>
                            </div>
                          </div>
                        </div>

                        <div className='col-3 color-white'>
                          50%
                        </div>
                      </div>
                    

                    
                      <div className='ratingGrow d-flex align-items-center mb-2'>
                        <div className='col-1 color-white'>
                          2 Star
                        </div>

                        <div className='col-2 '>
                        <div class="progress">
                            <div className="progress-bar" style={{width:'30%'}}>
                            </div>
                          </div>
                        </div>

                        <div className='col-3 color-white'>
                          30%
                        </div>
                      </div>
                    
                   
                      <div className='ratingGrow d-flex align-items-center '>
                        <div className='col-1 color-white'>
                          1 Star
                        </div>

                        <div className='col-2 '>
                        <div class="progress">
                            <div className="progress-bar" style={{width:'20%'}}>
                            </div>
                          </div>
                        </div>

                        <div className='col-3 color-white'>
                          20%
                        </div>
                      </div>
                      </div>

                    <br/>

                    <h6 className="mt-4 mb-4 color-white">Customers_review</h6>

                    <div className='reviewSection'>
                      <div className='reviewsRow'>
                        <div className="row">
                          <div className='col-sm-7'>
                           
                              <div className='userInfo d-flex align-items-center'>
                                <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfHAI5TQ1OZicPaCFBxQkfIanwkzsTuNLUw&s" className="imgSize"/>

                                <div className='info color-white'>
                                  <h6>Rebeka</h6>
                                  <span>25 minutes ago!</span>
                                </div>

                              </div>

                              <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly size="small"/>

                          </div>

                          <p className='color-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>

                        </div>

                        
                      </div>

                      <div className='reviewsRow'>
                        <div className="row">
                          <div className='col-sm-7'>
                           
                              <div className='userInfo d-flex align-items-center'>
                                <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjocpD8FmO9dhbP4l7GypY_UYB-fkUqbDbZg&s" className="imgSize"/>

                                <div className='info color-white'>
                                  <h6>Jubayer</h6>
                                  <span>1 day ago!</span>
                                </div>

                              </div>

                              <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly size="small"/>

                          </div>

                          <p className='color-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>

                        </div>

                        
                      </div>

                      <div className='reviewsRow'>
                        <div className="row">
                          <div className='col-sm-7'>
                           
                              <div className='userInfo d-flex align-items-center'>
                                <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIcAg8qIRvgVcPN8qnMQ18XucdmyPXZzYkQ&s" className="imgSize"/>

                                <div className='info color-white'>
                                  <h6>Ram Kumar</h6>
                                  <span>1 week ago!</span>
                                </div>
                              </div>

                              <Rating name="half-rating-read" defaultValue={3} precision={0.5} readOnly size="small"/>

                          </div>

                          <p className='color-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>
                        </div>                   
                      </div>


                    </div>
               
                      <br/>

                      <h6 className="mt-4 mb-4 color-white">Review Reply Form</h6>

                      <form className='reviewForm color-white'>
                        <textarea placeholder='write here'>

                        </textarea>

                        <Button className='btn-blue btn-big btn-lg w-100'>Submit your Review</Button>
                      </form>


                    </div>
                   

              
            </div>

        </div>
    )
}

export default ProductDetails;