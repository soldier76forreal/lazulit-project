import Style from "./editUserModal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment , useState , useEffect , useRef , useContext } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NormalBtnRed from "../../tools/normalBtnRed";
import SelectiveOutLineBtn from "../../tools/selectiveOutLineBtn";
import NormalBtn from "../../tools/normalBtn";
import NormalInput from "../../tools/normalInput";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import NoDataFigure from "../../tools/noDataFigure";
import prof from '../../../assets/prof.jpg';
import {Navbar  , Nav ,NavDropdown ,Form , ProgressBar ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessMsg from "../../tools/successMsg";
import FailedMsg from "../../tools/failedMsg";
import AuthContext from "../../../store/auth";


const EditUserModalPortal =(props)=>{
    const uploadInputRef = useRef();
    const [titleTemp , setTitleTemp] = useState('');
    const [featureArray , setFeatureArray] = useState([]);
    const [featureListName , setFeatureListName] = useState('');
    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');
    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

    const [file , setFile] = useState({});
    const [progressBar,setProgressBar] = useState('');

    const authCtx = useContext(AuthContext);
    
    const getFile =(e)=>{
             //check file format
            if(e.target.files[0].name.split(".").pop()==='jpg'){
                if(e.target.files[0].size < 1024 * 1024){
                    setFile(e.target.files);
                }else{
                    setFailedOpenToast(true);
                    setFailedMsgToast("حجم فایل باید کم تر از 1MB باشد");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    setFile({});
                    uploadInputRef.current.value = "";
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast("فرمت تصویر مناسب نیست");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                setFile({});
                uploadInputRef.current.value = "";
            }

    }


const addToArr = (e) =>{
    if(titleTemp !== ''){
        featureArray.push({title:titleTemp , content:''});
        setTitleTemp('');
    }
} 

const deleteBtn = (e) =>{
    let tempArray = [...featureArray];
    tempArray.splice(e.currentTarget.value, 1);
    setFeatureArray([...tempArray]);
}



    //-------------------------send data to API-------------------------
    const sendImagesData = async(e) =>{

        e.preventDefault();
        //check if there is any file
        if(Object.keys(file).length === 0){
            setFailedOpenToast(true);
            setFailedMsgToast("فایلی جهت آپلود انتخاب نکردید");
            const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
        }else{
                const formData = new FormData();
                
                formData.append('images' , file[0]);
                formData.append('id' , props.editModalId);
                try{
                    const response = await authCtx.jwtInst({
                        method:'post',
                        url:`${authCtx.defaultTargetApi}/users/uploadUserImage`,
                        data:formData ,
                        //progress bar precentage
                        onUploadProgress: data => {                           
                            setProgressBar(Math.round((100 * data.loaded) / data.total));
                          },
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    const data = await response.data;
                    //check if upload task finished
                        //success msg
                        setSuccessOpenToast(true);
                        setSuccessMsgToast("آپلود شد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                        props.setListRefresh(Math.random());
                        const closingSuccessMsgTimeOutModal = setTimeout(()=>{    
                            props.closeModal();
                        }, 300);
                        const closingSuccessMsgTimeOutModal2 = setTimeout(()=>{
                            setFile({});
                            uploadInputRef.current.value = "";
                            setProgressBar('');
                        }, 500);

                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }
            }
    }

    return(
        
        <Fragment>
                {/* toasts */}
                <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
                <div dir="rtl" className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModal} className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            {file[0] !== undefined ?
                                <div  className={Style.profDiv}>
                                    <img className={Style.profImg} src={`${URL.createObjectURL(file[0])}`}></img>
                                </div>
                            :
                                <div  className={Style.profDiv}>
                                    {props.imageName !== ''?
                                    <img className={Style.profImg} src={`${authCtx.defaultTargetApi}/uploads/${props.imageName}`}></img>
                                    :
                                    <img className={Style.profImg} src={`${prof}`}></img>
                                    }
                                </div>
                            }
                            <div className={Style.inputUploadDiv}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control ref={uploadInputRef} type="file" onChange={getFile} />
                                </Form.Group>
                                <ProgressBar style={{background:"#E6EDFD" , height:'20px'}} now={progressBar} label={progressBar} /> 

                            </div>
                                <div className={Style.btnsDiv}>

                                    <div className={Style.btnDiv}>
                                        <NormalBtn onClick={sendImagesData}  btnName={'ذخیره'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

                                    </div>
                                    <div className={Style.btnDiv2}>
                                        <SelectiveOutLineBtn  onClick={props.closeModal} btnName='انصراف' isActive={false}   paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>

                                    </div>
                                </div>
                        </div>                         
                </div>
        </Fragment>
    )
}
const EditUserModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <EditUserModalPortal setListRefresh={props.setListRefresh} imageName={props.imageName} editModalId={props.editModalId}  closeModal={props.closeModal}  showModal={props.showModal}></EditUserModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default EditUserModal;
