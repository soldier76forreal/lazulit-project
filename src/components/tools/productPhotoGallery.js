//modules
import { Fragment, useState , useEffect } from "react";
import Style from './productPhotoGallery.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faStar} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-photoswipe/lib/photoswipe.css';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import {PhotoSwipe} from 'react-photoswipe';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

//placeholder img
import PlaceHolderImg from '../../assets/imagePlaceHolder.png'
import BulletPoint from '../../assets/bullet.svg'
import Slider from "react-slick";
const ProductPhotoGallery = (props) =>{
    const [currentImage , setCurrentImage] = useState(props.galleryImages[0]);
    const [selectedImage , setSelectedImage] = useState('تصویر محصول 1');
    useEffect(() => {
        setCurrentImage(props.galleryImages[0]);

    }, [props.galleryImages[0]])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchMove:true,
        swipeToSlide: true,
        arrows:false,
      };

    return(
    <Fragment>

        <div  className={Style.imageGalleryDiv}>
                
            {/* main gallery */}
            <Row>
                <Col style={{ paddingLeft: '10px', paddingRight: '10px' }} xs={12} md={12} lg={12}>
                        <div className={Style.selectedPhotoDiv}>
                            <div onClick={()=>{props.openFullViewFn(currentImage , selectedImage)}} className={Style.fullViewTip}><FullscreenIcon sx={{marginRight:'3px' , padding:'0px'}}></FullscreenIcon>نمایش کامل</div>
                            <img onClick={()=>{props.openFullViewFn(currentImage , selectedImage)}} src={props.galleryImages[0] === '' ? `${PlaceHolderImg}` : `${currentImage}`} className={Style.mainImg}></img>
                        </div>
                </Col>
            </Row>
            {/* sub photo */}
            <Row  style={{ paddingLeft: '0px', paddingRight: '0px' }} >
            <div  className={Style.selectImg} style={{ paddingLeft: '6px', paddingRight: '8px' }}>
                <Slider {...settings}>
                    {props.galleryImages[0] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 1' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[0] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[0]}`} className={selectedImage === 'تصویر محصول 1' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[1] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 2' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[1] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[1]}`} className={selectedImage === 'تصویر محصول 2' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[2] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 3' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[2] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[2]}`} className={selectedImage === 'تصویر محصول 3' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[3] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 4' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[3] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[3]}`} className={selectedImage === 'تصویر محصول 4' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[4] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 5' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[4] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[4]}`} className={selectedImage === '5' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[5] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 6' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[5] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[5]}`} className={selectedImage === 'تصویر محصول 6' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[6] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 7' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[6] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[6]}`} className={selectedImage === 'تصویر محصول 7' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                    {props.galleryImages[7] !== ''?
                        <div >
                            <div style={{borderRadius:'8px' , padding:'0px 5px 0px 5px'}} className={Style.subPhotoDiv}>
                                <img alt='تصویر محصول 8' onClick={(e)=>{setCurrentImage(e.target.src); setSelectedImage(e.target.alt)}} src={props.galleryImages[7] === '' ? `${PlaceHolderImg}`:`${props.galleryImages[7]}`} className={selectedImage === 'تصویر محصول 8' ? `${Style.activeImage}` : `${Style.subImg}`}></img>
                            </div>
                        </div>
                    :null}
                </Slider>
            </div>
            </Row>
        </div>
    </Fragment>
    )
}

export default ProductPhotoGallery;