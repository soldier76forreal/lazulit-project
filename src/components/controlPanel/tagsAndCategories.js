//modules
import { Fragment, useState , useEffect , useContext , useRef} from "react";
import { useHistory  , useLocation } from 'react-router-dom';
import Style from './tagsAndCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import AuthContext from '../../store/auth';
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
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
import NoDataFigure from "../tools/noDataFigure";
import { result } from "lodash";
import jwtDecode from "jwt-decode";
import ActivePage from "../../store/activePage";
import Language from "../../store/language";


const TagsAndCategories = () =>{

    const categoriesSelectionRef  = useRef();
    const tagSelectionRef = useRef();
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const activePageCtx = useContext(ActivePage);
    const decoded = jwtDecode(authCtx.token);
    const langCtx = useContext(Language);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        activePageCtx.activePageFnOr('category')
    }, []);
    document.title = "دسته بندی"

     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');

     //category input state
     const [category , setCategory] = useState('');

    //category input state
    const [updatedCategoryRefresh , setUpdatedCategoryRefresh] = useState('');

    //modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [showDeleteTagModal , setShowDeleteTagModal] = useState(false);


    //new category data state
    const [newCategory , setNewCategory] = useState('');

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
    //saves
    const [allCategories , setAllCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allTagsForList, setAllTagsForList] = useState([]);
    const [allTagsForListLength, setAllTagsForListLength] = useState('');


    //delete category and tag states
    const [categoryIdToDelete , setCategoryIdToDelete] = useState('');
    const [deleteUpdate , setDeleteUpdate] = useState('');

    const [tagIdToDelete , setTagIdToDelete] = useState({});
    const [deleteTagUpdate , setDeleteTagUpdate] = useState('');

    //search in categories
    const [searchInCategorieData , setSearchInCategorieData] = useState([]);
    const [searchInCategoriesText , setSearchInCategoriesText] = useState('');
    const [searchLoading , setSearchLoading] = useState(false);

    //limit
    const [limit , setLimit] = useState(30);
    const [categoryLength , SetCategoryLength] = useState();
    const [limitTags , setLimitTags] = useState(30);


    //add New tag States
    const [categoryOfNewTag , setCategoryOfNewTag] = useState('');
    const [newTag , setNewTag] = useState('');
    const [newTagUpdate , setNewTagUpdate] = useState('');


    //checkbox update
    const [checkBoxId , setCheckBoxId] = useState('');
    const [checkBoxTagUpdate , setCheckBoxTagUpdate] = useState({});


    //edit loading
    const [loadingStatus , setLoadingStatus] = useState(false);

    //search in tags
    const [searchForTagsText ,setSearchForTagsText ] = useState('');
    const [searchForTagsData ,setSearchForTagsData ] = useState([]);

    //update categories with tags      
    const [categoryForUpdateWithTags , setCategoryForUpdateWithTags] = useState(null);
    const [tagsToUpdateCategory , setTagsToUpdateCategory] = useState([]);
    const [categoryForUpdateWithTagsUpdate , setCategoryForUpdateWithTagsUpdate] = useState([]);

    //update tag
    const [updateTagsEdit , setUpdateTagsEdit] = useState('');


    //------------------------------listners------------------------------
    const saveCategory = (e) =>{
        setCategory(e.target.value);
    }

    const closeSuccessMsg = () =>{
        setSuccessOpenToast(false);
    }

    const closeFailedMsg = () =>{
        setFailedOpenToast(false);
    }

    const saveNewTag = (e) =>{
        setNewTag(e.target.value);
    }
    const saveCategoryOfNewTag =(e) =>{
        setCategoryOfNewTag(e.value);
    }

    //update categories with tags    
    const saveCategoryForUpdateWithTags =(e)=>{
        setCategoryForUpdateWithTags(e.value);
    }
    const saveTagsForUpdateTheCategory = (e)=>{
        var tagsData = e.map(function (i) { return i.value})
        setTagsToUpdateCategory(tagsData);

    }
    //open and close Modal of delete btn
    const openModalByDeleteBtn =(e)=>{
        setShowDeleteModal(true);
        setCategoryIdToDelete(e.currentTarget.value);
    }
    const closeModalByDeleteBtn =()=>{
        setShowDeleteModal(false);

    }
    




    
    //------------------------------HTTP request------------------------------
    //add new category to db
    const sendNewCategory = async () =>{
        const  categoryData ={categoryData:category , author:decoded.id};
            try{
                if(langCtx.language === 'persian'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newCategory`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewCategory(data.result)

                }else if(langCtx.language === 'arabic'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newCategoryAr`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewCategory(data.result)

                }else if(langCtx.language === 'english'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newCategoryEn`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewCategory(data.result)
                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
            }
    }

    //add new tag to db
    const sendNewTag = async () =>{
        const  categoryData ={categoryId:categoryOfNewTag , tag:newTag , author:decoded.id};
            try{
                if(langCtx.language === 'persian'){
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newTag`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewTagUpdate(Math.random());
                }else if(langCtx.language === 'arabic'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newTagAr`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewTagUpdate(Math.random());

                }else if(langCtx.language === 'english'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/newTagEn`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setNewTagUpdate(Math.random());

                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
            }
    }

    //update Category
    const updateCategory = async (id , value) =>{
        setLoadingStatus(true);
        const  categoryData ={id:id , value:value };
            try{
                if(langCtx.language === 'persian'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/updateCategory`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast('ویرایش انجام شد');
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setUpdatedCategoryRefresh(Math.random());
                    setLoadingStatus(false);
                }else if(langCtx.language === 'arabic'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/updateCategoryAr`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast('ویرایش انجام شد');
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setUpdatedCategoryRefresh(Math.random());
                    setLoadingStatus(false);
                }else if(langCtx.language === 'english'){

                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/updateCategoryEn`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast('ویرایش انجام شد');
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    setUpdatedCategoryRefresh(Math.random());
                    setLoadingStatus(false);
                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
            }
    }


    // //validation Category
    const validationUpdate = async (e) =>{

        const  categoryData ={id:e.target.value};
            try{
                if(langCtx.language === 'persian'){
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/validationUpdate`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setCheckBoxId(data);
                }else if(langCtx.language === 'arabic'){
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/validationUpdateAr`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setCheckBoxId(data);
                }else if(langCtx.language === 'english'){
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/tagAndCategory/validationUpdateEn`,
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setCheckBoxId(data);
                }

            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
            }
    }

        //update category with tag 
        const sendTagsForUpdateCategory = async () =>{
            const  dataToSend ={categoryId:categoryForUpdateWithTags , tags:tagsToUpdateCategory };

                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/addTagToCategory`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('اضافه کردن انجام شد');
                        setCategoryForUpdateWithTagsUpdate(Math.random());
                        setCategoryForUpdateWithTags('');
                        setTagsToUpdateCategory([...[]]);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/addTagToCategoryAr`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setCategoryForUpdateWithTagsUpdate(Math.random());
                        setCategoryForUpdateWithTags('');
                        setTagsToUpdateCategory([...[]]);
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('اضافه کردن انجام شد');
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/addTagToCategoryEn`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setCategoryForUpdateWithTagsUpdate(Math.random());
                        setCategoryForUpdateWithTags('');
                        setTagsToUpdateCategory([...[]]);
                        setSuccessOpenToast(true);
                        setSuccessMsgToast('اضافه کردن انجام شد');
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    console.log(error);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                }
        }


         //get tags
        const getAllTags = async () =>{
            if(categoryForUpdateWithTags !== null){
                const paramsData = {params:categoryForUpdateWithTags};
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForMultiSelect`,
                            params:paramsData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(false);
                        setAllTags([...data])
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForMultiSelectAr`,
                            params:paramsData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(false);
                        setAllTags([...data])
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForMultiSelectEn`,
                            params:paramsData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(false);
                        setAllTags([...data])
                    }

                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                }
            } else{
                setAllTags(["دسته بندی را انتخاب کنید"]);

            }                       
        }

        //get categories    
        const getAllCategories = async () =>{
            let queryLimit = {limit:0};
            if(queryParams.get('limit') === null){
                queryLimit.limit = 20;
            }else{
                queryLimit.limit = queryParams.get('limit');
            }
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllCategories`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data.rs]);
                        SetCategoryLength(data.ln);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllCategoriesAr`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data.rs]);
                        SetCategoryLength(data.ln);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllCategoriesEn`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllCategories([...data.rs]);
                        SetCategoryLength(data.ln);
                    }
                }catch(error){
                    console.log(error);
                }
        }


        //get tags for list    
        const getAllTagsForList = async () =>{
            let queryLimit = {limit:0};
            if(queryParams.get('limit') === null){
                queryLimit.limit = 20;
            }else{
                queryLimit.limit = queryParams.get('limit');
            }
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForList`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTagsForList([...data.rs]);
                        setAllTagsForListLength(data.ln);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForListAr`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTagsForList([...data.rs]);
                        setAllTagsForListLength(data.ln);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"get",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/getAllTagsForListEn`,
                            params:queryLimit,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setAllTagsForList([...data.rs]);
                        setAllTagsForListLength(data.ln);
                    }

                }catch(error){
                    console.log(error);
                }
        }

        //search category
        const searchInCategories = async () =>{

            const  dataToSend ={searching:searchInCategoriesText };
                    try{
                        if(langCtx.language === 'persian'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInCategory`,
                                data:dataToSend,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSearchInCategorieData([...data]);
                            setSearchLoading(false); 
                        }else if(langCtx.language === 'arabic'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInCategoryAr`,
                                data:dataToSend,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSearchInCategorieData([...data]);
                            setSearchLoading(false); 
                        }else if(langCtx.language === 'english'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInCategoryEn`,
                                data:dataToSend,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSearchInCategorieData([...data]);
                            setSearchLoading(false); 
                        }


                    }catch(error){
    
    
                    }
        }
        useEffect(() => {
            if(searchInCategoriesText !== ''){
                setSearchLoading(true); 
            }
            let categorySearchTimeOut = setTimeout(()=>{
                searchInCategories();
            }, 1000)
            return () => {
                clearTimeout(categorySearchTimeOut);
            }
        }, [searchInCategoriesText]);
        
        useEffect(() => {

                searchInCategories();
        }, [ newCategory , deleteUpdate , checkBoxId , updatedCategoryRefresh , langCtx.language]);


        //delete category 
        const deleteCategory = async () =>{
            const  dataToSend ={categoryId:categoryIdToDelete };
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteCategory`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteUpdate(data);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteCategoryAr`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteUpdate(data);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteCategoryEn`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteUpdate(data);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                }
        }
        const deleteTag = async () =>{
            const  dataToSend = JSON.parse(tagIdToDelete);
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteTag`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteTagModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteTagUpdate(data);
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteTagAr`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteTagModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteTagUpdate(data);
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/deleteTagEn`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteTagModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        setDeleteTagUpdate(data);
                    }

                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                }
        }

            // //validation tag
            const tagValidationUpdate = async (e) =>{
                // const  categoryData = await JSON.parse(e.target.value);
                try{
                    if(langCtx.language === 'persian'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/tagValidation`,
                            data:JSON.parse(e.target.value),
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setCheckBoxTagUpdate(Math.random());
                    }else if(langCtx.language === 'arabic'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/tagValidationAr`,
                            data:JSON.parse(e.target.value),
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setCheckBoxTagUpdate(Math.random());
                    }else if(langCtx.language === 'english'){
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/tagAndCategory/tagValidationEn`,
                            data:JSON.parse(e.target.value),
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setCheckBoxTagUpdate(Math.random());
                    }

                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast('خطایی رخ داده است');
                        const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                    }
            }


                //search in tags
                const searchTags = async () =>{
                    setSearchLoading(false);
                    if(searchForTagsText !== ''){
                        const  dataToSend ={searching:searchForTagsText};
                            try{
                                if(langCtx.language === 'persian'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInTags`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchForTagsData([...data]);
                                    setSearchLoading(false);
                                }else if(langCtx.language === 'arabic'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInTagsAr`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchForTagsData([...data]);
                                    setSearchLoading(false);
                                }else if(langCtx.language === 'english'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/tagAndCategory/searchInTagsEn`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchForTagsData([...data]);
                                    setSearchLoading(false);
                                }

                            }catch(error){


                            }
                    }
                }

            //update tag
            const updateTag = async (id , value) =>{
                setLoadingStatus(true);
                const  categoryData ={id:id.substring(0, id.length - 1) , value:value };                 
                    try{
                        if(langCtx.language === 'persian'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/updateTag`,
                                data:categoryData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('ویرایش انجام شد');
                            const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                            setUpdateTagsEdit(Math.random());
                            setLoadingStatus(false);
                        }else if(langCtx.language === 'arabic'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/updateTagAr`,
                                data:categoryData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('ویرایش انجام شد');
                            const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                            setUpdateTagsEdit(Math.random());
                            setLoadingStatus(false);
                        }else if(langCtx.language === 'english'){
                            const response = await authCtx.jwtInst({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/tagAndCategory/updateTagEn`,
                                data:categoryData,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast('ویرایش انجام شد');
                            const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                            setUpdateTagsEdit(Math.random());
                            setLoadingStatus(false);
                        }

                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast(error.response.data);
                        const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                    }
            }

                useEffect(() => {
                    if(searchForTagsText !== ''){
                        setSearchLoading(true); 
                    }
                    let categorySearchTimeOut = setTimeout(()=>{
                        searchTags();
                    }, 1000)
                    return () => {
                        clearTimeout(categorySearchTimeOut);
                    }
                }, [searchForTagsText , langCtx.language]);
                
                useEffect(() => {
        
                    searchTags();
                }, [langCtx.language , deleteTagUpdate , updateTagsEdit]);


    //------------------------------USE EFFECTS------------------------------


    useEffect(() => {
        getAllCategories();
    }, [newCategory , deleteUpdate , checkBoxId , limit , updatedCategoryRefresh , langCtx.language]);
    useEffect(() => {
        getAllTags();
    }, [categoryForUpdateWithTags , deleteTagUpdate , updateTagsEdit ,langCtx.language]);

    useEffect(() => {
        getAllTagsForList();
    }, [limitTags ,deleteTagUpdate , checkBoxTagUpdate , newTagUpdate , categoryForUpdateWithTagsUpdate , updateTagsEdit , langCtx.language]);
    //------------------------------mapping Data------------------------------

    const categoriesOptionForNormalSelect = []
    for(var i = 0 ; allCategories.length>i ; i++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        categoriesOptionForNormalSelect.push({ value: allCategories[i].category._id, label: allCategories[i].category.category })
      }


    const tagsOptionForMultiSelect = []
    for(var j = 0 ; allTags.length>j ; j++){
        //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        tagsOptionForMultiSelect.push({ value: allTags[j]._id, label: allTags[j].tag })
    }
               
    //tag And Categories switch
    const pageSwitcherToTag = () =>{
        if(queryParams.get('pageState') === 'category'){
            history.push(`/cp/tagsAndCategories?pageState=tags`)    
         }
         document.title = "تگ ها";

    }

    const pageSwitcherToCategory = () =>{
        if(queryParams.get('pageState') === 'tags'){
            history.push(`/cp/tagsAndCategories?pageState=category`) 
        }
        document.title = "دسته بندی ها";
    } 

    const showMore =()=>{
        setLimit(limit + 10);
       history.push(`tagsAndCategories?limit=${limit}&pageState=category`); 
    }
    return(
        <Fragment>
                {/* Modal */}
                    <Modal delete={deleteCategory} closeModalFn={closeModalByDeleteBtn} showModal={showDeleteModal}></Modal>
                    <Modal delete={deleteTag} closeModalFn={()=>{setShowDeleteTagModal(false)}} showModal={showDeleteTagModal}></Modal>
                {/* toasts */}
                    <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                    <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <Row dir="rtl">
                                    {/* header */}
                                    <Col xs={12} md={12} lg={8}>
                                        <div className={Style.topRightDivHeaderContainer}>
                                            <div className={Style.headerTitleDiv}>
                                               {/* custom header title component */}
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header={pageSwitcherState === 'tags' ?'تگ ها' : 'دسته بندی ها'}></NormalHeader>
                                            </div>
                                            {/* page switcher */}
                                            <div className={Style.switchBtnDiv}>
                                                {queryParams.get('pageState') === 'category' ?                                                
                                                    <button onClick={pageSwitcherToCategory}  className={`${Style.active} ${Style.switchBtn}`}>دسته بندی ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToCategory}  className={`${Style.switchBtn}`}>دسته بندی ها</button>
                                                }
                                                {queryParams.get('pageState') === 'tags' ?                                                
                                                    <button onClick={pageSwitcherToTag} className={`${Style.active} ${Style.switchBtn}`}>تگ ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToTag} className={`${Style.switchBtn}`}>تگ ها</button>
                                                }     
                                            </div>
                                        </div>  
                                    </Col>

                                    <Col  xs={12} md={12} lg={4}>
                                        <div className={Style.topLeftDivHeaderContainer}>
                                            <div className={Style.multiLangDiv}>
                                                {/* multi lang switcher component */}
                                                <MultiLangBtn></MultiLangBtn>

                                            </div>
                                        </div>
                                    </Col>
                                    <div className={Style.lineDiv}></div>
                                </Row>


                               {/* page if its category */}
                               
                                {queryParams.get('pageState') === 'category' ? 
                                    <div>
                                        <Row dir="rtl">
                                            {/* add new category section */}
                                            <Col xs={12} md={6} lg={6}>
                                                <Row>
                                                    <Col  xs={12} md={9} lg={8}>
                                                        <div className={Style.categorySelectDiv}>
                                                            <h4>دسته بندی جدید</h4>
                                                            <NormalInput onChange={saveCategory} placeholder='دسته بندی جدید را وارد کنید...'></NormalInput>
                                                        </div>
                                                    </Col>
                                                    <Col  xs={12} md={3} lg={3}>
                                                        <div  style={{marginTop:'29px'}} className={Style.saveBtnDiv}>
                                                            <NormalBtn onClick={sendNewCategory} btnName='ذخیره' paddingTop={'6px'} paddingButtom={'6px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                                                                    
                                            </Col>
                                            <Col xs={0} md={6} lg={6}>
                                            </Col>
                                        </Row>
                                        {/* search in categories */}
                                        <Row dir="rtl">
                                            <div className={Style.lineDiv}></div>
                                            <SearchBar loading={searchLoading} onChange={(e)=>{setSearchInCategoriesText(e.target.value)}}></SearchBar>
                                        </Row>

                                        <Row>
                                            {/* card header */}
                                            {categoryLength !== 0 ? 

                                            <Col  xs={12} md={12} lg={12}>
                                                <div  className={Style.tagsCardsDiv}>
                                                {/* card it self */}
                                                {searchInCategoriesText === '' ?
                                                        <div className={Style.cardDiv}>
                                                            <CpCategoryCard loading={loadingStatus} validationUpdate={validationUpdate} updateCategory={updateCategory} deleteOnClick={openModalByDeleteBtn} data={allCategories}></CpCategoryCard>
                                                            {categoryLength > 20 ? 
                                                            <Row>  
                                                                <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                                                    <button onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                                </div>
                                                            </Row>
                                                        :
                                                        null
                                                        }
                                                        </div>
                                                        :    
                                                        <div className={Style.cardDiv}>
                                                            {searchInCategoriesText !== '' && searchInCategorieData.length === 0 ?
                                                            <div style={{marginTop:'90px'}}>
                                                                <NoDataFigure msg='دسته بندی مورد نظر یافت نشد'></NoDataFigure>
                                                            </div>    
                                                        :
                                                                <CpCategoryCard loading={loadingStatus} validationUpdate={validationUpdate} updateCategory={updateCategory} deleteOnClick={openModalByDeleteBtn} data={searchInCategorieData}></CpCategoryCard>
                                                    }
                                                        </div>
                                                    }
                                                </div>
                                            </Col>
                                                :
                                                <div style={{marginTop:'90px'}}>
                                                    <NoDataFigure msg='دسته بندی ای برای نمایش وجود ندارد'></NoDataFigure>
                                                </div>           
                                            }
                                        </Row>
                                    </div>
      
                                    :queryParams.get('pageState') === 'tags' ?
                                    <div>
                                    <Row dir="rtl">
                                        {/* add new category section */}
                                        <Col xs={12} md={12} lg={12}>
                                            <Row>
                                                    <div style={{marginRight:'20px'}} className={Style.headerTitleDiv}>
                                                    {/* custom header title component */}
                                                    <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='تگ جدید'></NormalHeader>
                                                    </div>
                                                <Col  xs={12} md={4} lg={4}>
                                                        <div className={Style.categorySelectDiv}>
                                                                <NormalSelect onChange={saveCategoryOfNewTag} options={categoriesOptionForNormalSelect} placeholder='دسته بندی را انتخاب کنید...' width='100%'></NormalSelect>
                                                        </div>
                                                </Col>
                                                <Col  xs={12} md={6} lg={6}>
                                                        <div className={Style.categorySelectDiv}>
                                                                <NormalInput onChange={saveNewTag}  placeholder='تگ جدید را وارد کنید...'></NormalInput>
                                                        </div>
                                                </Col>
                                                
                                                <Col  xs={12} md={3} lg={2}>
                                                    <div className={Style.saveBtnDiv}>
                                                            <NormalBtn onClick={sendNewTag} btnName={'ذخیره تگ'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
                                                    </div>
                                                </Col>
                                            </Row>                                         
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:'20px'}} dir="rtl">
                                        {/* add new category section */}
                                        <Col xs={12} md={12} lg={12}>
                                            <Row>
                                                <div style={{marginRight:'20px'}} className={Style.headerTitleDiv}>
                                                {/* custom header title component */}
                                                <NormalHeader fontFamily='Dana1' fontSize='22px' color='#354063'  header='انتخاب تگ برای دسته بندی ها'></NormalHeader>
                                                </div>
                                                <Col  xs={12} md={4} lg={4}>
                                                    <div className={Style.categorySelectDiv}>
                                                            <NormalSelect onChange={saveCategoryForUpdateWithTags} options={categoriesOptionForNormalSelect} placeholder='دسته بندی را انتخاب کنید...' width='100%'></NormalSelect>
                                                    </div>
                                                </Col>
                                                <Col  xs={12} md={6} lg={6}>
                                                    <div className={Style.categorySelectDiv}>
                                                            <MultiSelect onChange={saveTagsForUpdateTheCategory} options={tagsOptionForMultiSelect} placehloder='تگ مورد نظر را انتخاب کنید...'></MultiSelect>
                                                    </div>
                                                </Col>
                                                <Col  xs={12} md={3} lg={2}>
                                                    <div className={Style.saveBtnDiv}>
                                                            <NormalBtn onClick={sendTagsForUpdateCategory} btnName='ذخیره' paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {/* search in categories */}
                                    <Row dir="rtl">
                                          <div className={Style.lineDiv}></div>
                                          <SearchBar loading={searchLoading} onChange={(e)=>{setSearchForTagsText(e.target.value);}}></SearchBar>
                                    </Row>
    
                                    <Row>
                                        {/* card header */}
                                        <Col xs={12} md={12} lg={12}>
                                            {searchForTagsText === ''?
                                                <div className={Style.tagsCardsDiv}>
                                                    <div className={Style.cardDiv}>
                                                        <CpTagCard validationUpdate={tagValidationUpdate} tagIdToDelete={setTagIdToDelete} deleteOnClick={setShowDeleteTagModal} updateTag={updateTag}  data={allTagsForList}></CpTagCard>
                                                    </div>
                                                    {allTagsForListLength > 20 ? 
                                                        <Row>  
                                                            <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                                                <button onClick={()=>{history.push(`tagsAndCategories?limit=${limitTags}&pageState=tags`);setLimitTags(limitTags + 10);}} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                            </div>
                                                        </Row>
                                                    :
                                                    null
                                                    }
                                                </div>
                                            :
                                                <div className={Style.tagsCardsDiv}>
                                                    {searchForTagsData.length !== 0 ?
                                                        <div className={Style.cardDiv}>
                                                            <CpTagCard validationUpdate={tagValidationUpdate} tagIdToDelete={setTagIdToDelete} deleteOnClick={setShowDeleteTagModal} updateTag={updateTag}  data={searchForTagsData}></CpTagCard>
                                                        </div>
                                                    :
                                                    <div style={{marginTop:'90px'}}>
                                                    <NoDataFigure msg='دسته بندی ای برای نمایش وجود ندارد'></NoDataFigure>
                                                    </div>       
                                                    }
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                    </div>
                                :null}
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}

export default TagsAndCategories;