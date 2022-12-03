//modules
import { Fragment, useState , useEffect , useRef, useContext } from "react";
import Style from './cpProductShowCase.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory , useLocation , useParams } from "react-router-dom";
import axios from "axios";
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
import ProductPhotoGallery from "../tools/productPhotoGallery";
import PhoneCallModal from "../tools/phoneCallModal";
import Loader from "../tools/loader";
import NoDataFigure from "../tools/noDataFigure";
//placeholder img
import PlaceHolderImg from '../../assets/a.jpg'
import BulletPoint from '../../assets/bullet.svg'
import AuthContext from "../../store/auth";
import Language from "../../store/language";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
const CpProductShowCase = () =>{
    const ref = useRef();
    const params = useParams();
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language);
    //------------------------------states------------------------------
    const [productRate , setProductRate]  =  useState(3);
    const [product , setProduct] = useState({});
    const [keyFeature , setKeyFeature] = useState([]);
    const [price , setPrice] = useState({});
    const [imageGallery , setImageGallery] = useState([]);
    const [feature , setFeature] = useState([]);
    const [waContactBtn , setWaContactBtn] = useState({});
    const [pContactBtn , setpContactBtn] = useState({});

    const [pageLoading , setPageLoading] = useState(true);

    const [phoneCallModal , setPhoneCallModal] = useState(false);

    //------------------------------listners------------------------------

    


    //------------------------------axios listner------------------------------
        //get tags
    const getProduct = async () =>{

            try{
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getProduct`,
                        params:{id:
                            params.productId,
                            language:langCtx.language
                        },
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const dataRes = response.data;
                    setProduct(dataRes.product);
                    setKeyFeature([...dataRes.product.keyFeatures]);
                    setPrice(dataRes.product.price);
                    setImageGallery([...dataRes.product.images]);
                    setFeature([...dataRes.product.features]);
                    setWaContactBtn(dataRes.phoneContacts[0]);
                    setpContactBtn(dataRes.phoneContacts[1]);
                    setPageLoading(false);
                    document.title = dataRes.product.title;
            }catch(err){
                console.log(err);
            }       
         
    }



    useEffect(() => {
        getProduct();
    }, []);
    if(pageLoading === true){
        return(
            <div className={Style.loaderDiv} >
                 <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
            </div>

        )
    }else if(pageLoading === false){
        return(
                <Fragment>  
                    {/* Modal*/}
                    {Object.keys(pContactBtn).length !== 0 ?
                         <PhoneCallModal data={pContactBtn} closeModalFn={()=>{setPhoneCallModal(false)}} showModal={phoneCallModal}></PhoneCallModal>
                    :null}
                   <Container>
                        <div className={Style.inndeDiv}>
                            <Row style={{margin:'0px 0px 20px 0px'}} >
                                <Col xs={0} md={1} lg={1}>
                                    
                                </Col>
                                {/*---------------------------- product ShowCase section ----------------------------*/}
                                <Col  xs={12} md={10} lg={10}>
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

                                        {/*---------- product Brief ----------*/}
                                        <Col dir="rtl" xs={12} md={6} lg={6}>
                                            <Row>
                                                <div className={Style.productBriefDiv}>
                                                    {/*-------- product title --------*/}
                                                    <Col xs={12} md={12} lg={12}>
                                                        <div className={Style.productTitleDiv}>
                                                            <h4>{product.title}</h4>
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
                                                                
                                                                {keyFeature.map(data=>{
                                                                    return(
                                                                        <li>{data.title}:<span>{data.content}</span></li>
                                                                    )
                                                                })}
                                                            
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                    {/* price */}
                                                    <Col xs={12} md={12} lg={12}>
                                                        {price.price === null ?
                                                            <div className={Style.priceDiv}>
                                                                <div className={Style.meterDiv}><h4>قیمت</h4></div>
                                                                <div className={Style.priceItSelfDiv}><h4>تماس بگیرید</h4></div>
                                                            </div>
                                                        :
                                                            <div className={Style.priceDiv}>
                                                                <div className={Style.meterDiv}><h4>{price.measure}</h4></div>
                                                                <div className={Style.priceItSelfDiv}><h4>{parseInt(price.price).toLocaleString()}</h4><span className={Style.priceUnit}>تومان</span></div>
                                                            </div>
                                                        }

                                                        {product.stock === true ?
                                                            <div className={Style.stockStyle}>
                                                                <CheckCircleIcon sx={{color:'#00CC81' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></CheckCircleIcon>
                                                                {product.availableSurface === null?
                                                                    <h4 className={Style.availableSurfaceDiv}>موجودی انبار</h4>
                                                                :
                                                                    <h4 className={Style.availableSurfaceDiv}>موجودی انبار:<span>{product.availableSurface}</span> متر </h4>
                                                                }
                                                            </div>
                                                        :
                                                            <div className={Style.stockStyle}>
                                                                <ErrorIcon sx={{color:'#cc1800' , fontSize:'23px' , marginRight:'7px' , marginTop:'2px'}}></ErrorIcon>
                                                                <h4>اتمام موجودی</h4>
                                                            </div>
                                                        }
                                                    </Col>
                                                    {/* contact btn */}
                                                    <Col xs={12} md={12} lg={12}>
                                                        <div className={Style.purchaseDiv}>
                                                            <div style={{display:'inline-block'}} className={Style.purchaseTitle}><h4>سفارش و مشاوره</h4></div>
                                                            <div style={{display:'inline-block' , backgroundColor:'#354063' , color:'#fff' , padding:'3px 8px 3px 8px' , borderRadius:'6px' , float:'left' , margin:'6px 0px 0px 14px'}} className={Style.productRate}>کد محصول:<span>{product.productCode}</span></div>
                                                            <div className={Style.purchaseBtn}>
                                                                <button onClick={()=>{setPhoneCallModal(true)}} className={Style.contactBtn}>تماس</button>
                                                                <a target='blank' href={`https://api.whatsapp.com/send?phone=98${parseInt(waContactBtn.phoneNumber, 10)}`}><button className={Style.whatsAppBtn}>واتساپ</button></a>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Row>
                                        </Col>
                                        {/*-------- photo gallery --------*/}
                                        <Col  xs={12} md={6} lg={6}>
                                            <ProductPhotoGallery galleryImages={imageGallery}></ProductPhotoGallery>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={0} md={1} lg={1}>
                                </Col>
                            </Row>
                            <Row style={{padding:'0px' , position: 'sticky' , top:'0'}} >
                                {/*-------- navigation section --------*/}
                                    <Col  style={{padding:'0px'}} xs={12} md={12} lg={12}>
                                        <div  dir="rtl" className={Style.productPostNavigation}>
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
                                        <ul className={Style.featuresListUl}>
                                            {feature.map((data , i)=>{
                                                return(
                                                    <div>
                                                        <li><div className={Style.itemName}>{data.title}</div><div className={Style.itemValue}>{data.content}</div></li>
                                                        {feature.length === i+1 ? <div style={{width:'0%' , height:'0px' , backgroundColor:'#d1d1d1'}}></div>:<div style={{width:'100%' , borderRadius:'50px' , height:'1px' , backgroundColor:'#d1d1d1'}}></div>}                                
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>     
                                    <div style={{width:'100%' , height:'2px' , backgroundColor:'#7B99D5'}}></div>
                                
                                    {/* review */}
                                    {/* <StarRating></StarRating> */}
                                    <div ref={ref} className={Style.reviewDiv}>
                                        <div className={Style.reviewHeaderDiv}>
                                            <h3>نقد و بررسی تخصصی</h3>
                                            <h2>{product.title}</h2>
                                        </div>
                                        <div  dir="rtl" className={Style.reviewContentDiv} dangerouslySetInnerHTML={{__html: `${product.productRiview}`}} />
                                        {/* <div id="productRiview" dir="rtl" className={Style.reviewContentDiv}>
                                        
                                        </div> */}
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
                                                {/* <CommentItself></CommentItself> */}
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

}
export default CpProductShowCase;