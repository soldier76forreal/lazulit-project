//modules
import Style from './normalInput.module.css';


{/* <NormalInput onChange={saveCategory} placeholder='تگ جدید را وارد کنید...'></NormalInput> */}

const NormalInput = (props) =>{
    return(
        <div className={Style.inputDiv}>
            <input required={true} defaultValue={props.defaultValue} value={props.value} type={props.type} onChange={props.onChange} id={props.id} placeholder={props.placeholder} className={Style.input}></input>
        </div>
    )
}
export default NormalInput;