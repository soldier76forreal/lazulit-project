//modules
import { Fragment } from "react";
import Style from './normalBtnRed.module.css';

//required tag
{/* <NormalBtn onClick={sendNewCategory} btnName='ذخیره' paddingTop={'7px'} paddingButtom={'7px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn> */}




const NormalBtnRed =(props)=>{
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
export default NormalBtnRed;