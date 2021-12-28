//modules
import { Fragment, useState } from "react";
import Style from './newProduct.module.css';
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
import CpNormalHeader from "./specialTools/cpNormlaHeader";

const NewProduct = () =>{
     //------------------------------states------------------------------




    //------------------------------listners------------------------------
    
    return(
        <Fragment>
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <CpNormalHeader></CpNormalHeader>



                               {/* new product */}
                               <Row dir="rtl">
                                   <Col xs={12} md={12} lg={5}>
                                        <div className={Style.formItemsDiv}>
                                            <div className={Style.lableDiv}><h4>عنوان فارسی</h4></div>
                                            <NormalInput placeholder='عنوان فارسی را وارد کنید...'></NormalInput>
                                        </div>
                                        <div className={Style.formItemsDiv}>
                                            <div className={Style.lableDiv}><h4>عنوان انگلیسی</h4></div>
                                            <NormalInput  placeholder='عنوان انگلیسی را وارد کنید...'></NormalInput>
                                        </div>
                                   </Col>
                                   <Col xs={12} md={12} lg={7}>
                                   </Col>
                                   

                        
                               </Row>
                               
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}

export default NewProduct;