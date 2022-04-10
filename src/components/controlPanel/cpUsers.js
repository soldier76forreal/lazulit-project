//modules
import { Fragment, useState , useEffect , useContext } from "react";
import Style from './productsList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link  , useHistory , useLocation} from "react-router-dom";
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
import NoDataFigure from "../tools/noDataFigure";
import axios from "axios";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
import ActivePage from "../../store/activePage";
import CpUserCard from "./specialTools/cpUserCard";
import EditUserModal from "./specialTools/editUserModal";
import AuthContext from "../../store/auth";


const CpUser = () =>{
     //------------------------------history and location------------------------------
     const history = useHistory();
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const activePageCtx = useContext(ActivePage);
     const authCtx = useContext(AuthContext);
     useEffect(() => {
         activePageCtx.activePageFnOr('users');
         document.title = "کاربرها"
     }, []);
     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');
     const [allUsers , setAllUsers] = useState([]);
     const [limit , setLimit] = useState(30);
     const [allUsersLength , setAllUsersLength] = useState('');
     


     const [searchInProductText , setSearchInProductText] = useState('');
     const [searchInProductData , setSearchInProductData] =  useState([]);


    //modal
     const [showDeleteModal , setShowDeleteModal] = useState(false);
     const [productIdToDelete , setProductIdToDelete] = useState("");

     const [listRefresh , setListRefresh] = useState('');


     const [searchLoading , setSearchLoading] = useState(false);

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

    //edit modal
    const [editModalStatus , setEditModalStatus] = useState(false);
    //selected role
    const [selectedRole , setSelectedRole] = useState('');
    const [editModalId , setEditModalId] = useState('');
    const [imageName , setImageName] = useState('');



    //------------------------------http requests------------------------------

        //get users    
        const getAllUsers = async () =>{
            let queryLimit = {limit:0};
            if(queryParams.get('limit') === null){
                queryLimit.limit = 20;
            }else{
                queryLimit.limit = queryParams.get('limit');
            }
                try{
                    const response = await axios({
                        method:"get",
                        url:`${authCtx.defaultTargetApi}/users/getAllUsers`,
                        params:queryLimit,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setAllUsers([...data.rs]);
                    setAllUsersLength(data.ln);
                }catch(error){
                    // setFailedOpenToast(false);
                    // setFailedMsgToast(error.response.data);
                }
        }
    
            // //validation Category
            const validationUpdate = async (e) =>{
                const  productId ={id:e.target.value};
                    try{
                        const response = await axios({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/users/validationUser`,
                            data:productId,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setListRefresh(Math.random());
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast('تاییدیه انجام نشد');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }


                // change role
                const changeRole = async (e , j) =>{
                    const dataToValidate = {id:j.name , label:e.label};               
                        try{
                            const response = await axios({
                                method:"post",
                                url:`${authCtx.defaultTargetApi}/users/userRoleUpdate`,
                                data:dataToValidate,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setListRefresh(Math.random());
                    
                        }catch(error){
                            setFailedOpenToast(true);
                            setFailedMsgToast('تاییدیه انجام نشد');
                            const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                        }
                }



            //delete category 
            const deleteCategory = async () =>{
                const  dataToSend ={productId:productIdToDelete };
                    try{
                        const response = await axios({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/product/deleteProduct`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                        setListRefresh(Math.random());
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast(error.response.data);
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }


        //search category
        const searchInProducts = async () =>{
            const  dataToSend ={searching:searchInProductText};
            if(searchInProductText !== ''){
                try{
                    const response = await axios({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/users/searchInUsers`,
                        data:dataToSend,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    console.log(data);
                    setSearchInProductData([...data]);
                    setSearchLoading(false); 
                }catch(error){


                }
            }
        }

        useEffect(() => {
            if(searchInProductText !== ''){
                setSearchLoading(true); 
            }
            let categorySearchTimeOut = setTimeout(()=>{
                searchInProducts();
            }, 1000)
            return () => {
                clearTimeout(categorySearchTimeOut);
            }
        }, [searchInProductText]);
        
        useEffect(() => {

            searchInProducts();
        }, []);




    //------------------------------listners------------------------------

    const showMore =()=>{
        setLimit(limit + 10);
       history.push(`products?limit=${limit}`); 
    }

    const openEditModal = (e) =>{
        setEditModalStatus(true);
        setEditModalId(e.currentTarget.id);
        setImageName(e.currentTarget.value);
    }

        //open and close Modal of delete btn
        const openModalByDeleteBtn =(e)=>{
            setShowDeleteModal(true);
            setProductIdToDelete(e.currentTarget.value);
        }
    //------------------------------useEffect------------------------------
    
    useEffect(() => {
        getAllUsers();
    }, [listRefresh , limit]);
    return(
        <Fragment>
            {/* Modal */}
        <EditUserModal setListRefresh={setListRefresh} imageName={imageName} editModalId={editModalId} closeModal={()=>{setEditModalStatus(false);}} showModal={editModalStatus}></EditUserModal>

            <Modal  delete={deleteCategory} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='کاربر ها'></NormalHeader>
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
                                           <SearchBar loading={searchLoading} onChange={(e)=>{setSearchInProductText(e.target.value)}}></SearchBar>
                                        </div>
                                        <div className={Style.rightToolBarDiv}>
                                            <div className={Style.newPostWithoutBtnDiv}>
                                                    <Link to='/signUp'><BtnNewThingWithIcon btnName='کاربر جدید' paddingTop={'0px'} paddingButtom={'0px'} fontSize={'16px'} paddingRight={'0px'} paddingLeft={'10px'} backgroundColor={'#3C3C3C'} color={'#FFFFFF'} ></BtnNewThingWithIcon></Link>
                                            </div>
                                            {/* <div className={Style.filterDiv}>
                                                <h3>فیلتر کردن براساس:</h3>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='جدید ترین' isActive={true} paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>        
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='تایید نشده ها' isActive={false}   paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </Row>

                                <Row>
                                    {/* card header */}
                                    <Col xs={12} md={12} lg={12}>
                                        <div className={Style.tagsCardsDiv}>
                                            <Row>
                                                {/* card header */}
                                                {allUsersLength !== 0 ? 

                                                <Col  xs={12} md={12} lg={12}>
                                                    <div  className={Style.tagsCardsDiv}>
                                                    {/* card it self */}
                                                    {searchInProductText === '' ?
                                                            <div className={Style.cardDiv}>
                                                                <CpUserCard openEditModal={openEditModal} changeRole={changeRole} setSelectedRole={setSelectedRole} selectedRole={selectedRole} openModalByDeleteBtn={openModalByDeleteBtn} validationUpdate={validationUpdate}  data={allUsers}></CpUserCard>
                                                                {allUsersLength > 20 ? 
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
                                                                {searchInProductText !== '' && searchInProductData.length === 0 ?
                                                                <div style={{marginTop:'90px'}}>
                                                                    <NoDataFigure msg='کاربر مورد نظر یافت نشد'></NoDataFigure>
                                                                </div>    
                                                            :
                                                                <CpUserCard openEditModal={openEditModal} changeRole={changeRole} setSelectedRole={setSelectedRole} selectedRole={selectedRole} openModalByDeleteBtn={openModalByDeleteBtn} validationUpdate={validationUpdate}  data={searchInProductData}></CpUserCard>
                                                        }
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                    :
                                                    <div style={{marginTop:'90px'}}>
                                                        <NoDataFigure msg='محصولی برای نمایش وجود ندارد'></NoDataFigure>
                                                    </div>           
                                                }
                                            </Row>
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

export default CpUser;