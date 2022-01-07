import './successMsg.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';
import ReactDom from 'react-dom';
const SuccessMsgPortal =(props)=>{
    // const closeSuccessMsg = () =>{
    //     setSuccessOpenToast(false);
    // }
    //             setSuccessOpenToast(true);
    //             setSuccessMsgToast(data.msg);
    //             const closingSuccessMsgTimeOut = setTimeout(closeSuccessMsg, 3000);
    const cssClass = ['successMsg' , props.openMsg === true? 'successMsgAnimateIn' : 'successMsgAnimateOut'];
    return(
        <Fragment>
                <div dir='rtl' className={cssClass.join(' ')}>
                    <div className='msgDiv'> 
                        <div className='iconMsg'>
                            <FontAwesomeIcon style={{fontSize:'35px'}} color='#005229' icon='check-circle'></FontAwesomeIcon>
                        </div>
                        <div className='msgTextDiv'>
                            <h4>{props.msg}</h4>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}
const SuccessMsg = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <SuccessMsgPortal openMsg={props.openMsg} msg={props.msg} ></SuccessMsgPortal>
            ,
            document.getElementById('toast_msg')
            
            )}

        </Fragment>
    );
}
export default SuccessMsg;
