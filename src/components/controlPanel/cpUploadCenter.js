import { Fragment, useState } from "react";
import Style from './cpUploadCenter.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from "react-drag-drop-files";
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
import CpImageUpload from "./specialTools/cpImageUpload";
const CpUploadCenter = (props) =>{
    const fileTypes = ["JPG", "png" , "docx"];
    const [fileToUpload , setFileToUpload] = useState(null);
    const handleChange = (file) => {
        setFileToUpload(file);
        console.log(fileToUpload);
      };
    return(
        <Fragment>   
                <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <Row>
                                    <Col xs={12} md={12} lg={12}>
                                        <CpNormalHeader name='آپلود سنتر'></CpNormalHeader>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col dir="rtl" xs={12} md={12} lg={12}>
                                        <div className={Style.uploadInputSection}>
                                            <div className={Style.headerDiv}>
                                                <NormalHeader  fontFamily='Dana1' fontSize='22px' color='#354063'  header="آپلود تصویر(jpg,png,jpeg)"></NormalHeader>
                                            </div>
                                            <CpImageUpload></CpImageUpload>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
        </Fragment>
    )
}
export default CpUploadCenter;