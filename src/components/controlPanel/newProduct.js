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


    
const NewProduct = () =>{
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
     
    //-----------------------------------------------------------------------gallery Error
     const [imageGalleryErr , setImageGalleryErr] = useState('');


    //-----------------------------------------------------------------------product code
    const [productCode , setProductCode] = useState('');
    const [productCodeErr , setProductCodeErr] = useState('');

    //-----------------------------------------------------------------------product code
    const [availableSurface, setAvailableSurface] = useState('');
    const [availableSurfaceErr , setAvailableSurfaceErr] = useState('');
    
    //-----------------------------------------------------------------------title state
     const [title , setTitle] = useState('');
     const [titleErr , setTitleErr] = useState('');

    //-----------------------------------------------------------------------price state
     const [measure , setMeasure] = useState('');
     const [price , setPrice] = useState('');
     const [measureErr , setMeasureErr] = useState('');
     const [priceErr , setPriceErr] = useState('');
    //-----------------------------------------------------------------------tags and categories state
     const [categories , setCategories]  =  useState([]);
     const [tags , setTags]  =  useState([]);
     const [categoriesErr , setCategoriesErr]  =  useState('');
     const [tagsErr , setTagsErr]  =  useState('');
    //-----------------------------------------------------------------------product riview state
     const [productRiview , setProductRiview] = useState('');
     const [productRiviewErr , setProductRiviewErr] = useState('');

    //-----------------------------------------------------------------------oprators state
     const [callOprator , setCallOprator] = useState('');
     const [whatsAppOprator , setWhatsAppOprator] = useState('');
     const [callOpratorErr , setCallOpratorErr] = useState('');
     const [whatsAppOpratorErr , setWhatsAppOpratorErr] = useState('');

    //-----------------------------------------------------------------------getting all data from db state
    const [allCategories,setAllCategories] = useState([]);
    const [allTags,setAllTags] = useState([]);
    const [allOprator,setAllOprator] = useState([]);
    const [allWa,setAllWa] = useState([]);

    //-----------------------------------------------------------------------delete Modal state
    const [showDeleteModal , setShowDeleteModal] = useState(false);

    //-----------------------------------------------------------------------product features state
    const [newFeatureListModal , setNewFeatureListModal] = useState(false);
    const [newFeatureList , setNewFeatureList] = useState();
    const [allFeatureList , setAllFeatureList] = useState([]);
    const [selectedList , setSelectedList] = useState('');
    const [selectedListData , setSelectedListData] = useState([]);
    const [listDeleteUpdate , setListDeleteUpdate] = useState('');

    const [selectedListErr , setSelectedListErr] = useState('');
    const [specialFeatureErr , setSpecialFeatureErr] = useState('');


    const [specialFeature , setSpecialFeature] = useState([]);

    //------------------------------listners------------------------------

    const saveCategoriesInState = (e) =>{
        var categoriesData = e.map(function (i) { return i.value})
        setCategories(categoriesData);
        setCategoriesErr('');
    }
    const saveTagsInState = (e) =>{
        var tagsData = e.map(function (i) { return i.value})
        setTags(tagsData);
        setTagsErr('');

    }

    const ckEditorFunction = (e , editor) =>{
        const data = e.editor.getData();
        setProductRiview(data);
        setProductRiviewErr('');

    }
    let tempArray = [...specialFeature];
    const addSpecialFeature = (e) =>{
        setSpecialFeatureErr('')
        tempArray = [...selectedListData];
        for(var i = 0 ; tempArray.length > i ; i++){
            if(tempArray[i].title === e.target.value && tempArray[i].checked === false){
                tempArray[i].checked =true;
            }else if(tempArray[i].title === e.target.value && tempArray[i].checked === true){
                tempArray[i].checked =false;
            }
        }
        setSelectedListData([...tempArray]);
    } 


    const callForPricing = ()=>{
        if(price !== null){
            setPrice(null);
        }else{
            setPrice('');
        }
    }

    //------------------------------axios------------------------------

    
        //------------------------------------get categories
        const getAllCategories = async () =>{
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllCategories`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data]);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllCategoriesAr`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data]);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllCategoriesEn`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data]);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                }
        }
        //------------------------------------get tags
        const getAllTags = async () =>{
            
            let dataTag = {categoriesId:categories};

            if(allCategories.length !== 0){
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllTags`,
                            params : dataTag,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTags([...data]);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllTagsAr`,
                            params : dataTag,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTags([...data]);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/newProduct/getAllTagsEn`,
                            params : dataTag,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTags([...data]);
                    }

                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                }
            }

        }

        //------------------------------------get all oprators
        const getAllCallOprator = async () =>{
            try{
                if(langCtx.language === 'persian'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllOprator`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllOprator([...data]);
                }else if(langCtx.language === 'arabic'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllOpratorAr`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllOprator([...data]);
                }else if(langCtx.language === 'english'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllOpratorEn`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllOprator([...data]);
                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
            }
        }

        //------------------------------------get all WaOprators
        const getAllWaOprator = async () =>{
            try{
                if(langCtx.language === 'persian'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllWaOprator`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllWa(data);
                }else if(langCtx.language === 'arabic'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllWaOpratorAr`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllWa(data);
                }else if(langCtx.language === 'english'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllWaOpratorEn`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllWa(data);
                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
            }
        }


        //------------------------------------save new Feature in db
        const saveFeatureList = async (titleName , featureListArray) =>{
            if(titleName !== ''){
                try{
                    const listData = {
                        listName : titleName,
                        featureList : featureListArray
                    }
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/newFeatureList`,
                            data:listData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setNewFeatureListModal(false);
                        setNewFeatureList(Math.random());
                        setSelectedList('');
                        setSuccessOpenToast(true);
                        setSuccessMsgToast("لیست اضافه شد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/newFeatureListAr`,
                            data:listData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setNewFeatureListModal(false);
                        setNewFeatureList(Math.random());
                        setSelectedList('');
                        setSuccessOpenToast(true);
                        setSuccessMsgToast("لیست اضافه شد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/newFeatureListEn`,
                            data:listData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setNewFeatureListModal(false);
                        setNewFeatureList(Math.random());
                        setSelectedList('');
                        setSuccessOpenToast(true);
                        setSuccessMsgToast("لیست اضافه شد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("لیست اضافه نشد!خطایی رخ داده است");
                    const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast('اسمی برای لیست انتخاب نکردید');
                const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
            }
        }


        //------------------------------------get all Feature
        const getAllFeatureList = async (titleName , featureListArray) =>{
            try{

                if(langCtx.language === 'persian'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllFeatureList`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllFeatureList(data);
                }else if(langCtx.language === 'arabic'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllFeatureListAr`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllFeatureList(data);
                }else if(langCtx.language === 'english'){
                    const response = await authCtx.jwtInst({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/newProduct/getAllFeatureListEn`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllFeatureList(data);
                }
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
            }
        
        }


        //-----------------------------------get feature list
        const getTheList = async () =>{
            if(selectedList !== ''){    
                const listId = {listId:selectedList};
                try{
                    if(langCtx.language === 'persian'){

                        const response = await authCtx.jwtInst({
                            method:"get",
                            params:listId,
                            url:`${authCtx.defaultTargetApi}/newProduct/getTheList`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        var tempFeatureListArr = [];
                        for(var i = 0 ;data.featureList.length>i ; i++ ){
                            tempFeatureListArr.push({title:data.featureList[i].title , content:data.featureList[i].content , checked:false})
                        }
                        setSelectedListData([...tempFeatureListArr]);

                    }else if(langCtx.language === 'arabic'){

                        const response = await authCtx.jwtInst({
                            method:"get",
                            params:listId,
                            url:`${authCtx.defaultTargetApi}/newProduct/getTheListAr`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        var tempFeatureListArr = [];
                        for(var i = 0 ;data.featureList.length>i ; i++ ){
                            tempFeatureListArr.push({title:data.featureList[i].title , content:data.featureList[i].content , checked:false})
                        }
                        setSelectedListData([...tempFeatureListArr]);

                    }else if(langCtx.language === 'english'){

                        const response = await authCtx.jwtInst({
                            method:"get",
                            params:listId,
                            url:`${authCtx.defaultTargetApi}/newProduct/getTheListEn`,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        var tempFeatureListArr = [];
                        for(var i = 0 ;data.featureList.length>i ; i++ ){
                            tempFeatureListArr.push({title:data.featureList[i].title , content:data.featureList[i].content , checked:false})
                        }
                        setSelectedListData([...tempFeatureListArr]);
                    }
                
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                }
            }
        }

        //-----------------------------------delete feature list
        const deleteTheList = async () =>{
            const  dataToSend ={deleteTheListId:selectedList };
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/deleteFeatureList`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
    
                        setShowDeleteModal(false);
                        setListDeleteUpdate(Math.random());
                        setSelectedList('');
                        setSelectedListData([]);
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('لیست حذف شد');
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/deleteFeatureListAr`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
    
                        setShowDeleteModal(false);
                        setListDeleteUpdate(Math.random());
                        setSelectedList('');
                        setSelectedListData([]);
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('لیست حذف شد');
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/newProduct/deleteFeatureListEn`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
    
                        setShowDeleteModal(false);
                        setListDeleteUpdate(Math.random());
                        setSelectedList('');
                        setSelectedListData([]);
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('لیست حذف شد');
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    }
                    
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطا!لیست حذف نشد");
                    const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false);}, 3000);
                }
        
        }



        //-----------------------------------save product to db
        const saveProduct = async() =>{
            let contactBtnArray  = [whatsAppOprator , callOprator];
            let keyFeature = [];
            for(var i = 0 ; selectedListData.length > i ; i++){
                if(selectedListData[i].checked === true){
                    keyFeature.push(selectedListData[i]);
                }
            }
            let productData = {author:decoded.id , productCode : productCode , availableSurface : availableSurface ,title:title , productRiview:productRiview , price:{measure:measure , price:price} , contactBtn:contactBtnArray , images:galleryImages , categories:categories , tags:tags  , featureList : selectedListData , keyFeatures : keyFeature};

            if(keyFeature.length > 4 ){
                setSpecialFeatureErr("تعداد خصوصیات ویژه انتخاب شده بیشتر از حد مجاز است");
                ref6.current.scrollIntoView(); 
            }
            if(keyFeature.length < 2 ){
                setSpecialFeatureErr("تعداد خصوصیات ویژه انتخاب شده کم تر از حد مجاز است");
                ref6.current.scrollIntoView(); 

            }
            if(selectedListData.length === 0 ){
                setSelectedListErr("خصوصیات را انتخاب کنید");
                ref6.current.scrollIntoView(); 

            }
            if(productRiview === ''){
                setProductRiviewErr("نقد و بررسی ای بنویسید")
                ref5.current.scrollIntoView(); 
            }

            if(categories.length === 0){
                setCategoriesErr("دسته بندی را انتخاب کنید")
                ref4.current.scrollIntoView(); 
            }
            if(tags.length === 0){
                setTagsErr("تگ را انتخاب کنید");
                ref4.current.scrollIntoView(); 
            }
            if(whatsAppOprator === ''){
                setWhatsAppOpratorErr('اپراتور واتساپ را انتخاب کنید')
                ref3.current.scrollIntoView(); 
            }
            if(callOprator === ''){
                setCallOpratorErr('اپراتور تماس را انتخاب کنید');
                ref3.current.scrollIntoView(); 
            }
            if(imageGalleryFirst === '' || imageGallerySecond === '' || imageGalleryThird === '' || imageGalleryFourth === ''){
                setImageGalleryErr("گالری را تکمیل کنید");
                ref2.current.scrollIntoView(); 
            }
            if(price === ''){
                setPriceErr('قیمت را وارد کنید')
                ref1.current.scrollIntoView();
            }
            if(measure === ''){
                setMeasureErr('مقیاسی مشخص نکردید')
                ref1.current.scrollIntoView(); 
            }
            if(title === ''){
                setTitleErr('عنوان را وارد کنید');
                ref.current.scrollIntoView(); 
            }
            if(productCode === ''){
                setProductCodeErr("کد محصول را بنویسید");
                ref7.current.scrollIntoView(); 
            }
            if(availableSurface === ''){
                setAvailableSurfaceErr("متراژ کل را بنویسید");
                ref8.current.scrollIntoView(); 
            }
            
            if(availableSurface !== '' && productCode !== '' && decoded.id !== undefined && imageGalleryFirst !== '' && imageGallerySecond !== '' && imageGalleryThird !== '' && imageGalleryFourth !== '' && title !== '' && categories.length !== 0 && callOprator !== '' && whatsAppOprator !== '' && price !== '' && measure !== '' &&  productRiview !== '' && tags.length !== 0  && selectedListData.length !== 0 ){
                if( keyFeature.length < 5 && keyFeature.length > 2 ){
                    try{
                        if(langCtx.language === 'persian'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/newProduct/saveNewProduct`,
                                data:productData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('محصول ذخیره شد');
                            const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                            const redirect = setTimeout(()=>{history.push(`/cp/products/newProduct/productShowCase/${data._id}`)}, 500);

                        }else if(langCtx.language === 'arabic'){

                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/newProduct/saveNewProductAr`,
                                data:productData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('محصول ذخیره شد');
                            const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                            const redirect = setTimeout(()=>{history.push(`/cp/products/newProduct/productShowCase/${data._id}`)}, 500);

                        }else if(langCtx.language === 'english'){

                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/newProduct/saveNewProductEn`,
                                data:productData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('محصول ذخیره شد');
                            const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                            const redirect = setTimeout(()=>{history.push(`/cp/products/newProduct/productShowCase/${data._id}`)}, 500);
                        }


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
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast('فرم را تکمیل کنید');
                const closingFailedMsgTimeOut = setTimeout(setFailedOpenToast(false), 3000);
            }


        }


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



        //all get req
        useEffect(() => {
            getAllCallOprator()
            getAllCategories()
            getAllTags()
            getAllWaOprator()
        }, [])

        //all get req
        useEffect(() => {

            getAllTags()
        }, [categories])

        useEffect(() => {
            getAllFeatureList()
        }, [listDeleteUpdate , newFeatureList])
        useEffect(() => {
            getTheList()
        }, [selectedList , specialFeature])
        
    //------------------------------mapping Data------------------------------
    const categoriesOptionForNormalSelect = []
    for(var i = 0 ; allCategories.length>i ; i++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        categoriesOptionForNormalSelect.push({ value: allCategories[i]._id, label: allCategories[i].category })
      }
    const opratorOptionForNormalSelect = []
    for(var y = 0 ; allOprator.length>y ; y++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        opratorOptionForNormalSelect.push({ value: allOprator[y]._id, label:`${allOprator[y].firstName} ${allOprator[y].lastName}`})
    }
    const waOpratorOptionForNormalSelect = []
    for(var m = 0 ; allWa.length>m ; m++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        waOpratorOptionForNormalSelect.push({ value: allWa[m]._id, label:`${allWa[m].firstName} ${allWa[m].lastName}`})
    }

    const featureListForNormalSelect = []
    for(var v = 0 ; allFeatureList.length>v ; v++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        featureListForNormalSelect.push({ value: allFeatureList[v]._id, label:`${allFeatureList[v].listName}`})
    }

    const measureOptionForNormalSelect = [
        { value:0, label:'هر اسلب'},
        { value:1, label:'هرمتر'},
        { value:2, label:'هر کاشی'}
    ]

      const tagsOptionForMultiSelect = []
      for(var j = 0 ; allTags.length>j ; j++){
      //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        tagsOptionForMultiSelect.push({ value: allTags[j]._id, label: allTags[j].tag })
        }
    
    return(
        <Fragment>
                {/* Modal */}
                <Modal delete={deleteTheList} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
                {/* toasts */}
                <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
            <NewFeatureListModal saveList={saveFeatureList} showModal={newFeatureListModal} closeModal={()=>{setNewFeatureListModal(false)}}></NewFeatureListModal>
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
                                                <div ref={ref}  className={Style.formItemsDiv}>
                                                    {titleErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{titleErr}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>عنوان</h4></div>
                                                    }
                                                    <NormalInput  onChange={(e)=>{setTitle(e.target.value); setTitleErr('')}} placeholder='عنوان را وارد کنید...'></NormalInput>
                                                </div>
                                            </Col>
                                            <Col style={{marginBottom:'14px'}} xs={12} md={12} lg={12 }>
                                                <div ref={ref7}  className={Style.formItemsDiv}>
                                                    {productCodeErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{productCodeErr}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>کد محصول</h4></div>
                                                    }
                                                    <NormalInput  onChange={(e)=>{setProductCode(e.target.value); setProductCodeErr('')}} placeholder='کد محصول را وارد کنید...'></NormalInput>
                                                </div>
                                            </Col>
                                            <Col  xs={12} md={12} lg={12 }>
                                                <div ref={ref8}  className={Style.formItemsDiv}>
                                                    {availableSurfaceErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{availableSurfaceErr}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>متراژ کل</h4></div>
                                                    }
                                                    <NormalInput onChange={(e)=>{setAvailableSurface(e.target.value); setAvailableSurfaceErr('')}} placeholder='متراژ کل را وارد کنید...'></NormalInput>
                                                </div>
                                            </Col>
                                       </Row>
                                        <div ref={ref1} style={{marginTop:'15px'}} className={Style.formItemsDiv}>
                                            <Row>   
                                                <Col xs={5} md={5} lg={5}>
                                                    {measureErr !== '' ?
                                                        <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{measureErr}</h4></div>
                                                    :
                                                        <div className={Style.lableDiv}><h4>مقیاس</h4></div>
                                                    }
                                                    <NormalSelect options={measureOptionForNormalSelect} onChange={(e)=>{setMeasure(e.label); setMeasureErr('')}}   placeholder='انتخاب کنید...' width='100%'></NormalSelect>
                                                </Col>
                                                <Col  xs={7} md={7} lg={7}> 
                                                    {priceErr !== '' ?
                                                        <div style={{display:'inline-block'}} className={Style.lableDiv}><h4 style={{color:"#a50000" , margin:'0px' , padding:'0px' , fontFamily:'Dana1'}}>{priceErr}</h4></div>
                                                    :
                                                        <div style={{display:'inline-block' , margin:'0px 10px 0px 0px' , padding:'0px'}} className={Style.lableDiv}><h4>قیمت</h4></div>
                                                    }
                                                    <div className={Style.callForPrice}>
                                                        <h5>تماس بگیرید:</h5>
                                                        <Form.Check           
                                                            onClick={callForPricing}                                        
                                                            type="switch" 
                                                            checked={price===null ? true : false}
                                                            id="custom-switch"
                                                            style={{fontSize:'20px' , marginRight:'10px', display:'inline-block'}}
                                                        />
                                                    </div>
                                                    <NormalInput  onChange={(e)=>{let num =e.target.value;setPrice(num.toLocaleString()); setPriceErr('')}}  placeholder='قیمت را وارد کنید...'></NormalInput>
                                                </Col>
                                            </Row>
                                        </div>
                                   </Col>
                                   <Col xs={12} md={12} lg={6}>
                                   </Col>
                               </Row>
                               <Row dir="rtl">
                                    <div ref={ref2} className={Style.formItemsDiv}>
                                            {imageGalleryErr !== '' ?
                                                <div className={Style.featureHeader}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{imageGalleryErr}</h4></div>
                                            :
                                                <div className={Style.featureHeader}><h4>گالری تصاویر</h4></div>
                                            }
                                            <Row>
                                                <Col  xs={12} md={12} lg={4}>
                                                    <ProductPhotoGallery galleryImages={galleryImages}></ProductPhotoGallery>
                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 70px'}} xs={12} md={12} lg={4}>
                                                    <div style={{marginTop:'95px'}}>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4 style={{fontFamily:'Dana1' , color:'#ac0000'}}>تصویر اول(کاور)</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGalleryFirst(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر دوم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGallerySecond(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر سوم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGalleryThird(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر چهارم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGalleryFourth(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col style={{padding:'0px 0px 0px 70px'}} xs={12} md={12} lg={4}>
                                                    <div style={{marginTop:'95px'}}>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر پنجم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGalleryFifth(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر ششم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGallerySixth(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر هفتم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGallerySeventh(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                        <div className={Style.inputDiv2}>
                                                            <div className={Style.lableDiv}><h4>تصویر هشتم</h4></div>
                                                            <NormalInput onChange={(e)=>{setImageGalleryEighth(e.target.value); setImageGalleryErr('')}} placeholder='لینک تصویر...'></NormalInput>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                    </div>
                               </Row>
                               <Row ref={ref3} dir="rtl">
                                    <div className={Style.formItemsDiv}>
                                        <div className={Style.featureHeader}><h4>اپراتور ها</h4></div>
                                        <Col xs={12} md={12} lg={6}>
                                            <div className={Style.inputDiv3}>
                                            {callOpratorErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{callOpratorErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>اپراتور تماس</h4></div>
                                             }
                                                <NormalSelect options={opratorOptionForNormalSelect} onChange={(e)=>{setCallOprator(e.value); setCallOpratorErr('')}} placeholder='انتخاب کنید...' width='100%'></NormalSelect>
                                            </div>
                                            <div className={Style.inputDiv3}>
                                            {whatsAppOpratorErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{whatsAppOpratorErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>اپراتور واتساپ</h4></div>
                                            }
                                                <NormalSelect options={waOpratorOptionForNormalSelect} onChange={(e)=>{setWhatsAppOprator(e.value); setWhatsAppOpratorErr('')}} placeholder='انتخاب کنید...' width='100%'></NormalSelect>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={12} lg={6}>

                                        </Col>
                                    </div>
                               </Row>
                               
                               <Row ref={ref4} dir="rtl">
                                    <div className={Style.formItemsDiv}>
                                        <div className={Style.featureHeader}><h4>دسته بندی و تگ ها</h4></div>
                                        <Col xs={12} md={12} lg={6}>
                                            <div className={Style.inputDiv3}>
                                            {categoriesErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{categoriesErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>دسته بندی ها</h4></div>
                                            }
                                                <MultiSelect options={categoriesOptionForNormalSelect} onChange={saveCategoriesInState}  placeholder='انتخاب کنید...' width='100%'></MultiSelect>
                                            </div>
                                            <div className={Style.inputDiv3}>
                                            {tagsErr !== '' ?
                                                <div className={Style.lableDiv}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{tagsErr}</h4></div>
                                            :
                                                <div className={Style.lableDiv}><h4>تگ ها</h4></div>
                                            }
                                                
                                                <MultiSelect options={tagsOptionForMultiSelect} onChange={saveTagsInState}  placeholder='انتخاب کنید...' width='100%'></MultiSelect>
                                            </div>
                                        </Col>
                                        { productRiviewErr!== '' ?
                                                <div  ref={ref5} className={Style.featureHeader}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{productRiviewErr}</h4></div>
                                            :
                                            
                                                <div  className={Style.featureHeader}><h4>نقد و بررسی محصول</h4></div>
                                        }
                                        <Col xs={12} md={12} lg={6}>
                                            <Ck  ckEditorFunction={ckEditorFunction}></Ck>
                                        </Col>
                                    </div>
                                    
                               </Row>
                               <Row ref={ref6} dir="rtl">
                                    <div className={Style.formItemsDiv}>
                                        {selectedListErr !== '' ?
                                        <div className={Style.featureHeader}><h4 style={{color:"#a50000" , fontFamily:'Dana1'}}>{selectedListErr}</h4></div>
                                        :
                                            <div className={Style.featureHeader}><h4>مشخصات و مشخصات کلیدی</h4></div>
                                        }
                                        
                                            <Row>
                                                <Col  xs={12} md={12} lg={12}>
                                                    <div style={{margin:'5px 25px 5px 25px' , display:'block'}}>
                                                        <BtnNewThingWithIcon onClick={()=>{setNewFeatureListModal(true)}} btnName='لیست مشخصات جدید' paddingTop={'0px'} paddingButtom={'0px'} fontSize={'16px'} paddingRight={'0px'} paddingLeft={'10px'} backgroundColor={'#3C3C3C'} color={'#FFFFFF'} ></BtnNewThingWithIcon>
                                                        { specialFeatureErr!== '' ?
                                                                <h5 style={{display:'inline-block' , fontSize:'15px' , margin:'0px 10px 0px 0px' , color:"#a50000" , fontFamily:'Dana1'}}>{specialFeatureErr}</h5>
                                                            :
                                                                null
                                                        }
                                                    </div>
                                                    <div style={{margin:'5px 25px 5px 25px' , maxWidth:'500px' , width:'80%' , display:'inline-block'}}>
                                                        <div style={{display:'inline-block', width:'88%'}}>
                                                            <NormalSelect  onChange={(e)=>{ setSelectedListData([...[]]); setSelectedList(e.value); setSelectedListErr("")}} options={featureListForNormalSelect} placeholder='انتخاب کنید...' width='100%'></NormalSelect>

                                                        </div>
                                                        <div style={{display:'inline-block' , float:'left'}}>
                                                            { selectedList !== ''?
                                                                <button onClick={()=>{setShowDeleteModal(true)}} className={Style.deleteBtn}><DeleteIcon sx={{ fontSize: 28,color: '#FFF' ,iconHover:'#FFF' }}></DeleteIcon></button>
                                                              :
                                                                 <button disabled onClick={()=>{setShowDeleteModal(true)}} className={Style.deleteBtn}><DeleteIcon sx={{ fontSize: 28,color: '#FFF' ,iconHover:'#FFF' }}></DeleteIcon></button>

                                                             }
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                            {selectedListData.length !== 0 ?                                        
                                                <Col style={{padding:'0px 0px 0px 70px'}} xs={12} md={12} lg={6}>
                                                    <div style={{marginTop:'10px'}}>
                                                        
                                                        {selectedListData.map((data , i)=>{
                                                            return(
                                                                <div className={Style.featureDiv}>
                                                                    <h4>{data.title}</h4>
                                                                    <div className={Style.featureInputDiv}>
                                                                     
                                                                        {data.checked === true ?<Checkbox onClick={addSpecialFeature} value={data.title} checked></Checkbox>:<Checkbox onClick={addSpecialFeature} value={data.title} ></Checkbox>}

                                                                    
                                                                        <NormalInput onChange={(e)=>
                                                                        {let tempArr = [...selectedListData]; tempArr[i] = {title:tempArr[i].title,content:e.target.value}; setSelectedListData([...tempArr])}}
                                                                         value={data.content} placeholder='...'></NormalInput>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </Col>
                                            :null}
                                            </Row>
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

export default NewProduct;