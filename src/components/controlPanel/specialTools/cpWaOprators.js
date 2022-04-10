import Style from './cpWaOprators.module.css';
import { Fragment, useState  , useEffect , useContext  } from "react";
import { useHistory  , useLocation} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import axios from 'axios';
//components
import NormalBtn from "../../tools/normalBtn";
import NormalInput from "../../tools/normalInput";
import SearchBar from "../../tools/searchBar";
import SuccessMsg from "../../tools/successMsg";
import FailedMsg from "../../tools/failedMsg";
import Modal from "../../tools/modal";
import NoDataFigure from '../../tools/noDataFigure';
import CpWaOpratorCard from '../specialTools/cpWaOpratorCard';
import EditWaOpratorModal from './editWaOpratorModal';
import AuthContext from '../../../store/auth';
import jwtDecode from "jwt-decode";
import Language from '../../../store/language';
const CpWaOprators =(props)=>{

//------------------------------auth context------------------------------
const authCtx = useContext(AuthContext);
const decoded = jwtDecode(authCtx.token);
const langCtx = useContext(Language);
//------------------------------query params------------------------------

    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    //------------------------------states------------------------------
     const [firstName , setFirstName] = useState('');
     const [lastName , setLastName] = useState('');
     const [phoneNumberOne , setPhoneNumberOne] = useState('');

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

    function isNum(val){
        return !isNaN(val)
      }

    const showMore =()=>{
        setLimit(limit + 10);
       history.push(`oprators?limit=${limit}&page=waOprators`); 
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
            if (oprators[i].waOprator._id === e.currentTarget.value) {
                setEditId(oprators[i].waOprator);

            }
        }
        setOpratorIdToEdit(e.currentTarget.value);
        setShowEditModal(true);
        
    }
    const closeEditModal = () =>{
        setShowEditModal(false);
    }
    //------------------------------HTTP requests------------------------------
    const updateOpratorData = async (fn , ln , pnOne) =>{
        if(fn !=='' && ln !==''){
            if(pnOne !== ''){
                if(isNum(pnOne)){
                        const  dataToSend ={firstName:fn , lastName:ln , phoneNumber:pnOne , id:opratorIdToEdit};
                        try{
                            if(langCtx.language === 'persian'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateWaOprator`,
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
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateWaOpratorAr`,
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
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/updateWaOpratorEn`,
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

                if(phoneNumberOne !== ''){
                    if(isNum(phoneNumberOne)){
                            const  dataToSend ={author:decoded.id,firstName:firstName , lastName:lastName , phoneNumber:phoneNumberOne};
                            try{
                                if(langCtx.language === 'persian'){
                                    const response = await authCtx.jwtInst({
                                        method:"post",
                                        url:`${authCtx.defaultTargetApi}/oprators/newWaOprator`,
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
                                        url:`${authCtx.defaultTargetApi}/oprators/newWaOpratorAr`,
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
                                        url:`${authCtx.defaultTargetApi}/oprators/newWaOpratorEn`,
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
                                url:`${authCtx.defaultTargetApi}/oprators/getWaOprators`,
                                params:queryLimit,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setOprators([...data.rs]);
                            setOpratorsLength(data.ln);
                        }else if(langCtx.language === 'arabic'){
                            const response = await authCtx.jwtInst({
                                method:"get",
                                url:`${authCtx.defaultTargetApi}/oprators/getWaOpratorsAr`,
                                params:queryLimit,
                                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                            })
                            const data = await response.data; 
                            setOprators([...data.rs]);
                            setOpratorsLength(data.ln);
                        }else if(langCtx.language === 'english'){
                            const response = await authCtx.jwtInst({
                                method:"get",
                                url:`${authCtx.defaultTargetApi}/oprators/getWaOpratorsEn`,
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

                    const  dataToSend ={searching:searchOpratorsValue};
                        try{
                            if(langCtx.language === 'persian'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/waOpSearch`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSearchedOprators([...data]);
                                setSearchLoading(false);
                            }else if(langCtx.language === 'arabic'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/waOpSearchAr`,
                                    data:dataToSend,
                                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                                })
                                const data = await response.data; 
                                setSearchedOprators([...data]);
                                setSearchLoading(false);
                            }else if(langCtx.language === 'english'){
                                const response = await authCtx.jwtInst({
                                    method:"post",
                                    url:`${authCtx.defaultTargetApi}/oprators/waOpSearchEn`,
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
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteWaOprator`,
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
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteWaOpratorAr`,
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
                                    url:`${authCtx.defaultTargetApi}/oprators/deleteWaOpratorEn`,
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
            }, [limit , newOprator , opratorsLength  , langCtx.language])



    return(
        <Fragment>
            {/* Modal */}
                <Modal  delete={deleteOprator} closeModalFn={closeModalByDeleteBtn} showModal={showDeleteModal}></Modal>
                
                <EditWaOpratorModal updateOprator={updateOpratorData} opratorIdToEdit={editId} closeModal={closeEditModal} showModal={showEditModal}></EditWaOpratorModal>
               
            {/* toasts */}
            <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
            <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                        <div>
                            <Row dir="rtl">
                                {/* add new category section */}
                                <Col xs={12} md={12} lg={12}>
                                <div className={Style.formDiv}>
                                        <Row>
                                                <Col  xs={6} md={6} lg={4}>
                                                    <div className={Style.opratorInputsDiv}>
                                                        <h4>نام</h4>
                                                    <NormalInput onChange={getFirstName}  placeholder='...'></NormalInput>
                                                    </div>
                                                </Col>
                                                <Col  xs={6} md={6} lg={4}>
                                                    <div className={Style.opratorInputsDiv}>
                                                        <h4>نام خانوادگی</h4>
                                                    <NormalInput onChange={getLastName}  placeholder='...'></NormalInput>
                                                    </div>
                                                </Col>
                                                <Col  xs={6} md={6} lg={4}>
                                                    <div className={Style.opratorInputsDiv}>
                                                        <h4>شماره واتساپ</h4>
                                                    <NormalInput type='tel'  onChange={getPhoneNumberOne} placeholder='...'></NormalInput>
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
                                                    <CpWaOpratorCard  openEditModal={openEditModal} opratorToDelete={openModalByDeleteBtn}  data={oprators}></CpWaOpratorCard>
                                                    {opratorsLength > '20' ? 
                                                        <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                                            <button  onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                        </div>                                                  
                                                    :null}
                                                </div> 
                                            :searchOpratorsValue !== '' ?
                                                <div>
                                                    {searchedOprators.length !== 0 ?
                                                        <CpWaOpratorCard  openEditModal={openEditModal} opratorToDelete={openModalByDeleteBtn}  data={searchedOprators}></CpWaOpratorCard>
                                                    :searchedOprators.length === 0 ?
                                                        <div style={{marginTop:'68px'}}>
                                                            <NoDataFigure msg='اپراتور مورد نظر یافت نشد'></NoDataFigure>
                                                        </div>
                                                    :null}
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

        </Fragment>
    )
}
export default CpWaOprators;