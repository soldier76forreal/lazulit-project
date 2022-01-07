//modules
import { Fragment, useState , useEffect } from "react";
import Style from './tagsAndCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";

const TagsAndCategories = () =>{
     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');

     //category input state
     const [category , setCategory] = useState('');

    //modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
    //saves
    const [allCategories , setAllCategories] = useState([]);
    const [allTags, setAllTags] = useState([]);

    //add New tag States
    const [categoryIdToDelete , setCategoryIdToDelete] = useState('');
   

    //add New tag States
    const [categoryOfNewTag , setCategoryOfNewTag] = useState('');
    const [newTag , setNewTag] = useState('');

        //update categories with tags      
        const [categoryForUpdateWithTags , setCategoryForUpdateWithTags] = useState(null);
        const [tagsToUpdateCategory , setTagsToUpdateCategory] = useState([]);
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
        const  categoryData ={categoryData:category};
            try{
                const response = await axios({
                    method:"post",
                    url:"http://localhost:3001/tagAndCategory/newCategory",
                    data:categoryData,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = await response.data; 
                setSuccessOpenToast(true);
                setSuccessMsgToast(data.msg);
                const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
            }
    }

        //add new tag to db
        const sendNewTag = async () =>{
            const  categoryData ={categoryId:categoryOfNewTag , tag:newTag };
                try{
                    const response = await axios({
                        method:"post",
                        url:"http://localhost:3001/tagAndCategory/newTag",
                        data:categoryData,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data.msg);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
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
                            const response = await axios({
                                method:"post",
                                url:"http://localhost:3001/tagAndCategory/addTagToCategory",
                                data:dataToSend,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setSuccessOpenToast(true);
                            setSuccessMsgToast(data.msg);
                            const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                        }catch(error){
                            setFailedOpenToast(true);
                            setFailedMsgToast(error.response.data);
                            const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                        }
                }


             //get tags
            const getAllTags = async () =>{
                if(categoryForUpdateWithTags !== null){
                    const paramsData = {params:categoryForUpdateWithTags};
                    try{
                        const response = await axios({
                            method:"get",
                            url:"http://localhost:3001/tagAndCategory/getAllTagsForMultiSelect",
                            params:paramsData,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSuccessOpenToast(false);
                        setAllTags([...data])
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
                try{
                    const response = await axios({
                        method:"get",
                        url:"http://localhost:3001/tagAndCategory/getAllCategories",
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(false);
                    setAllCategories([...data])
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                }
        }


        //delete category 
        const deleteCategory = async () =>{
            const  dataToSend ={categoryId:categoryIdToDelete };
                try{
                    const response = await axios({
                        method:"post",
                        url:"http://localhost:3001/tagAndCategory/deleteCategory",
                        data:dataToSend,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data);
                    const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                    const closingFailedMsgTimeOut = setTimeout(closeFailedMsg, 3000);
                }
        }


    //------------------------------USE EFFECTS------------------------------

    useEffect(() => {
        getAllCategories();
        getAllTags();
    }, [])
    useEffect(() => {
        getAllTags();
    }, [categoryForUpdateWithTags])




    //------------------------------mapping Data------------------------------

    const categoriesOptionForNormalSelect = []
    for(var i = 0 ; allCategories.length>i ; i++){
    //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        categoriesOptionForNormalSelect.push({ value: allCategories[i]._id, label: allCategories[i].category })
      }


      const tagsOptionForMultiSelect = []
      for(var j = 0 ; allTags.length>j ; j++){
      //   if(allCategories[i].validation === false && allCategories[i].deleteDate !== null){
        tagsOptionForMultiSelect.push({ value: allTags[j]._id, label: allTags[j].tag })
        }


        
    //tag And Categories switch
    const pageSwitcherToTag = () =>{
        if(pageSwitcherState === 'category'){
            setPageSwitcherState('tags');
        }

    } 
    const pageSwitcherToCategory = () =>{

        if(pageSwitcherState === 'tags'){
            setPageSwitcherState('category');
        }
    } 
    return(
        <Fragment>
                {/* Modal */}
                    <Modal delete={deleteCategory} closeModalFn={closeModalByDeleteBtn} showModal={showDeleteModal}></Modal>
                {/* toasts */}
                    <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                    <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <Row dir="rtl">
                                    {/* header */}
                                    <Col xs={12} md={12} lg={4}>
                                        <div className={Style.topRightDivHeaderContainer}>
                                            <div className={Style.headerTitleDiv}>
                                               {/* custom header title component */}
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header={pageSwitcherState === 'tags' ?'تگ ها' : 'دسته بندی ها'}></NormalHeader>
                                            </div>
                                            {/* page switcher */}
                                            <div className={Style.switchBtnDiv}>
                                                {pageSwitcherState === 'category' ?                                                
                                                    <button onClick={pageSwitcherToCategory}  className={`${Style.active} ${Style.switchBtn}`}>دسته بندی ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToCategory}  className={`${Style.switchBtn}`}>دسته بندی ها</button>
                                                }
                                                {pageSwitcherState === 'tags' ?                                                
                                                    <button onClick={pageSwitcherToTag} className={`${Style.active} ${Style.switchBtn}`}>تگ ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToTag} className={`${Style.switchBtn}`}>تگ ها</button>
                                                }     
                                            </div>
                            
                                        </div>  
                                    </Col>

                                    <Col xs={0} md={0} lg={4}>

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
                               
                                {pageSwitcherState === 'category' ? 
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
                                                        <NormalBtn onClick={sendNewCategory} btnName='ذخیره' paddingTop={'1px'} paddingButtom={'1px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
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
                                      <SearchBar></SearchBar>
                                </Row>

                                <Row>
                                    {/* card header */}
                                    <Col  xs={12} md={12} lg={12}>
                                        <div  className={Style.tagsCardsDiv}>
                                            {/* <div className={Style.headerDiv}>
                                                <div className={Style.rightHeader}> */}
                                                    {/* <h4 className={Style.categoryHeader}>دسته بندی</h4> */}
                                                    {/* <h4 className={Style.tagHeader}>دسته بندی</h4>
                                                </div>
                                                <div className={Style.leftHeader}>
                                                    <h4 className={Style.deleteHeader}>حذف</h4>
                                                    <h4 className={Style.editHeader}>ویرایش</h4>
                                                    <h4 className={Style.validationHeader}>تاییدیه</h4>
                                                    <h4 className={Style.dateHeader}>تاریخ ثبت</h4>
                                                    <h4 className={Style.profHeader}>ثبت شده توسط</h4>
                                                </div> */}
                                                
                                            {/* </div> */}
                                            {/* {allTagArray.map(data =>{
                                                return(
                                                    <div>
                                                        <TagCard data={data}></TagCard>
                                                    </div>
                                                )
                                                
                                            })} */}
                                           {/* card it self */}
                                            <div className={Style.cardDiv}>
                                                <CpCategoryCard deleteOnClick={openModalByDeleteBtn} data={allCategories}></CpCategoryCard>

                                            </div>
                                            <div>
                                                    {/* <Pag  newCategory={newTag} prevPage={prevPTag} nextPage={nextPTag} setCurrent={currentPageClickTag} max={maxPageTag} current={currentPageTag} total={totalPageTag} getCategories={getTagData} ></Pag> */}
                                            </div>
                                            
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                                    :pageSwitcherState === 'tags' ?
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
                                          <SearchBar></SearchBar>
                                    </Row>
    
                                    <Row>
                                        {/* card header */}
                                        <Col xs={12} md={12} lg={12}>
                                                <div className={Style.tagsCardsDiv}>
                                                <div className={Style.headerDiv}>
                                                    <div className={Style.rightHeader}>
                                                        {/* <h4 className={Style.categoryHeader}>دسته بندی</h4> */}
                                                        <h4 className={Style.tagHeader}>تگ ها</h4>
                                                        <h4 className={Style.categoryHeader}>دسته بندی</h4>

                                                    </div>
                                                    <div className={Style.leftHeader}>
                                                        <h4 className={Style.deleteHeader}>حذف</h4>
                                                        <h4 className={Style.editHeader}>ویرایش</h4>
                                                        <h4 className={Style.validationHeader}>تاییدیه</h4>
                                                        <h4 className={Style.dateHeader}>تاریخ ثبت</h4>
                                                        <h4 className={Style.profHeader}>ثبت شده توسط</h4>
                                                        <h4 className={Style.profHeader}>دسته بندی</h4>
                                                    </div>
                                                    
                                                </div>
                                                {/* {allTagArray.map(data =>{
                                                    return(
                                                        <div>
                                                            <TagCard data={data}></TagCard>
                                                        </div>
                                                    )
                                                    
                                                })} */}
                                               {/* card it self */}
                                                <div className={Style.cardDiv}>
                                                    <CpTagCard></CpTagCard>
    
                                                </div>
                                                <div>
                                                {/* newCategory={newTag} prevPage={prevPTag} nextPage={nextPTag} setCurrent={currentPageClickTag} max={maxPageTag} current={currentPageTag} total={totalPageTag} getCategories={getTagData} */}
                                                        {/* <Pag></Pag> */}
                                                </div>
                                                
                                            </div>
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