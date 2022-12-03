import Style from "./photoSelectFromDataBase.module.css";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row , ProgressBar , Spinner  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';

const PhotoSelectFromDataBasePortal =(props)=>{


    return(
        
        <Fragment>
                    <div dir="rtl" className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModal} className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            <Row>
                                <Col xs={3} md={3} lg={3}></Col>
                                <Col xs={9} md={9} lg={9}></Col>
                            </Row>
                            {/* <div className={Style.btnsDiv}>
                                <div className={Style.btnDiv}>
                                    <NormalBtn   btnName={'ذخیره'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

                                </div>
                                <div className={Style.btnDiv2}>
                                    <SelectiveOutLineBtn   btnName='انصراف' isActive={false}   paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>

                                </div>

                            </div> */}
                        </div>        
                                  
                </div>
        </Fragment>
    )
}
const PhotoSelectFromDataBase = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <PhotoSelectFromDataBasePortal showModal={props.showModal} ></PhotoSelectFromDataBasePortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default PhotoSelectFromDataBase;
