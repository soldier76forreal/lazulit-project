//modules
import { Fragment, useState } from "react";
import Style from './cpProductShowCase.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faStar} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import NormalBtn from "../tools/normalBtn";
import NormalInput from "../tools/normalInput";
import MultiLangBtn from "../tools/multiLangBtn";
import CpSideBar from "./specialTools/cpSideBar";
import NormalSelect from "../tools/normalSelect";
import NormalHeader from "../tools/normalHeader";
import SearchBar from "../tools/searchBar";
import CpCategoryCard from "./specialTools/cpCategoryCard";
import MultiSelect from "../tools/reactSelectMulti";
import CpTagCard from "./specialTools/cpTagCard";
import Pag from "../tools/pagination";
import { SyncProblem } from "@mui/icons-material";
import BtnNewThingWithIcon from "../tools/btnNewThingWithIcon";
import SelectiveOutLineBtn from "../tools/selectiveOutLineBtn";
import CpProductsCard from "./specialTools/cpProductsCard";
import CpNormalHeader from "./specialTools/cpNormlaHeader";
import CommentBox from "../tools/commentBox";
import CommentItself from "../tools/commentItself";
import StarRating from "../tools/ratingStar";
//placeholder img
import PlaceHolderImg from '../../assets/a.jpg'
import BulletPoint from '../../assets/bullet.svg'


const CpProductShowCase = () =>{
    //------------------------------states------------------------------
    const [productRate , setProductRate]  =  useState(3);

    //------------------------------listners------------------------------
    return(
        <Fragment>
            <Container>
                <div className={Style.inndeDiv}>
                <Row dir="rtl">
                    <Col xs={0} md={1} lg={1}>
                        
                    </Col>
                    {/*---------------------------- product ShowCase section ----------------------------*/}
                    <Col xs={12} md={10} lg={10}>
                        <Row>
                            {/* product route */}
                            <Col xs={12} md={12} lg={12}>
                                <div className={Style.routeBackground}>
                                    <div>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                        <Row>
                            {/*-------- photo gallery --------*/}
                                <Col xs={12} md={6} lg={6}>
                                   <div className={Style.imageGalleryDiv}>
                                        {/* main gallery */}
                                        <Row>
                                            <Col style={{ paddingLeft: '10px', paddingRight: '10px' }} xs={12} md={12} lg={12}>
                                                    <div className={Style.selectedPhotoDiv}>
                                                    <img src={`${PlaceHolderImg}`} className={Style.mainImg}></img>

                                                    </div>
                                            </Col>
                                        </Row>
                                        {/* sub photo */}
                                        <Row>
                                            <Col style={{ paddingLeft: '5px', paddingRight: '10px' }} className={Style.colStyle} xs={3} md={3} lg={3}>
                                                    <div className={Style.subPhotoDiv}>
                                                        <img src={`${PlaceHolderImg}`} className={Style.subImg}></img>
                                                    </div>
                                            </Col>
                                            <Col style={{ paddingLeft: '5px', paddingRight: '5px' }} xs={3} md={3} lg={3}>
                                                    <div className={Style.subPhotoDiv}>
                                                        <img src={`${PlaceHolderImg}`} className={Style.subImg}></img>
                                                    </div>
                                            </Col>
                                            <Col style={{ paddingLeft: '5px', paddingRight: '5px' }} xs={3} md={3} lg={3}>
                                                    <div className={Style.subPhotoDiv}>
                                                        <img src={`${PlaceHolderImg}`} className={Style.subImg}></img>
                                                    </div>
                                            </Col>
                                            <Col style={{ paddingLeft: '10px', paddingRight: '5px' }} xs={3} md={3} lg={3}>
                                                    <div className={Style.subPhotoDiv}>
                                                        <img src={`${PlaceHolderImg}`} className={Style.activeImage}></img>
                                                    </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            {/*---------- product Brief ----------*/}
                            <Col xs={12} md={6} lg={6}>
                                <Row>
                                    <div className={Style.productBriefDiv}>
                                        {/*-------- product title --------*/}
                                        <Col xs={12} md={12} lg={12}>
                                            <div className={Style.productTitleDiv}>
                                                <h4>سنگ ساختمانی تراورتن</h4>
                                            </div>
                                        </Col>
                                        {/*-------- rate and functions --------*/}
                                        <Col xs={12} md={12} lg={12}>
                                            <div  className={Style.productRatingDiv}>
                                                {/* rate star */}
                                                {[...Array(5-productRate)].map((star , i)=>{
                                                    return(
                                                        <lable>
                                                            <FontAwesomeIcon icon={['far', 'star']} color='#CE9800' style={{fontSize:'15px'}} ></FontAwesomeIcon>
                                                        </lable>
                                                    )
                                                })}
                                                {[...Array(productRate)].map((star , i)=>{
                                                    return(
                                                        <lable>
                                                            <FontAwesomeIcon color='#CE9800' style={{fontSize:'15px'}} icon='star'></FontAwesomeIcon>
                                                        </lable>
                                                    )
                                                })}
                                                {/* rate info */}
                                               <h3 className={Style.rateTextStyle}>4.5</h3>
                                               <h3 className={Style.horizonDiv}>|</h3>
                                               <h3 className={Style.commentText}>20 دیدگاه</h3>
                                            </div>
                                        </Col>
                                        {/*-------- Line --------*/}
                                        <Col xs={12} md={12} lg={12}>
                                            <div className={Style.line}></div>
                                        </Col>

                                        {/*-------- features --------*/}
                                        <Col xs={12} md={12} lg={12}>
                                            <div className={Style.featuresDiv}>
                                                <h3>ویژگی ها</h3>
                                                <ul style={{listStyleImage : `url(${BulletPoint})`}} className={Style.featuresUl}>
                                                    <li>نوع کاربری:ساختمان</li>
                                                    <li>سایز:1000*1000</li>
                                                    <li>رنگ:قهوه ای</li>
                                                    <li>رنگ:قهوه ای</li>
                                                </ul>
                                            </div>
                                        </Col>
                                        {/* price */}
                                        <Col xs={12} md={12} lg={12}>
                                            <div className={Style.priceDiv}>
                                                <div className={Style.meterDiv}><h4>قیمت هر متر</h4></div>
                                                <div className={Style.priceItSelfDiv}><h4>920,000</h4><span className={Style.priceUnit}>تومان</span></div>
                                            </div>
                                        </Col>
                                        {/* contact btn */}
                                        <Col xs={12} md={12} lg={12}>
                                            <div className={Style.purchaseDiv}>
                                                <div className={Style.purchaseTitle}><h4>سفارش و مشاوره</h4></div>
                                                <div className={Style.purchaseBtn}>
                                                    <button className={Style.contactBtn}>تماس</button>
                                                    <button className={Style.whatsAppBtn}>واتساپ</button>
                                                </div>
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} md={1} lg={1}>
                    </Col>
                </Row>
                <Row>
                    {/*-------- navigation section --------*/}
                        <Col  style={{padding:'0px'}} xs={12} md={12} lg={12}>
                            <div dir="rtl" className={Style.productPostNavigation}>
                                <ul className={Style.unortherList}>
                                    <li className={Style.unortherListActive}>مشخصات کلیدی</li>
                                    <li>نقد و بررسی</li>
                                    <li>دیدگاه کاربری</li>
                                </ul>
                            </div>
                        </Col>
                </Row>
                <Row>
                    <Col xs={0} md={1} lg={1}>
                    </Col>
                    {/*-------- navigation section --------*/}
                    <Col  xs={12} md={10} lg={10}>

                        {/* featuresTable */}
                        <div dir="rtl" className={Style.featuresTable}>
                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='مشخصات کلیدی'></NormalHeader>
                            <table className={Style.styled_table}>
                                    <thead>
                                        <tr>
                                            <th>سایز بندی</th>
                                            <th>آب گریزی</th>
                                            <th>کیفیت</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dom</td>
                                        </tr>
                                        <tr>
                                            <td>Melissa</td>
                                        </tr>
                                        <tr>
                                            <td>A</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>     
                        <div style={{width:'100%' , height:'2px' , backgroundColor:'#7B99D5'}}></div>
                    
                        {/* review */}
                        <div className={Style.reviewDiv}>
                            <div className={Style.reviewHeaderDiv}>
                                <h3>نقد و بررسی تخصصی</h3>
                                <h2>سنگ تراورتن</h2>
                            </div>
                            <div dir="rtl" className={Style.reviewContentDiv}>

                                <h4>مقدمه</h4>
                                    <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                    </p>
                                <div>                                    
                                    <img style={{maxWidth:'700px' }} className={Style.reviewImg} src={`${PlaceHolderImg}`}></img>
                                </div>
                                <video  controls>
                                    <source src="https://loremsaz.com//content/img/تولید_لورم_ایپسوم_در_پاراگراف_با_پلاگین_ایمت.mp4" type="video/mp4"/>
                                </video>
                            </div>
                        </div>

                        <div style={{width:'100%' , height:'2px' , marginTop:'12px' , backgroundColor:'#7B99D5'}}></div>
                        
                        <div  className={Style.commentSectionDiv}>
                            <div  className={Style.commentSectionHeaderDiv}>
                                    <div className={Style.theHeaderItSelfDiv}>
                                        <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='دیدگاه کاربران'></NormalHeader>
                                   </div> 
                                   <div className={Style.theRateItSelfDiv}>
                                        <h5>امتیاز این محصول <span>4.5 </span>از 5</h5>
                                   </div>
                            </div>
                            <div className={Style.commentBoxDiv}>
                                <CommentBox></CommentBox>
                            </div>
                            <div className={Style.commentDiv}>
                                    <CommentItself></CommentItself>
                            </div>
                        </div>
                                                
                    </Col>
                    <Col xs={0} md={1} lg={1}>
                    
                    </Col>
                </Row>
                </div>

            </Container>
        </Fragment>
        
    )


}
export default CpProductShowCase;