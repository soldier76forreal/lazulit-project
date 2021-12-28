//modules
import { Fragment } from "react";
import Style from './btnNewThingWithIcon.module.css';
import AddIcon from '@mui/icons-material/Add';
//required tag
{/* <BtnWithIcon btnName='ذخیره' paddingTop={'6px'} paddingButtom={'6px'} fontSize={'22px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></BtnWithIcon> */}




const BtnNewThingWithIcon =(props)=>{
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
            <button className={Style.btn} value={props.value} id={props.id} onClick={props.onClick}  style={CustomStyle} ><div className={Style.innerIcon}><AddIcon sx={{ fontSize: 32,color: '#FFF' ,iconHover:'#FFF' }}></AddIcon></div>{props.btnName}</button>
        </Fragment>
    )
}
export default BtnNewThingWithIcon;