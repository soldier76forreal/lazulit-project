//modules
import Style from './normalInput.module.css';


const NormalInput = (props) =>{
    return(
        <div className={Style.inputDiv}>
            <input id='inp' placeholder={props.placeholder} className={Style.input}></input>
        </div>
    )
}
export default NormalInput;