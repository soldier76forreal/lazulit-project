//modules
import { Fragment, useState , useEffect , useContext  } from "react";
import Style from './cpComments.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link  , useHistory , useLocation } from "react-router-dom";
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
import { Cookie, SyncProblem } from "@mui/icons-material";
import BtnNewThingWithIcon from "../tools/btnNewThingWithIcon";
import SelectiveOutLineBtn from "../tools/selectiveOutLineBtn";
import CpProductsCard from "./specialTools/cpProductsCard";
import NoDataFigure from "../tools/noDataFigure";
import axios from "axios";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
import ActivePage from "../../store/activePage";
import AuthContext from "../../store/auth";
import Language from "../../store/language";
import CommentBox from "../tools/commentBox";
import CommentItself from "../tools/commentItself";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";



const Comments = () =>{
     //------------------------------history and location------------------------------
     const history = useHistory();
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const activePageCtx = useContext(ActivePage);
     const authCtx = useContext(AuthContext);
     const langCtx = useContext(Language);
     const decoded = jwtDecode(Cookies.get('accessToken'));
     useEffect(() => {
         activePageCtx.activePageFnOr('comments');
         document.title = "دیدگاه ها"
     }, []);
     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');
     const [allProducts , setAllProducts] = useState([]);
     const [limit , setLimit] = useState(60);
     const [allProductLength , setAllProductLength] = useState('');
     const [activeFilter , setActiveFilter] = useState(null);

     const [searchInProductText , setSearchInProductText] = useState('');
     const [searchInProductData , setSearchInProductData] =  useState([]);

    //modal
     const [showDeleteModal , setShowDeleteModal] = useState(false);
     const [itemToDelete , setItemToDelete] = useState("");

    //comments
    const [allComments , setAllComments] = useState([]);
    const [commentCount , setCommentCount] = useState(0);
    const [overalRate , setOveralRate] = useState(0);
    const [searchLoading , setSearchLoading] = useState(false);
    const [updateComments , setUpdateComments] = useState('');
    const [refreshList , setRefreshList] = useState('');
    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');


    const productComments = async() =>{
        let queryLimit = '';
        if(queryParams.get('limit') === null){
            queryLimit = 30;
        }else{
            queryLimit = parseInt(queryParams.get('limit'));
        }
         
        try{
            const response = await authCtx.jwtInst({
                method:'get',
                url:`${authCtx.defaultTargetApi}/comment/getCommentsForCp?filter=${queryParams.get('filter')}`,
                params:{
                    limit:queryLimit
                },
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                
            })
            setAllComments([...response.data.comments]);
            setCommentCount(response.data.commentsLength);
            setOveralRate(response.data.commentRate);
        }catch(err){
            console.log(err);
        }
    }
        //------------------------------useEffect------------------------------



    const filter = (e) =>{
        history.push(`/cp/comments?filter=${e.target.value}`)
        setActiveFilter(e.target.value);
    }



    const showMore =()=>{
        setLimit(limit + 20);
       history.push(`products?limit=${limit}`); 
    }

    //------------------------------listners------------------------------
    useEffect(() => {
        productComments();
    }, [refreshList , limit , queryParams.get('filter')]);
                

    return(
        <Fragment>
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='دیدگاه ها'></NormalHeader>
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
                                        {/* <div className={Style.leftToolBarDiv}>
                                           <SearchBar loading={searchLoading} onChange={(e)=>{setSearchInProductText(e.target.value)}}></SearchBar>
                                        </div> */}
                                        <div className={Style.rightToolBarDiv}>

                                            <div className={Style.filterDiv}>
                                                <h3>فیلتر کردن براساس:</h3>
                                                <div className={Style.filterBtnDiv}> 
                                                    <SelectiveOutLineBtn onClick={filter} value='notValid'  btnName='تایید نشده ها' isActive={queryParams.get('filter') === 'notValid' ? true : false} paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>        
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn onClick={filter} value='valid' btnName='تایید شده ها' isActive={queryParams.get('filter') === 'valid' ? true : false}   paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn onClick={filter} value='last' btnName='جدید ترین' isActive={queryParams.get('filter') === 'last' ? true : false} paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn onClick={filter} value='old' btnName='قدیمی ترین' isActive={queryParams.get('filter') === 'old' ? true : false}   paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>

                                <Row>
                                    {/* card header */}
                                    <Col xs={12} md={12} lg={12}>
                                        <div style={{maxWidth:'1670px'}} className={Style.tagsCardsDiv}>
                                            <Row>
                                                    {allComments.map(dt=>{
                                                        return(
                                                            <div style={{padding:'6px 120px 6px 120px'}} className={Style.commentDiv}>
                                                                <CommentItself  setRefreshList={setRefreshList}  comment={dt}></CommentItself>
                                                            </div>
                                                        )
                                                    })}
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>  
                                    {commentCount > 30 ? 
                                        <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                            <button onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                        </div>
                                    :
                                        null
                                    }

                                </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}

export default Comments;