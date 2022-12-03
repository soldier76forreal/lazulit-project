import { Fragment, useState , useEffect , useContext} from "react";
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
import CpVideoUpload from "./specialTools/cpVideoUpload";
import ActivePage from "../../store/activePage";

const CpUploadCenter = (props) =>{
    const activePageCtx = useContext(ActivePage);
    activePageCtx.activePageFnOr('upload');
    useEffect(() => {
        document.title = "آپلود سنتر";
    }, []);
    const [pageSwitcherState , setPageSwitcherState] = useState('image');
        //tag And Categories switch
        const pageSwitcherToImage = () =>{
            if(pageSwitcherState === 'file' || pageSwitcherState === 'video'){
                setPageSwitcherState('image');
            }
        } 
        const pageSwitcherToVideo = () =>{
            if(pageSwitcherState === 'file' || pageSwitcherState === 'image'){
                setPageSwitcherState('video');
            }
        } 
        const pageSwitcherToFile = () =>{
            if(pageSwitcherState === 'image' || pageSwitcherState === 'video'){
                setPageSwitcherState('file');
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header={pageSwitcherState === 'image' ? 'تصاویر' :pageSwitcherState === 'video' ? 'ویدیو ها' :pageSwitcherState === 'file' ? 'فایل ها' : null}></NormalHeader>
                                            </div>
                                            {/* page switcher */}
                                            <div className={Style.switchBtnDiv}>
                                                {pageSwitcherState === 'image' ?                                                
                                                    <button onClick={pageSwitcherToImage}  className={`${Style.active} ${Style.switchBtn}`}>تصاوریر</button>
                                                    :
                                                    <button onClick={pageSwitcherToImage}  className={`${Style.switchBtn}`}>تصاوریر</button>
                                                }
                                                {pageSwitcherState === 'video' ?                                                
                                                    <button onClick={pageSwitcherToVideo} className={`${Style.active} ${Style.switchBtn}`}>ویدیو ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToVideo} className={`${Style.switchBtn}`}>ویدیو ها</button>
                                                }     
                                                {pageSwitcherState === 'file' ?                                                
                                                    <button onClick={pageSwitcherToFile} className={`${Style.active} ${Style.switchBtn}`}>فایل ها</button>
                                                    :
                                                    <button onClick={pageSwitcherToFile} className={`${Style.switchBtn}`}>فایل ها</button>
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
                                <Row>
                                    <Col dir="rtl" xs={12} md={12} lg={12}>
                                        <div className={Style.uploadInputSection}>
                                            {pageSwitcherState === 'image' ?
                                                <CpImageUpload></CpImageUpload>
                                            :pageSwitcherState === 'video' ?
                                                <CpVideoUpload></CpVideoUpload>
                                                :
                                                <CpImageUpload></CpImageUpload>
                                            }

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