import Style from "./modalShowVideo.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";
import NormalBtnRed from "./normalBtnRed";
import SelectiveOutLineBtn from "./selectiveOutLineBtn";
import ClearIcon from '@mui/icons-material/Clear';
const ModalShowVideoPortal =(props)=>{

    return(
        <Fragment>
            {props.link !== '' ?
                    <div className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                        <div onClick={props.closeModalFn}  className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' >
                            <div className={Style.dismissBtn}><ClearIcon onClick={props.closeModalFn} sx={{ margin:'0px auto 0px auto' , fontSize: 60,color: '#fff' }}></ClearIcon></div>
                        </div>
                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                            <video controls className={Style.priviewImageStyle} height='300px' width='100%'>
                                <source src={`${props.link}`} type="video/mp4"/>
                            </video>
                        </div>
                    </div>
            :null}
                 
        </Fragment>
    )
}
const ModalShowVideo = (props)=>{
    // closeModalFn={props.closeModalFn}  showModal={props.showModal}
    return(
        <Fragment>
            {ReactDom.createPortal(
                <ModalShowVideoPortal link={props.link} closeModalFn={props.closeModalFn}  showModal={props.showModal}></ModalShowVideoPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default ModalShowVideo;
