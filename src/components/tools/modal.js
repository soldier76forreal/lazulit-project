import Style from "./modal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import NormalBtnRed from "./normalBtnRed";
import SelectiveOutLineBtn from "./selectiveOutLineBtn";

const ModalPortal =(props)=>{
    return(
        <Fragment>

                    <div className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                        <div onClick={props.closeModalFn}  className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            <div className={Style.modalSymbol}>
                                <Delete sx={{ margin:'0px auto 0px auto' , fontSize: 170,color: '#1043A9' ,iconHover:'#3e76e6' }}></Delete>
                            </div>
                            <div className={Style.msg}>
                                <h3>مطمئن هستید؟</h3>
                            </div>
                            <div className={Style.btnsDiv}>
                                <div className={Style.btnDiv}>
                                     <SelectiveOutLineBtn onClick={props.closeModalFn} btnName='انصراف' isActive={false}   paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                </div>
                                <div className={Style.btnDiv2}>
                                    <NormalBtnRed onClick={props.delete}  btnName={'بله'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'43px'} paddingLeft={'43px'} backgroundColor={'#FD7474'} color={'#FFFFFF'} ></NormalBtnRed>
                                </div>

                            </div>
                        </div>
                    </div>
                
                 
        </Fragment>
    )
}
const Modal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <ModalPortal delete={props.delete} closeModalFn={props.closeModalFn}  showModal={props.showModal} ></ModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default Modal;
