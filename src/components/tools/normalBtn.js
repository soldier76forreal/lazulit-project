//modules
import { Fragment } from "react";
import Style from './normalBtn.module.css';

//required tag
{/* <NormalBtn fontSize={'22px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn> */}




const NormalBtn =(props)=>{
    //style
    const CustomStyle = {
        fontSize:`${props.fontSize}`,
        color:`${props.color}`,
        backgroundColor: `${props.backgroundColor}`,
        paddingLeft:`${props.paddingLeft}`,
        paddingRight:`${props.paddingRight}`,
        paddingTop:`${props.paddingTop}`,
        paddingButton:`${props.paddingButton}`,
    }
    return(
        <Fragment>
            <button className={Style.btn} value={props.value} id={props.id} onClick={props.onClick}  style={CustomStyle} >{props.btnName}</button>
        </Fragment>
    )
}
export default NormalBtn;