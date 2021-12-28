import { Fragment } from "react"




const NormalHeader = (props) =>{
    const headeStyle ={
        fontSize:`${props.fontSize}`,
        color:`${props.color}`,
        fontFamily:`${props.fontFamily}`,

    }
    return(
        <Fragment>
            <h4 style={headeStyle}>{props.header}</h4>
        </Fragment>
    )
}

export default NormalHeader;