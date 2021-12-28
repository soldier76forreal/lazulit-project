//modules
import { Fragment, useState } from "react";
import Style from './tagsAndCategories.module.css';
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
import CpTagCard from "./specialTools/cpTagCard";
import Pag from "../tools/pagination";


const TagsAndCategories = () =>{
     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');


    //------------------------------listners------------------------------
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='دسته بندی ها'></NormalHeader>
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
                                                  <NormalInput></NormalInput>
                                                </div>
                                            </Col>
                                            <Col  xs={12} md={3} lg={3}>
                                                <div  style={{marginTop:'29px'}} className={Style.saveBtnDiv}>
                                                        <NormalBtn btnName='ذخیره' paddingTop={'7px'} paddingButtom={'7px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
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
                                    <Col xs={12} md={12} lg={12}>
                                            <div className={Style.tagsCardsDiv}>
                                            <div className={Style.headerDiv}>
                                                <div className={Style.rightHeader}>
                                                    {/* <h4 className={Style.categoryHeader}>دسته بندی</h4> */}
                                                    <h4 className={Style.tagHeader}>دسته بندی</h4>
                                                </div>
                                                <div className={Style.leftHeader}>
                                                    <h4 className={Style.deleteHeader}>حذف</h4>
                                                    <h4 className={Style.editHeader}>ویرایش</h4>
                                                    <h4 className={Style.validationHeader}>تاییدیه</h4>
                                                    <h4 className={Style.dateHeader}>تاریخ ثبت</h4>
                                                    <h4 className={Style.profHeader}>ثبت شده توسط</h4>
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
                                                <CpCategoryCard></CpCategoryCard>

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
                                                                <NormalSelect placeholder='دسته بندی را انتخاب کنید...' width='100%'></NormalSelect>
                                                        </div>
                                                </Col>
                                                <Col  xs={12} md={6} lg={6}>
                                                        <div className={Style.categorySelectDiv}>
                                                                <NormalInput placeholder='تگ جدید را وارد کنید...'></NormalInput>
                                                            
                                                        </div>
                                                </Col>
                                                
                                                <Col  xs={12} md={3} lg={2}>
                                                    <div className={Style.saveBtnDiv}>
                                                            <NormalBtn btnName={'ذخیره تگ'} paddingTop={'7px'} paddingButtom={'7px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
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
                                                                <NormalSelect placeholder='دسته بندی را انتخاب کنید...' width='100%'></NormalSelect>
                                                        </div>
                                                </Col>
                                                <Col  xs={12} md={6} lg={6}>
                                                        <div className={Style.categorySelectDiv}>
                                                                <MultiSelect placehloder='تگ مورد نظر را انتخاب کنید...'></MultiSelect>
                                                            
                                                        </div>
                                                </Col>
                                                
                                                <Col  xs={12} md={3} lg={2}>
                                                    <div className={Style.saveBtnDiv}>
                                                            <NormalBtn btnName='ذخیره' paddingTop={'7px'} paddingButtom={'7px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
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