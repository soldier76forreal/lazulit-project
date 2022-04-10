import Style from "./loader.module.css";

const Loader = (props)=>{
    const CustomStyle = {
        border:`${props.border}`,
        borderTop:`${props.borderTop}`,
        width: `${props.width}`,
        height:`${props.height}`,
        marginBottom:`${props.marginBottom}`,
    }
    return(
    
        <div style={CustomStyle} className={Style.loader}></div>
    )    
}
export default Loader;