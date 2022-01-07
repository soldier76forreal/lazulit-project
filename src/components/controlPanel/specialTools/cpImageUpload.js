import { Fragment  , useState , useEffect , useRef} from 'react';
import Style from './cpImageUpload.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from "react-drag-drop-files";
import {Pagination,Navbar,Row , ProgressBar  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import PlaceHolderImg from '../../../assets/a.jpg'
import PlaceHolderImg2 from '../../../assets/pl4.jpg'

import PlaceHolderImg3 from '../../../assets/344.jpg'

import FailedMsg from '../../tools/failedMsg';
import SuccessMsg from '../../tools/successMsg';
import axios from 'axios';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import NormalBtn from '../../tools/normalBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Delete from '@mui/icons-material/Delete';

const CpImageUpload = (props) =>{
    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //fail toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');

    //dropzone states
    const [fileDropZone , setFileDropZone] = useState(false);

    //file state states
    const [file , setFile] = useState([]);

    //progress bar states
    let [currentProgress , setCurrentProgress] = useState('');
    const [uploadedData , setUploadedData] = useState([]);
    const [uploadingImage , setUploadingImage]  = useState('');
    let [progress , setProgress] = useState([{id:0 , progress:''} , {id:1, progress:''} , {id:2 , progress:''} , {id:3, progress:''} , {id:4 , progress:''} , {id:5 , progress:''}]);

    // -------------------------function to make a normal button triger the file picker -------------------------
    const inputFile = useRef(null)
    const onButtonClick = (e) => {
        // `current` points to the mounted file input element
        inputFile.current.click();
     };

    
     //-------------------------function to get files from file picker btn-------------------------
    const getFile =(e)=>{
        //check if files less that 6
        if(file.length <6){
             //check file format
            if(e.target.files[0].name.split(".").pop()==='jpg' || e.target.files[0].name.split(".").pop()==='png' || e.target.files[0].name.split(".").pop()==='jpeg'){
                //check if file is repetitive
                if(file.some((el)=>{return el.name === e.target.files[0].name}) === true){
                    setFailedOpenToast(true);
                    setFailedMsgToast("تصویر تکراری است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }else{
                    if(e.target.files[0].size < 1000 * 1000){
                        setFile([...file  , ...e.target.files]);
                    }else{
                        setFailedOpenToast(true);
                        setFailedMsgToast("حجم فایل باید کم تر از 1MB باشد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast("فرمت تصویر مناسب نیست");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
        }else{
                setFailedOpenToast(true);
                setFailedMsgToast("تعداد آپلود هم زمان بیش از حد می باشد.");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
        }
    }


     //-------------------------function to get files from dropzone-------------------------
    const dropZoneHandler =(e)=>{
        if(file.length <6){
            e.preventDefault();
            if(e.dataTransfer.files[0].name.split(".").pop()==='jpg' || e.dataTransfer.files[0].name.split(".").pop()==='png' || e.dataTransfer.files[0].name.split(".").pop()==='jpeg'){
  
                if(file.some((el)=>{return el.name === e.dataTransfer.files[0].name}) === true){
                    setFailedOpenToast(true);
                    setFailedMsgToast("تصویر تکراری است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }else{
                    setFile([...file  , ...e.dataTransfer.files[0]]);
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast("فرمت تصویر مناسب نیست");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
        }else{
                setFailedOpenToast(true);
                setFailedMsgToast("تعداد آپلود هم زمان بیش از حد می باشد.");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
        }
    }


    //-------------------------send data to API-------------------------
    const sendImagesData = async(e) =>{
        e.preventDefault();
        //check if there is any file
        if(file.length === 0){
            setFailedOpenToast(true);
            setFailedMsgToast("فایلی جهت آپلود انتخاب نکردید");
            const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
        }else{
            //send file by one by one
            for(var i = 0 ; file.length>i ; i++){
                const formData = new FormData();
                formData.append('images' , file[i]);
                //indicate file
                setUploadingImage(i);
                try{
                    const response = await axios({
                        method:'post',
                        url:'http://localhost:3001/upload/uploadImage',
                        data:formData ,
                        //progress bar precentage
                        onUploadProgress: data => {                           
                            setCurrentProgress(Math.round((100 * data.loaded) / data.total));
                          },
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    const data = await response.data;
                    uploadedData.push(data);
                    //check if upload task finished
                    if(file.length !== 0 && uploadedData.length === file.length){
                        //success msg
                        setSuccessOpenToast(true);
                        setSuccessMsgToast("آپلود شد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                        //reset values for next uploads
                        setFile([...[]]);
                        setCurrentProgress('');
                        setUploadingImage('');
                        setUploadedData([...[]]);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }
            }
    }
}

//-------------------------delete element from array of files-------------------------
    const deleteImageFromArrayFile = (e) =>{
        let index = e.currentTarget.value;
        const temp = [...file];
        // removing the element using splice
        temp.splice(index, 1);
        // updating the list
        setFile(temp);

    }

    //add precentage for every file in a array
    useEffect(() => {
        var tempProgressArray = [...progress];
        var tempElement = {...progress[uploadingImage]}
        tempElement.progress = currentProgress;
        tempProgressArray[uploadingImage] = tempElement;
        setProgress(tempProgressArray);
    }, [currentProgress]);
    useEffect(() => {
    }, [file]);
    return(
        <Fragment>
            <form onSubmit={e =>{e.preventDefault()}}  encType="multipart/form-data" method="post">
                {/* toasts */}
                    <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                    <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>            
            <Row>
                <Col xs={12} md={12} lg={12}>
                        <div>
                            {/* dropezone */}
                            <div className={fileDropZone ? `${Style.dropZone} ${Style.active}` : `${Style.dropZone}`}
                            onDragOver={e=>{setFileDropZone(true); e.preventDefault();}}
                            onDragLeave={e =>{setFileDropZone(false); e.preventDefault();}}
                            onDrop={e=>{dropZoneHandler(e)}}
                            >
                            تصویر را اینجا رها کنید
                            </div>
                            {/* file input button */}
                            <div className={Style.uploadBtnDiv}>
                                <input type='file' id='file' onChange={getFile} ref={inputFile} style={{display: 'none'}}/>      
                                <button className={Style.buttonClick} onClick={onButtonClick}>انتخاب کنید...</button>
                            </div>
                        </div>
                </Col>
            </Row>
            <Row>
                {/* mapping selected file */}
                {file.map((data , i) =>{
                    return(
                        <Col key={i} xs={4} md={2} lg={2}>
                        <div  className={Style.priviewImageDiv}>
                            <div className={Style.imageDiv}>
                                {/* delete file */}
                                <button disabled={uploadingImage === '' ? false : true} value={i} onClick={deleteImageFromArrayFile} className={Style.deleteBtnDiv}>
                                     <FontAwesomeIcon  style={{fontSize:'18px'  ,color:'#FFF'}}  icon='times'></FontAwesomeIcon>
                                </button>
                                {/* card image */}
                                <img className={Style.priviewImageStyle} src={`${URL.createObjectURL(data)}`}></img>
                            </div>
                            {/* file name */}
                            <div className={Style.imageSub}>
                                <h4>{data.name.split("." ,1).pop()}</h4>
                            </div>
                            {/* format showing */}
                            {data.name.split(".").pop() === 'jpg'?
                            <div style={{backgroundColor:"rgb(224, 202, 0)"}} className={Style.formatDiv}>
                                    {data.name.split(".").pop()}
                            </div>
                            : data.name.split(".").pop() === 'png'?
                            <div style={{backgroundColor:"#00f58f"}} className={Style.formatDiv}>
                                    {data.name.split(".").pop()}
                            </div>
                            :data.name.split(".").pop() === 'jpeg'?
                            <div style={{backgroundColor:"#fc4c4c"}} className={Style.formatDiv}>
                            {data.name.split(".").pop()}
                            </div>
                            :
                            <div style={{backgroundColor:"#6b95e9"}} className={Style.formatDiv}>
                            {data.name.split(".").pop()}
                            </div>
                             }

                            <div dir='ltr' className={Style.progressBarDiv}>
                                    <ProgressBar style={{background:"#E6EDFD" , height:'20px'}} now={progress[i].progress} label={progress[i].progress} /> 
                            </div>
                        </div>
                    </Col>
                    )
                })}
            </Row>
                <div  className={Style.uploadDiv}>
                    <button disabled={uploadingImage === '' ? false : true} onClick={sendImagesData}  className={file.length === 0 ?`${Style.uploadBtn} ${Style.notActive}` : `${Style.uploadBtn}`}>آپلود</button>
                </div>
            </form>
                <div className={Style.cardSectionDiv}>
                    <Row>
                        <Col style={{padding:'0px 8px 0px 8px'}} xs={6} md={4} lg={3}>
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg2}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg3}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                        </Col>
                        <Col style={{padding:'0px 8px 0px 8px'}} xs={6} md={4} lg={3}>
                        <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg3}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg2}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>  
                        </Col>
                        <Col style={{padding:'0px 8px 0px 8px'}}  xs={6} md={4} lg={3}>
                        <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg2}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>      
                            <div className={Style.savedFileCard}>
                                <div className={Style.fileCardDiv}>
                                    <h4>file Name</h4>
                                </div>
                                <div className={Style.cardImageDiv}>
                                    <img src={`${PlaceHolderImg3}`}></img>
                                    <div className={Style.buttonOnTop}>
                                        <button title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                        <button title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                        <div className={Style.imageCardFormat}>
                                        <h4>jpg</h4>
                                    </div>
                                    </div>
                                </div>
                            </div>  
                        </Col>
                        <Col style={{padding:'0px 8px 0px 8px'}}  xs={6} md={4} lg={3}>
                            
                        </Col>
                    </Row>
                </div>
        </Fragment>
    )
}
export default CpImageUpload;