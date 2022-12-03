import Style from "./editFileNameModal.module.css";
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
const EditFileTitleModalPortal =(props)=>{
    const [title , setTitle] = useState('');
    useEffect(() => {
        if(props.showModal ===true){
            setTitle(props.title);
        }
    }, [props.showModal]);


    return(
        
        <Fragment>
                    <div dir="rtl" className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModal} className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            <div className={Style.modalSymbol}>
                                <EditIcon sx={{ margin:'0px auto 0px auto' , fontSize: 100,color: '#1043A9' ,iconHover:'#3e76e6' }}></EditIcon>
                            </div>
                        
                            <div className={Style.msg}>
                                    <div style={{marginTop:'0px'}} className={Style.inputDiv}>
                                        <h4>نام</h4>
                                        <NormalInput onChnge={(e)=>{setTitle(e.target.value)}} value={title}></NormalInput>
                                    </div>
                        
                            </div>
                              
                            <div className={Style.btnsDiv}>
                                <div className={Style.btnDiv}>
                                    <NormalBtn  onClick={()=>{props.changeTitle(title)}} btnName={'ذخیره'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

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
const EditFileTitleModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <EditFileTitleModalPortal title={props.title} changeTitle={props.changeTitle} opratorIdToEdit={props.fileIdToEdit} closeModal={props.closeModal}  showModal={props.showModal} ></EditFileTitleModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default EditFileTitleModal;
