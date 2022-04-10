import Style from "./newFeatureListModal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment , useState , useEffect } from 'react';
import ReactDom from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NormalBtnRed from "../../tools/normalBtnRed";
import SelectiveOutLineBtn from "../../tools/selectiveOutLineBtn";
import NormalBtn from "../../tools/normalBtn";
import NormalInput from "../../tools/normalInput";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import NoDataFigure from "../../tools/noDataFigure";


const NewFeatureListModalPortal =(props)=>{
    const [titleTemp , setTitleTemp] = useState('');
    const [featureArray , setFeatureArray] = useState([]);
    const [featureListName , setFeatureListName] = useState('');


    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');
    //failed toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
//     const [phoneNumberTwo , setPhoneNumberTwo] = useState('');

//    const getFirstName = (e) =>{
//     setFirstName(e.target.value);
//    }
//    const getLastName = (e) =>{
//     setLastName(e.target.value);

//    }
//    const getPhoneNumberOne = (e) =>{
//     setPhoneNumberOne(e.target.value);
//    }
//    const getPhoneNumberTwo = (e) =>{
//     setPhoneNumberTwo(e.target.value);


       
//    }

//    useEffect(() => {
//        if(props.showModal ===true){
//         setFirstName(props.opratorIdToEdit.firstName);
//         setLastName(props.opratorIdToEdit.lastName);
//         setPhoneNumberOne(props.opratorIdToEdit.phoneNumbers[0]);
//         setPhoneNumberTwo(props.opratorIdToEdit.phoneNumbers[1]);

//        }
//    }, [props.showModal]);


const addToArr = (e) =>{
    if(titleTemp !== ''){
        featureArray.push({title:titleTemp , content:''});
        setTitleTemp('');
    }
} 

const deleteBtn = (e) =>{
    let tempArray = [...featureArray];
    tempArray.splice(e.currentTarget.value, 1);
    setFeatureArray([...tempArray]);
    console.log(featureArray);
}




    return(
        
        <Fragment>
                    <div dir="rtl" className={props.showModal === true ? `${Style.modalDiv} ${Style.fadeIn}` : props.showModal === false ? `${Style.modalDiv} ${Style.fadeOut}` : null}>
                    <div onClick={props.closeModal} className={props.showModal === true ? `${Style.backDrop} ${Style.fadeIn}` : props.showModal === false ? `${Style.backDrop} ${Style.fadeOut}` : null} dir='rtl' ></div>

                        <div className={props.showModal === true ? `${Style.modalBoarder} ${Style.scaleIn}` : props.showModal === false ? `${Style.modalBoarder} ${Style.scaleOut}` : null} >
                             <div className={Style.modalSymbol1}>
                                 <h4>نام</h4>
                                <div className={Style.featureName}>
                                    <NormalInput onChange={(e)=>{setFeatureListName(e.target.value)}}></NormalInput>
                                </div>
                            </div>
                            <div className={Style.modalSymbol}>
                                 <h4>عنوان را وارد کنید...</h4>
                                <div className={Style.featureTitle}>
                                    <NormalInput onChange={(e)=>{setTitleTemp(e.target.value)}}></NormalInput>
                                </div>
                                <div className={Style.addBtnDiv}>
                                    <button onClick={addToArr} className={Style.addBtn}><AddIcon sx={{ fontSize: 32,color: '#FFF' ,iconHover:'#FFF' }}></AddIcon></button>
                                </div>
                            </div>
                        
                            <div className={Style.msg}>
                                {featureArray.length === 0 ?
                                    <div style={{marginTop:'60px'}}>
                                        <NoDataFigure msg='لیست خالی است!'></NoDataFigure>
                                    </div>
                                  :                  
                                featureArray.map((dt , i)=>{
                                    return(
                                    <div  className={Style.inputDiv}>
                                        <h4>{dt.title}</h4>

                                        <div style={{display:'flex' }}>
                                            <NormalInput id={i} onChange={(e)=>{
                                                let newArr = [...featureArray];
                                                newArr[i] = {title:newArr[i].title,content:e.target.value};
                                                setFeatureArray(newArr);
                                                console.log(featureArray);
                                            }} placeHolder='...'></NormalInput>
                                            <div style={{marginTop:'4px'}}>
                                                <button value={i} onClick={deleteBtn} style={{background:'none' , border:'none'}}><DeleteIcon  style={{cursor: 'pointer'}} sx={{ fontSize: 32,color: '#ff3333' ,iconHover:'#FFF' }}></DeleteIcon></button>
                                            </div>

                                        </div>

                                    </div>
                                    )
                                })}
                            </div>
                              
                            <div className={Style.btnsDiv}>
                                <div className={Style.btnDiv}>
                                    <NormalBtn onClick={()=>{props.saveList(featureListName , featureArray); setFeatureArray([...[]]); setFeatureListName('')}}  btnName={'ذخیره'} paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'25px'} paddingLeft={'25px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>

                                </div>
                                <div className={Style.btnDiv2}>
                                    <SelectiveOutLineBtn  onClick={props.closeModal} btnName='انصراف' isActive={false}   paddingTop={'5px'} paddingButtom={'5px'} fontSize={'20px'} paddingRight={'20px'} paddingLeft={'20px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>

                                </div>

                            </div>
                        </div>                         
                </div>
        </Fragment>
    )
}
const NewFeatureListModal = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
                <NewFeatureListModalPortal saveList={props.saveList}  closeModal={props.closeModal}  showModal={props.showModal}></NewFeatureListModalPortal>
            ,
            document.getElementById('modal')
            
            )}

        </Fragment>
    );
}
export default NewFeatureListModal;
