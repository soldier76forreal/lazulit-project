import Style from './cpOprators.module.css';
import { Fragment, useState  , useEffect , useContext  } from "react";
import { useHistory  , useLocation} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from "jwt-decode";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import axios from 'axios';
//components
import CpNormalHeader from './specialTools/cpNormlaHeader';
import NormalBtn from "../tools/normalBtn";
import NormalInput from "../tools/normalInput";
import MultiLangBtn from "../tools/multiLangBtn";
import CpSideBar from "./specialTools/cpSideBar";
import NormalSelect from "../tools/normalSelect";
import NormalHeader from "../tools/normalHeader";
import SearchBar from "../tools/searchBar";
import CpOpratorCard from "./specialTools/cpOpratorCard";
import MultiSelect from "../tools/reactSelectMulti";
import CpTagCard from "./specialTools/cpTagCard";
import Pag from "../tools/pagination";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
import EditOpratorModal from './specialTools/editOpratorModal';
import { set } from 'lodash';
import noDataImg from '../../assets/noData.png'
import NoDataFigure from '../tools/noDataFigure';
import AuthContext from '../../store/auth';
import CpWaOpratorCard from './specialTools/cpWaOpratorCard';
import CpWaOprators from './specialTools/cpWaOprators';
import ActivePage from '../../store/activePage';
import Language from '../../store/language';

const CpOprators =(props)=>{


//------------------------------auth Context------------------------------

    const authCtx = useContext(AuthContext);
    const decoded = jwtDecode(authCtx.token);
    const langCtx = useContext(Language);
    const activePageCtx = useContext(ActivePage);
    useEffect(() => {
        activePageCtx.activePageFnOr('oprator');
        document.title = "اپراتور های تماس";
    }, []);
//------------------------------query params------------------------------

    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //------------------------------states------------------------------
     const [firstName , setFirstName] = useState('');
     const [lastName , setLastName] = useState('');
     const [phoneNumberOne , setPhoneNumberOne] = useState('');
     const [phoneNumberTwo , setPhoneNumberTwo] = useState('');

     //new oprator
     const [newOprator , setNewOprator] = useState('');

    //page switcher
     const [pageSwitcherState , setPageSwitcherState] = useState('pcOprators');

     //delete oprator
     const [opratorIdToDelete , setOpratorIdToDelete] = useState('');
     //delete modal
     const [showDeleteModal , setShowDeleteModal] = useState(false);

    //edite modal
    const [showEditModal , setShowEditModal] = useState(false);
    const [editId , setEditId] = useState({});
    const [opratorToEditContent , setOpratorToEditContent] = useState({});


    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //deleted status
    const [deletedStatus , setDeletedStatus] = useState('');
    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

    //reciving data limit
    const [limit , setLimit] = useState(30);

    //reciving data limit
    const [opratorsLength , setOpratorsLength] = useState();

    //recived opratorsData
    const [oprators , setOprators] = useState([]);

    const [opratorIdToEdit , setOpratorIdToEdit] = useState('');

    //searching oprators
    const [searchedOprators , setSearchedOprators] = useState([]);
    const [searchOpratorsValue, setSearchOpratorsValue] = useState('');
    const [searchLoading  , setSearchLoading] = useState(false);

    
    //------------------------------listners------------------------------
    const getFirstName = (e) =>{
        setFirstName(e.target.value);
    }
    const getLastName = (e) =>{
        setLastName(e.target.value);

    }
    const getPhoneNumberOne = (e) =>{
        setPhoneNumberOne(e.target.value);

    }
    const getPhoneNumberTwo = (e) =>{
        setPhoneNumberTwo(e.target.value);
    }

    function isNum(val){
        return !isNaN(val)
      }

    const showMore =()=>{
        setLimit(limit + 10);
        
       history.push(`oprators?page=${queryParams.get('page')}&limit=${limit}`); 
    }

    const openModalByDeleteBtn =(e)=>{
        setShowDeleteModal(true);
        setOpratorIdToDelete(e.currentTarget.value);
    }
    const closeModalByDeleteBtn =()=>{
        setShowDeleteModal(false);
    }
    const openEditModal =(e)=>{
        for (var i=0; i < oprators.length; i++) {
            if (oprators[i].oprator._id === e.currentTarget.value) {
                setEditId(oprators[i].oprator);

            }
        }
        setOpratorIdToEdit(e.currentTarget.value);
        setShowEditModal(true);
        
    }
    const closeEditModal = () =>{
        setShowEditModal(false);
    }
    //------------------------------HTTP requests------------------------------
    const updateOpratorData = async (fn , ln , pnOne , pnTwo) =>{
        if(fn !=='' && ln !==''){
            let phoneNumbersArray = [];
            if(pnOne !== ''){
                phoneNumbersArray.push(pnOne);
            }
            if(pnTwo !== ''){
                phoneNumbersArray.push(pnTwo);
            }
            if(pnOne !== '' || pnTwo !== ''){
                if(isNum(pnOne) && isNum(pnTwo)){
                        const  dataToSend ={firstName:fn , lastName:ln , phoneNumbers:phoneNumbersArray , id:opratorIdToEdit};
                        console.log(dataToSend);
                        try{
                            if(langCtx.language === 'persian'){
                                const response = await  authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateOprator`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast('ویرایش با موفقیت انجام شد!');
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setNewOprator(data);
                                setShowEditModal(false);
                            }else if(langCtx.language === 'arabic'){
                                const response = await  authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateOpratorAr`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast('ویرایش با موفقیت انجام شد!');
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setNewOprator(data);
                                setShowEditModal(false);
                            }else if(langCtx.language === 'english'){
                                const response = await  authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateOpratorEn`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast('ویرایش با موفقیت انجام شد!');
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setNewOprator(data);
                                setShowEditModal(false);
                            }
                        }catch(error){
                            console.log(error);
                            setFailedOpenToast(true);
                            setFailedMsgToast('خطا!ویرایش انجام نشد');
                            const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                        }
                    }else{
                        setFailedOpenToast(true);
                        setFailedMsgToast('شماره تلفن معتبر نیست');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
                }else{
                    setFailedOpenToast(true);
                    setFailedMsgToast('شماره تماسی وارد نشده است!');
                    const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast('نام و نام خانوادگی را وارد کنید');
                const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
    }



            //update category with tag 
            const saveOpratorToDb = async () =>{
                let phoneNumbersArray = [];
                if(phoneNumberOne !== ''){
                    phoneNumbersArray.push(phoneNumberOne);
                }
                if(phoneNumberTwo !== ''){
                    phoneNumbersArray.push(phoneNumberTwo);
                }
                if(phoneNumberOne !== '' || phoneNumberTwo !== ''){
                    if(isNum(phoneNumberOne) && isNum(phoneNumberTwo)){
                            const  dataToSend ={ author:decoded.id ,firstName:firstName , lastName:lastName , phoneNumbers:phoneNumbersArray};
                            try{
                                if(langCtx.language === 'persian'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/newOprator`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSuccessOpenToast(true);
                                    setSuccessMsgToast('اپراتور با موفقیت ثبت شد');
                                    const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                    setNewOprator(Math.random());
                                }else if(langCtx.language === 'arabic'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/newOpratorAr`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSuccessOpenToast(true);
                                    setSuccessMsgToast('اپراتور با موفقیت ثبت شد');
                                    const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                    setNewOprator(Math.random());
                                }else if(langCtx.language === 'english'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/newOpratorEn`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSuccessOpenToast(true);
                                    setSuccessMsgToast('اپراتور با موفقیت ثبت شد');
                                    const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                    setNewOprator(Math.random());
                                }
                            }catch(error){
                                console.log(error);
                                setFailedOpenToast(true);
                                setFailedMsgToast('اپراتور ذخیره نشد!خطایی پیش آمده');
                                const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                            }
                        }else{
                            setFailedOpenToast(true);
                            setFailedMsgToast('شماره تلفن معتبر نیست');
                            const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                        }
                    }else{
                        setFailedOpenToast(true);
                        setFailedMsgToast('شماره تماسی وارد نشده است!');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }


            // const getOpratorToEdit = async(id) =>{
            //     const opratorId = {opratorId : id};
            //     try{
            //         const response = await axios({
            //             method:"get",
            //             url:`http://localhost:3001/oprators/getOprator`,
            //             params:opratorId,
            //             config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            //         })
            //         const data = await response.data; 
            //         setOpratorToEditContent(data);
                    
            //     }catch(error){
        
            //     }
            // }
             
            //get all oprators 
            const getOprators = async() =>{
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
                                url:`${authCtx.defaultTargetApi}/oprators/getOprators`,
                                params:queryLimit,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setOprators([...data.rs]);
                            setOpratorsLength(data.ln);
                        }else if(langCtx.language === 'arabic'){
                            const response = await authCtx.jwtInst({
                                method:"get",
                                url:`${authCtx.defaultTargetApi}/oprators/getOpratorsAr`,
                                params:queryLimit,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setOprators([...data.rs]);
                            setOpratorsLength(data.ln);
                        }else if(langCtx.language === 'english'){
                            const response = await authCtx.jwtInst({
                                method:"get",
                                url:`${authCtx.defaultTargetApi}/oprators/getOpratorsEn`,
                                params:queryLimit,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setOprators([...data.rs]);
                            setOpratorsLength(data.ln);
                        }
                        
                    }catch(error){

                    }
                }  
                
                //search oprator 
                const searchOprators = async () =>{
                    setSearchLoading(false);
                    if(searchOpratorsValue !== ''){
                        const  dataToSend ={searching:searchOpratorsValue};
                            try{
                                if(langCtx.language === 'persian'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/opSearch`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchedOprators([...data]);
                                    setSearchLoading(false);
                                }else if(langCtx.language === 'arabic'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/opSearchAr`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchedOprators([...data]);
                                    setSearchLoading(false);
                                }else if(langCtx.language === 'english'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/opSearchEn`,
                                        data:dataToSend,
                                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                    })
                                    const data = await response.data; 
                                    setSearchedOprators([...data]);
                                    setSearchLoading(false);
                                }

                            }catch(error){


                            }
                    }
                }

                useEffect(() => {
                    if(searchOpratorsValue !== ''){
                        setSearchLoading(true); 
                    }
                    let categorySearchTimeOut = setTimeout(()=>{
                        searchOprators();
                    }, 1000)
                    return () => {
                        clearTimeout(categorySearchTimeOut);
                    }
                }, [searchOpratorsValue]);
                
                useEffect(() => {
        
                    searchOprators();
                }, [ opratorsLength , newOprator , langCtx.language]);

                //delete oprator 
                const deleteOprator = async () =>{
                    const  dataToSend ={opratorId:opratorIdToDelete };
                        try{
                            if(langCtx.language === 'persian'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteOprator`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast(data.msg);
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setShowDeleteModal(false);
                                setOpratorsLength(data.ln);
                            }else if(langCtx.language === 'arabic'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteOpratorAr`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast(data.msg);
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setShowDeleteModal(false);
                                setOpratorsLength(data.ln);
                            }else if(langCtx.language === 'english'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteOpratorEn`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSuccessOpenToast(true);
                                setSuccessMsgToast(data.msg);
                                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                                setShowDeleteModal(false);
                                setOpratorsLength(data.ln);
                            }
                        }catch(error){
                            setFailedOpenToast(true);
                            setFailedMsgToast(error.response.data);
                            const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false);}, 3000);
                            setShowDeleteModal(false);
                        }
                }
            useEffect(() => {
                getOprators();
            }, [langCtx.language , limit , newOprator , opratorsLength ])



            //tag And Categories switch
            const pageSwitcherToWa = () =>{
                if(queryParams.get('page') === 'pcOprators'){
                    setPageSwitcherState('waOprators');
                    history.push(`oprators?page=waOprators`); 
                }
                document.title = "اپراتور های واتساپ";
            } 
            const pageSwitcherToPc = () =>{

                if(queryParams.get('page') === 'waOprators'){
                    setPageSwitcherState('pcOprators');
                    history.push(`oprators?page=pcOprators`); 
                }
                document.title = "اپراتور های تماس";
            } 
            // useEffect(() => {
            //     history.push(`oprators?page=pcOprators`);
            // }, [])
    return(
        <Fragment>
                {/* Modal */}
                <Modal  delete={deleteOprator} closeModalFn={closeModalByDeleteBtn} showModal={showDeleteModal}></Modal>            
                <EditOpratorModal updateOprator={updateOpratorData} opratorIdToEdit={editId} closeModal={closeEditModal} showModal={showEditModal}></EditOpratorModal>
               
            {/* toasts */}
            <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
            <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
            <Container>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                    <Row dir="rtl">
                                        {/* header */}
                                        <Col xs={12} md={12} lg={8}>
                                            <div className={Style.topRightDivHeaderContainer}>
                                                <div className={Style.headerTitleDiv}>
                                                {/* custom header title component */}
                                                <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header={pageSwitcherState === 'waOprators' ?'اپراتور های واتساپ' : 'اپراتور های تماس'}></NormalHeader>
                                                </div>
                                                {/* page switcher */}
                                                <div className={Style.switchBtnDiv}>
                                                    {queryParams.get('page') === 'pcOprators' ?                                                
                                                        <button onClick={pageSwitcherToPc}  className={`${Style.active} ${Style.switchBtn}`}>تماس</button>
                                                        :
                                                        <button onClick={pageSwitcherToPc}  className={`${Style.switchBtn}`}>تماس</button>
                                                    }
                                                    {queryParams.get('page') === 'waOprators' ?                                                
                                                        <button onClick={pageSwitcherToWa} className={`${Style.active} ${Style.switchBtn}`}>واتساپ</button>
                                                        :
                                                        <button onClick={pageSwitcherToWa} className={`${Style.switchBtn}`}>واتساپ</button>
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
                                {queryParams.get('page') === 'pcOprators' ?
                                <div>
                                    <Row dir="rtl">
                                        {/* add new category section */}
                                        <Col xs={12} md={12} lg={12}>
                                        <div className={Style.formDiv}>
                                                <Row>
                                                        <Col  xs={6} md={6} lg={3}>
                                                            <div className={Style.opratorInputsDiv}>
                                                                <h4>نام</h4>
                                                            <NormalInput onChange={getFirstName}  placeholder='...'></NormalInput>
                                                            </div>
                                                        </Col>
                                                        <Col  xs={6} md={6} lg={3}>
                                                            <div className={Style.opratorInputsDiv}>
                                                                <h4>نام خانوادگی</h4>
                                                            <NormalInput onChange={getLastName}  placeholder='...'></NormalInput>
                                                            </div>
                                                        </Col>
                                                        <Col  xs={6} md={6} lg={3}>
                                                            <div className={Style.opratorInputsDiv}>
                                                                <h4>شماره تماس اول</h4>
                                                            <NormalInput type='tel'  onChange={getPhoneNumberOne} placeholder='...'></NormalInput>
                                                            </div>
                                                        </Col>
                                                        <Col  xs={6} md={6} lg={3}>
                                                            <div className={Style.opratorInputsDiv}>
                                                                <h4>شماره تماس دوم</h4>
                                                            <NormalInput type='tel' onChange={getPhoneNumberTwo} placeholder='...'></NormalInput>
                                                            </div>
                                                        </Col>
                                                        <Col  xs={12} md={12} lg={12}>
                                                            <div className={Style.opratorInputsDiv}>
                                                                <NormalBtn onClick={saveOpratorToDb}  btnName={'ذخیره ی اپراتور'} paddingTop={'3px'} paddingButtom={'3px'} fontSize={'17px'} paddingRight={'17px'} paddingLeft={'17px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
                                                            </div>
                                                        </Col>
                                                </Row>
                                            </div>         
                                        </Col>
                                        <Col xs={0} md={6} lg={6}>
                                        </Col>
                                    </Row>
                                    {/* search in categories */}
                                    <Row dir="rtl">
                                        <div className={Style.lineDiv}></div>
                                        <SearchBar loading={searchLoading} onChange={(e)=>{setSearchOpratorsValue(e.target.value)}}></SearchBar>
                                    </Row>
                                    {opratorsLength === 0 ?
                                        <div style={{marginTop:'68px'}}>
                                            <NoDataFigure msg='اپراتوری وجود ندارد'></NoDataFigure>
                                        </div>
                                    :
                                    <Row>
                                        {/* card header */}
                                        <Col  xs={12} md={12} lg={12}>
                                            <div  className={Style.tagsCardsDiv}>
                                                <div className={Style.cardDiv}>
                                                    {searchOpratorsValue === '' ? 
                                                        <div>
                                                            <CpOpratorCard  openEditModal={openEditModal} opratorToDelete={openModalByDeleteBtn}  data={oprators}></CpOpratorCard>
                                                            {opratorsLength > '20' ? 
                                                                <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                                                    <button  onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                                </div>
                                                            :null}
                                                        </div>
                                                    :searchOpratorsValue !== '' ?
                                                        <div>
                                                            {searchedOprators.length !== 0 ?
                                                               <CpOpratorCard  openEditModal={openEditModal} opratorToDelete={openModalByDeleteBtn}  data={searchedOprators}></CpOpratorCard>
                                                            :searchedOprators.length === 0 ?
                                                                 <div style={{marginTop:'68px'}}>
                                                                    <NoDataFigure msg='اپراتور مورد نظر یافت نشد'></NoDataFigure>
                                                                 </div>
                                                           :null }
                                                        </div>
                                            
                                                    :null}

                                                </div>
                                                <div>
                                                        {/* <Pag  newCategory={newTag} prevPage={prevPTag} nextPage={nextPTag} setCurrent={currentPageClickTag} max={maxPageTag} current={currentPageTag} total={totalPageTag} getCategories={getTagData} ></Pag> */}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    }

                                </div>
                                :queryParams.get('page') === 'waOprators' ?
                                    <CpWaOprators></CpWaOprators>
                                :null
                                }

                            </div>
                        </Col>
                    </Row>     

            </Container>
        </Fragment>
    )
}
export default CpOprators;