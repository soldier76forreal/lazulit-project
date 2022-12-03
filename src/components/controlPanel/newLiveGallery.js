//modules
import { Fragment, useState , useEffect , useRef , useContext } from "react";
import Style from './newBlogPost.module.css';
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
import Ck from "../../components/controlPanel/specialTools/CKeditor";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import NewFeatureListModal from "./specialTools/newFeatureListModal";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../tools/modal";
import { indexOf } from "lodash";
import AuthContext from '../../store/auth';
import jwtDecode from "jwt-decode";
import Language from "../../store/language";
import PhotoSelectFromDataBase from "./specialTools/photoSelectFromDataBase";


    
const NewLiveGallery = () =>{
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


     const history = useHistory();

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');
    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

     //-----------------------------------------------------------------------gallery state
     const [imageGalleryFirst , setImageGalleryFirst] = useState('');
     const [imageGallerySecond , setImageGallerySecond] = useState('');
     const [imageGalleryThird , setImageGalleryThird] = useState('');
     const [imageGalleryFourth , setImageGalleryFourth] = useState('');
     const [imageGalleryFifth , setImageGalleryFifth] = useState('');
     const [imageGallerySixth , setImageGallerySixth] = useState('');
     const [imageGallerySeventh , setImageGallerySeventh] = useState('');
     const [imageGalleryEighth , setImageGalleryEighth] = useState('');
     const [galleryImages , setGalleryImages] = useState([]);
     

    const [liveGalleryErr , setLiveGalleryErr] = useState('');
    const [allProducts , setAllProducts] = useState([]);

        //-----------------------------------------------------------------------oprators state
        const [pageTitle , setPageTitle] = useState('');
        const [pageTitleErr , setPageTitleErr] = useState('');
        const [pageDescription , setPageDescription] = useState('');
        const [pageDescriptionErr , setPageDescriptionErr] = useState('');
    //------------------------------listners------------------------------

    const saveCategoriesInState = (e) =>{
        var categoriesData = e.map(function (i) { return i.value})
        // setCategories(categoriesData);
        // setCategoriesErr('');
    }


    //------------------------------axios------------------------------

    
        //------------------------------------get categories
        // const getAllCategories = async () =>{
        //         try{
        //             const response = await authCtx.jwtInst({
        //                 method:"get",
        //                 url:`${authCtx.defaultTargetApi}/newProduct/getAllCategories`,
        //                 params:{language:langCtx.language},
        //                 config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //             })
        //             const data = await response.data; 
        //             setAllCategories([...data]);
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast(error.response.data);
        //         }
        // }
        //------------------------------------get tags
        // const getAllTags = async () =>{

        //     let dataTag = {categoriesId:categories , language:langCtx.language};

        //     if(allCategories.length !== 0){
        //         try{
        //             const response = await authCtx.jwtInst({
        //                 method:"get",
        //                 url:`${authCtx.defaultTargetApi}/newProduct/getAllTags`,
        //                 params : dataTag,
        //                 config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //             })
        //             const data = await response.data; 
        //             setAllTags([...data]);  
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast(error.response.data);
        //         }
        //     }

        // }

        //------------------------------------get all oprators
        // const getAllCallOprator = async () =>{
        //     try{
        //         const response = await authCtx.jwtInst({
        //             method:"get",
        //             params:{language:langCtx.language},
        //             url:`${authCtx.defaultTargetApi}/newProduct/getAllOprator`,
        //             config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //         })
        //         const data = await response.data; 
        //         setAllOprator([...data]);
        //     }catch(error){
        //         setFailedOpenToast(true);
        //         setFailedMsgToast(error.response.data);
        //     }
        // }

        //------------------------------------get all WaOprators
        // const getAllWaOprator = async () =>{
        //     try{
        //         const response = await authCtx.jwtInst({
        //             method:"get",
        //             params:{language:langCtx.language},
        //             url:`${authCtx.defaultTargetApi}/newProduct/getAllWaOprator`,
        //             config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //         })
        //         const data = await response.data; 
        //         setAllWa(data);
        //     }catch(error){
        //         setFailedOpenToast(true);
        //         setFailedMsgToast(error.response.data);
        //     }
        // }


        //------------------------------------save new Feature in db
        // const saveFeatureList = async (titleName , featureListArray) =>{
        //     if(titleName !== ''){
        //         try{
        //             const listData = {
        //                 listName : titleName,
        //                 featureList : featureListArray,
        //                 language:langCtx.language
        //             }
        //                 const response = await authCtx.jwtInst({
        //                     method:"post",
        //                     url:`${authCtx.defaultTargetApi}/newProduct/newFeatureList`,
        //                     data:listData,
        //                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //                 })
        //                 const data = await response.data; 
        //                 setNewFeatureListModal(false);
        //                 setNewFeatureList(Math.random());
        //                 setSelectedList('');
        //                 setSuccessOpenToast(true);
        //                 setSuccessMsgToast("لیست اضافه شد");
        //                 const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast("لیست اضافه نشد!خطایی رخ داده است");
        //             const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
        //         }
        //     }else{
        //         setFailedOpenToast(true);
        //         setFailedMsgToast('اسمی برای لیست انتخاب نکردید');
        //         const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
        //     }
        // }


        //------------------------------------get all Feature
        // const getAllFeatureList = async (titleName , featureListArray) =>{
        //     try{
        //             const response = await authCtx.jwtInst({
        //                 method:"get",
        //                 params:{language:langCtx.language},
        //                 url:`${authCtx.defaultTargetApi}/newProduct/getAllFeatureList`,
        //                 config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //             })
        //             const data = await response.data; 
        //             setAllFeatureList(data);

        //     }catch(error){
        //         setFailedOpenToast(true);
        //         setFailedMsgToast(error.response.data);
        //     }
        
        // }


        //------------------------------------get all Feature
        const getAllProductss = async () =>{
            try{
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/liveGallery/allProducts`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllProducts([...data]);
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
            }
        
        }
        useEffect(() => {
            getAllProductss()
        }, []);

        // //-----------------------------------get feature list
        // const getTheList = async () =>{
        //     if(selectedList !== ''){    
        //         const listId = {listId:selectedList , language:langCtx.language};
        //         try{
        //                 const response = await authCtx.jwtInst({
        //                     method:"get",
        //                     params:listId,
        //                     url:`${authCtx.defaultTargetApi}/newProduct/getTheList`,
        //                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //                 })
        //                 const data = await response.data; 
        //                 var tempFeatureListArr = [];
        //                 for(var i = 0 ;data.featureList.length>i ; i++ ){
        //                     tempFeatureListArr.push({title:data.featureList[i].title , content:data.featureList[i].content , checked:false})
        //                 }
        //                 setSelectedListData([...tempFeatureListArr]);
                
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast(error.response.data);
        //         }
        //     }
        // }

        // //-----------------------------------delete feature list
        // const deleteTheList = async () =>{
        //     const  dataToSend ={deleteTheListId:selectedList , language:langCtx.language};
        //         try{
        //             const response = await authCtx.jwtInst({
        //                 method:"post",
        //                 url:`${authCtx.defaultTargetApi}/newProduct/deleteFeatureList`,
        //                 data:dataToSend,
        //                 config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //             })
        //             const data =  response; 

        //             setShowDeleteModal(false);
        //             setListDeleteUpdate(Math.random());
        //             setSelectedList('');
        //             setSelectedListData([]);
        //             setSuccessOpenToast(true);
        //             setSuccessMsgToast('لیست حذف شد');
        //             const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast("خطا!لیست حذف نشد");
        //             const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false);}, 3000);
        //         }
        
        // }



        //-----------------------------------save product to db
        // const saveProduct = async() =>{
        //     let contactBtnArray  = [whatsAppOprator , callOprator];
        //     let keyFeature = [];
        //     for(var i = 0 ; selectedListData.length > i ; i++){
        //         if(selectedListData[i].checked === true){
        //             keyFeature.push(selectedListData[i]);
        //         }
        //     }
        //     let productData = {author:decoded.id , productCode : productCode , availableSurface : availableSurface ,title:title , productRiview:productRiview , price:{measure:measure , price:price} , contactBtn:contactBtnArray , images:galleryImages , categories:categories , tags:tags  , featureList : selectedListData , keyFeatures : keyFeature , language:langCtx.language , pageTitle:pageTitle , pageDescription:pageDescription};

        //     if(keyFeature.length > 4 ){
        //         setSpecialFeatureErr("تعداد خصوصیات ویژه انتخاب شده بیشتر از حد مجاز است");
        //         ref6.current.scrollIntoView(); 
        //     }
        //     if(keyFeature.length < 2 ){
        //         setSpecialFeatureErr("تعداد خصوصیات ویژه انتخاب شده کم تر از حد مجاز است");
        //         ref6.current.scrollIntoView(); 

        //     }
        //     if(selectedListData.length === 0 ){
        //         setSelectedListErr("خصوصیات را انتخاب کنید");
        //         ref6.current.scrollIntoView(); 

        //     }
        //     if(productRiview === ''){
        //         setProductRiviewErr("نقد و بررسی ای بنویسید")
        //         ref5.current.scrollIntoView(); 
        //     }

        //     if(categories.length === 0){
        //         setCategoriesErr("دسته بندی را انتخاب کنید")
        //         ref4.current.scrollIntoView(); 
        //     }
        //     if(tags.length === 0){
        //         setTagsErr("تگ را انتخاب کنید");
        //         ref4.current.scrollIntoView(); 
        //     }
        //     if(whatsAppOprator === ''){
        //         setWhatsAppOpratorErr('اپراتور واتساپ را انتخاب کنید')
        //         ref3.current.scrollIntoView(); 
        //     }
        //     if(callOprator === ''){
        //         setCallOpratorErr('اپراتور تماس را انتخاب کنید');
        //         ref3.current.scrollIntoView(); 
        //     }
        //     if(imageGalleryFirst === '' || imageGallerySecond === '' || imageGalleryThird === '' || imageGalleryFourth === ''){
        //         setImageGalleryErr("گالری را تکمیل کنید");
        //         ref2.current.scrollIntoView(); 
        //     }
        //     if(price === ''){
        //         setPriceErr('قیمت را وارد کنید')
        //         ref1.current.scrollIntoView();
        //     }
        //     if(measure === ''){
        //         setMeasureErr('مقیاسی مشخص نکردید')
        //         ref1.current.scrollIntoView(); 
        //     }
        //     if(title === ''){
        //         setTitleErr('عنوان را وارد کنید');
        //         ref.current.scrollIntoView(); 
        //     }
        //     if(productCode === ''){
        //         setProductCodeErr("کد محصول را بنویسید");
        //         ref7.current.scrollIntoView(); 
        //     }

            
        //     if(productCode !== '' && decoded.id !== undefined && imageGalleryFirst !== '' && imageGallerySecond !== '' && imageGalleryThird !== '' && imageGalleryFourth !== '' && title !== '' && categories.length !== 0 && callOprator !== '' && whatsAppOprator !== '' && price !== '' && measure !== '' &&  productRiview !== '' && tags.length !== 0  && selectedListData.length !== 0 ){
        //         if( keyFeature.length < 5 && keyFeature.length > 2 ){
        //             try{
        //                 const response = await authCtx.jwtInst({
        //                     method:"post",
        //                     url:`${authCtx.defaultTargetApi}/newProduct/saveNewProduct`,
        //                     data:productData,
        //                     config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //                 })
        //                 const data = await response.data; 
        //                 setSuccessOpenToast(true);
        //                 setSuccessMsgToast('محصول ذخیره شد');
        //                 const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        //                 const redirect = setTimeout(()=>{history.push(`/cp/products/newProduct/productShowCase/${data._id}`)}, 500);
        //             }catch(error){
        //                 setFailedOpenToast(true);
        //                 setFailedMsgToast(error.response.data);
        //                 const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
        //             }
        //         }else{
        //             setFailedOpenToast(true);
        //             setFailedMsgToast('فرم را تکمیل کنید');
        //             const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
        //         }
        //     }else{
        //         setFailedOpenToast(true);
        //         setFailedMsgToast('فرم را تکمیل کنید');
        //         const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
        //     }


        // }


        //image gallery
        let galleryImg = [];
        const addItem = (index , value) => {
            galleryImg.splice(index, 0, value)
            setGalleryImages(galleryImg)
         }
        useEffect(() => {
            addItem(0 , imageGalleryFirst);
            addItem(1 , imageGallerySecond);
            addItem(2 , imageGalleryThird);
            addItem(3 , imageGalleryFourth);
            addItem(4 , imageGalleryFifth);
            addItem(5 , imageGallerySixth);
            addItem(6 , imageGallerySeventh);
            addItem(7 , imageGalleryEighth);
        }, [imageGalleryFirst , imageGallerySecond ,imageGalleryThird ,imageGalleryFourth , imageGalleryFifth , imageGallerySixth , imageGallerySeventh , imageGalleryEighth])



        
    //------------------------------mapping Data------------------------------
    const categoriesOptionForNormalSelect = []
    for(var i = 0 ; allProducts.length>i ; i++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        categoriesOptionForNormalSelect.push({ value: allProducts[i]._id, label: allProducts[i].title })
      }

    return(
        <Fragment>
            <PhotoSelectFromDataBase showModal={true}></PhotoSelectFromDataBase>
                {/* Modal */}
                {/* <Modal delete={deleteTheList} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal> */}
                {/* toasts */}
                <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <CpNormalHeader name='گالری جدید'></CpNormalHeader>
                               {/* new product */}
                               <Row ref={ref1} dir="rtl">
                                    <div className={Style.formItemsDiv}>
                                        <Col xs={12} md={12} lg={6}>
                                            <div className={Style.inputDiv3}>
                                            {liveGalleryErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{liveGalleryErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>محصولات</h4></div>
                                            }
                                                <MultiSelect options={categoriesOptionForNormalSelect} onChange={saveCategoriesInState}  placeholder='انتخاب کنید...' width='100%'></MultiSelect>
                                            </div>
                                            <div className={Style.inputDiv3}>
                                            {/* {tagsErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{tagsErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>تگ ها</h4></div>
                                            } */}
                                                
                                            </div>
                                        </Col>
                                    </div>       
                               </Row>
                               <div className={Style.saveBtnDiv}>
                                   {/* <button onClick={saveProduct} className={Style.saveForm}>ذخیره</button> */}
                               </div>
                            </div>        
                        </Col>
                    </Row>
                </Container>
        </Fragment>
    )
}

export default NewLiveGallery;