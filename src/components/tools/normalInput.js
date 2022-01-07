//modules
import Style from './normalInput.module.css';


{/* <NormalInput onChange={saveCategory} placeholder='تگ جدید را وارد کنید...'></NormalInput> */}

const NormalInput = (props) =>{
    return(
        <div className={Style.inputDiv}>
            <input onChange={props.onChange} id='inp' placeholder={props.placeholder} className={Style.input}></input>
        </div>
    )
}
export default NormalInput;