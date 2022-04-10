import Style from "./editWaOpratorModal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment , useState , useEffect } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NormalBtnRed from "../../tools/normalBtnRed";
import SelectiveOutLineBtn from "../../tools/selectiveOutLineBtn";
import NormalBtn from "../../tools/normalBtn";
import NormalInput from "../../tools/normalInput";
import axios from "axios";
const EditWaOpratorModalPortal =(props)=>{
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [phoneNumberOne , setPhoneNumberOne] = useState('');

   const getFirstName = (e) =>{
    setFirstName(e.target.value);
   }
   const getLastName = (e) =>{
    setLastName(e.target.value);

   }
   const getPhoneNumberOne = (e) =>{
    setPhoneNumberOne(e.target.value);
   }
   useEffect(() => {
       if(props.showModal ===true){
        setFirstName(props.opratorIdToEdit.firstName);
        setLastName(props.opratorIdToEdit.lastName);
        setPhoneNumberOne(props.opratorIdToEdit.phoneNumber);

       }
   }, [props.showModal]);

    return(
        
        <Fragment>
                    <div dir="rtl" className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModal} className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            <div className={Style.modalSymbol}>
                                <EditIcon sx={{ margin:'0px auto 0px auto' , fontSize: 130,color: '#1043A9' ,iconHover:'#3e76e6' }}></EditIcon>
                            </div>
                        
                            <div className={Style.msg}>
                                    <div style={{marginTop:'0px'}} className={Style.inputDiv}>
                                        <h4>نام</h4>
                                        <NormalInput onChange={getFirstName} value={firstName}></NormalInput>
                                    </div>
                        
                                    <div className={Style.inputDiv}>
                                        <h4>نام خانوادگی</h4>
                                        <NormalInput onChange={getLastName} value={lastName}></NormalInput>
                                    </div>

                                    <div className={Style.inputDiv}>
                                        <h4>شماره تماس اول</h4>
                                        <NormalInput onChange={getPhoneNumberOne} value={phoneNumberOne}  type='tel'></NormalInput>
                                    </div>
                            
                            </div>
                              
                            <div className={Style.btnsDiv}>
                                <div className={Style.btnDiv}>
                                    <NormalBtn onClick={()=>{props.updateOprator(firstName , lastName , phoneNumberOne )}}  btnName={'ذخیره'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

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
const EditWaOpratorModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <EditWaOpratorModalPortal updateOprator={props.updateOprator} opratorIdToEdit={props.opratorIdToEdit} closeModal={props.closeModal}  showModal={props.showModal} ></EditWaOpratorModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default EditWaOpratorModal;
