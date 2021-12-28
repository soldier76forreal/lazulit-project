//modules
import { Fragment, useState } from "react";
import Style from './productsList.module.css';
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
import { SyncProblem } from "@mui/icons-material";
import BtnNewThingWithIcon from "../tools/btnNewThingWithIcon";
import SelectiveOutLineBtn from "../tools/selectiveOutLineBtn";
import CpProductsCard from "./specialTools/cpProductsCard";

const ProductsList = () =>{
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='محصولات'></NormalHeader>
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
                            
                                <div>
                                {/* search in categories */}
                                <Row dir="rtl">
                                    <div className={Style.toolBarDiv}>
                                        <div className={Style.leftToolBarDiv}>
                                           <SearchBar></SearchBar>
                                        </div>
                                        <div className={Style.rightToolBarDiv}>
                                            <div className={Style.newPostWithoutBtnDiv}>
                                                    <BtnNewThingWithIcon btnName='محصول جدید' paddingTop={'0px'} paddingButtom={'0px'} fontSize={'16px'} paddingRight={'0px'} paddingLeft={'10px'} backgroundColor={'#3C3C3C'} color={'#FFFFFF'} ></BtnNewThingWithIcon>
                                            </div>
                                            <div className={Style.filterDiv}>
                                                <h3>فیلتر کردن براساس:</h3>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='جدید ترین' isActive={true} paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>        
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='تایید نشده ها' isActive={false}   paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                <CpProductsCard></CpProductsCard>

                                            </div>
                                            <div>
                                                    {/* <Pag  newCategory={newTag} prevPage={prevPTag} nextPage={nextPTag} setCurrent={currentPageClickTag} max={maxPageTag} current={currentPageTag} total={totalPageTag} getCategories={getTagData} ></Pag> */}
                                            </div>
                                            
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}

export default ProductsList;