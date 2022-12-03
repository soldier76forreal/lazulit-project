//modules
import { Fragment, useState , useEffect , useRef , useContext } from "react";
import Style from './newProduct.module.css';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import { Redirect , useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import DeleteIcon from '@mui/icons-material/Delete';
import CpTagCard from "./specialTools/cpTagCard";
import Pag from "../tools/pagination";
import { SyncProblem } from "@mui/icons-material";
import BtnNewThingWithIcon from "../tools/btnNewThingWithIcon";
import SelectiveOutLineBtn from "../tools/selectiveOutLineBtn";
import CpProductsCard from "./specialTools/cpProductsCard";
import CpNormalHeader from "./specialTools/cpNormlaHeader";
import ProductPhotoGallery from "../tools/productPhotoGallery";
import Ck from "./specialTools/CKeditor";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import NewFeatureListModal from "./specialTools/newFeatureListModal";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../tools/modal";
import { indexOf } from "lodash";
import AuthContext from '../../store/auth';
import jwtDecode from "jwt-decode";
import Language from "../../store/language";
import placeholder from "../../assets/imagePlaceHolder.png"

    
const NewBlogPost = () =>{
    //----------------------------auth context---------------------------
    const authCtx = useContext(AuthContext);
    const decoded = jwtDecode(authCtx.token);
    const langCtx = useContext(Language);
    useEffect(() => {
        document.title = "محصول جدید";

    }, []);
     //------------------------------states------------------------------
     const ref = useRef();
     const ref1 = useRef();
     const ref2 = useRef();
     const ref3 = useRef();
     const ref4 = useRef();
     const ref5 = useRef();
     const ref6 = useRef();
     const ref7 = useRef();
     const ref8 = useRef();
     const ref9 = useRef();

     const history = useHistory();

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');
    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

     //-----------------------------------------------------------------------cover img state
     const [coverImg , setCoverImg] = useState('');
     
    //-----------------------------------------------------------------------cover img Error
     const [coverImgErr , setCoverImgErr] = useState('');


    //-----------------------------------------------------------------------blog post title code
    const [blogPostTitle , setBlogPostTitle] = useState('');
    const [blogPostTitleErr , setBlogPostTitleErr] = useState('');

    //-----------------------------------------------------------------------blog post subtitle code
    const [blogPostSubtitle, setBlogPostSubTitle] = useState('');
    const [blogPostSubtitleErr , setBlogPostSubtitleErr] = useState('');
    
    //-----------------------------------------------------------------------content state
     const [content , setContent] = useState('');
     const [contentErr , setContentErr] = useState('');
    //-----------------------------------------------------------------------source state
     const [source , setSource] = useState('');
     const [sourceErr , setSourceErr] = useState('');
    //-----------------------------------------------------------------------oprators state
    const [pageTitle , setPageTitle] = useState('');
    const [pageTitleErr , setPageTitleErr] = useState('');
    const [pageDescription , setPageDescription] = useState('');
    const [pageDescriptionErr , setPageDescriptionErr] = useState('');
    //------------------------------axios------------------------------

        //-----------------------------------save product to db
        const saveProduct = async() =>{
            let blogPostData = {author:decoded.id , content:content  , language:langCtx.language , title:blogPostTitle , subtitle:blogPostSubtitle , source:source , coverImage : coverImg , pageTitle:pageTitle , pageDescription:pageDescription};
            if(blogPostTitle === ''){
                setBlogPostTitleErr("عنوان را وارد نکردید")
                ref1.current.scrollIntoView(); 
            }
            if(blogPostSubtitle === ''){
                setBlogPostSubtitleErr('توضیحات را وارد نکردید')
                ref2.current.scrollIntoView(); 
            }
            if(coverImg === ''){
                setCoverImgErr('اپراتور تماس را انتخاب کنید');
                ref3.current.scrollIntoView(); 
            }
            if(content === ''){
                setContentErr('محتوای را وارد نکردید')
                ref4.current.scrollIntoView();
            }
            
            if(blogPostTitle !== '' && blogPostSubtitle !== '' && decoded.id !== undefined && content !== '' && coverImg !== '' ){
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/blog/saveNewBlog`,
                            data:blogPostData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('محصول ذخیره شد');
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                        const redirect = setTimeout(()=>{history.push(`/cp/blog/showBlog/${data._id}`)}, 500);
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast(error.response.data);
                        const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
                    }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast('فرم را تکمیل کنید');
                const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
            }
        }
        const ckEditorFunction = (e , editor) =>{
            const data = e.editor.getData();
            setContent(data);
            setContentErr('');
        } 
    return(
        <Fragment>
                {/* toasts */}
                <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <CpNormalHeader name='محصول جدید'></CpNormalHeader>
                               {/* new product */}
                               <Row dir="rtl">
                                   <Col xs={12} md={12} lg={6}>
                                       <Row>
                                            <Col style={{marginBottom:'14px'}} xs={12} md={12} lg={12 }>
                                                <div ref={ref1}  className={Style.formItemsDiv}>
                                                    {blogPostTitleErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{blogPostTitle}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>عنوان</h4></div>
                                                    }
                                                    <NormalInput  onChange={(e)=>{setBlogPostTitle(e.target.value); setBlogPostTitleErr('')}} placeholder='عنوان را وارد کنید...'></NormalInput>
                                                </div>
                                            </Col>
                                            <Col style={{marginBottom:'14px'}} xs={12} md={12} lg={12 }>
                                                <div ref={ref2}  className={Style.formItemsDiv}>
                                                    {blogPostSubtitleErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{blogPostSubtitleErr}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>توضیحات</h4></div>
                                                    }
                                                    <NormalInput  onChange={(e)=>{setBlogPostSubTitle(e.target.value); setBlogPostSubtitleErr('')}} placeholder='توضیحات را وارد کنید...'></NormalInput>
                                                </div>
                                            </Col>
                                       </Row>
                                   </Col>
                                   <Col xs={12} md={12} lg={6}>
                                   </Col>
                               </Row>
                               <Row dir="rtl">
                                    <div ref={ref3} className={Style.formItemsDiv}>
                                            {coverImgErr !== '' ?
                                                <div className={Style.featureHeader}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{coverImgErr}</h4></div>
                                            :
                                                <div className={Style.featureHeader}><h4>تصویر کاور</h4></div>
                                            }
                                            <Row>
                                                <Col  xs={12} md={12} lg={4}>
                                                    {coverImg !==''?
                                                        <img style={{width:'200px' , height:'200px'}} src={coverImg}></img>
                                                    :
                                                        <img style={{width:'200px' , height:'200px'}} src={placeholder}></img>
                                                    }
                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 70px'}} xs={12} md={12} lg={4}>
                                                    <div style={{marginTop:'95px'}}>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4 style={{fontFamily:'Dana1' , color:'#ac0000'}}>کاور</h4></div>
                                                            <NormalInput onChange={(e)=>{setCoverImg(e.target.value); setCoverImgErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                    </div>
                               </Row>       
                               <Row ref={ref4} dir="rtl">
                                    <div className={Style.formItemsDiv}>
                                        { contentErr!== '' ?
                                                <div  ref={ref5} className={Style.featureHeader}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{contentErr}</h4></div>
                                            :
                                            
                                                <div  className={Style.featureHeader}><h4>نقد و بررسی محصول</h4></div>
                                        }
                                        <Col xs={12} md={12} lg={6}>
                                            <Ck  ckEditorFunction={ckEditorFunction}></Ck>
                                        </Col>
                                    </div>
                               </Row>
                               <Row ref={ref5} dir="rtl">
                                        <div className={Style.formItemsDiv}>
                                            <div className={Style.featureHeader}><h4>Document head</h4></div>
                                            <Col xs={12} md={12} lg={6}>
                                                <div className={Style.inputDiv2}>
                                                    <div className={Style.lableDiv}><h4>Title</h4></div>
                                                    <NormalInput onChange={(e)=>{setPageTitle(e.target.value); setPageTitleErr('')}} placeholder='...'></NormalInput>
                                                </div>
                                                <div className={Style.inputDiv2}>
                                                    <div className={Style.lableDiv}><h4>Description</h4></div>
                                                    <NormalInput onChange={(e)=>{setPageDescription(e.target.value); setPageDescriptionErr('')}} placeholder='...'></NormalInput>
                                                </div>
                                            </Col>
                                        </div> 
                                </Row>
                               <div className={Style.saveBtnDiv}>
                                   <button onClick={saveProduct} className={Style.saveForm}>ذخیره</button>
                               </div>
                            </div>        
                        </Col>
                    </Row>
                </Container>
        </Fragment>
    )
}

export default NewBlogPost;