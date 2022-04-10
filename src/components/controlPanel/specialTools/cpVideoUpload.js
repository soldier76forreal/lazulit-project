import { Fragment  , useState , useEffect , useRef , useContext} from 'react';
import { useHistory  , useLocation} from 'react-router-dom';
import Style from './cpVideoUpload.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row , ProgressBar , Spinner  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import FailedMsg from '../../tools/failedMsg';
import SuccessMsg from '../../tools/successMsg';
import axios from 'axios';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Delete from '@mui/icons-material/Delete';
import Loader from '../../tools/loader';
import Modal from '../../tools/modal';
import SearchBar from '../../tools/searchBar';
import NoDataFigure from '../../tools/noDataFigure';
import NormalHeader from '../../tools/normalHeader';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ModalShowVideo from '../../tools/modalShowVideo';
import AuthContext from '../../../store/auth';
import jwtDecode from "jwt-decode";
import EditFileNameModal from './editFileNameModal';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const CpVideoUpload = (props) =>{
    //------------------------------------------------------------------------success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');
    //------------------------------------------------------------------------fail toast states
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
    //------------------------------------------------------------------------dropzone states
    const [fileDropZone , setFileDropZone] = useState(false);
    //------------------------------------------------------------------------delete file
    const [fileIdToDelete , setFileIdToDelete] = useState([]);
    const [deleted , setDeleted] = useState('');
    //------------------------------------------------------------------------delete Modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    //------------------------------------------------------------------------loading states
    const [isLoading , setIsLoading] = useState(false);
    //------------------------------------------------------------------------file state states
    const [file , setFile] = useState([]);
    //------------------------------------------------------------------------searching
    const [searchLoading,setSearchLoading] = useState(false);
    const [searchInFilesResult,setSearchInFilesResult] = useState([]);
    const [searchInFilesText , setSearchInFilesText] = useState('');
    //------------------------------------------------------------------------file length
    const [fileLength , setFileLength] = useState('');
    //------------------------------------------------------------------------recived uploaded files from db
    const [recivedUploadedFile , setRecivedUploadedFile] = useState([]);
    //------------------------------------------------------------------------limit query params
    const [limitQuery , setLimitQuery] = useState(20);
    //------------------------------------------------------------------------delete Modal
    const [showVideoPlayModal , setShowVideoPlayModal] = useState(false);
    const [showVideoLinkModal , setShowVideoLinkModal] = useState('');
    //------------------------------------------------------------------------show edit modal
    const [showEditModal , setShowEditModal] = useState(false);
    //------------------------------------------------------------------------progress bar states
    let [currentProgress , setCurrentProgress] = useState('');
    const [uploadedData , setUploadedData] = useState([]);
    const [uploadingImage , setUploadingImage]  = useState('');
    let [progress , setProgress] = useState([{id:0 , progress:''} , {id:1, progress:''} , {id:2 , progress:''} , {id:3, progress:''} , {id:4 , progress:''} , {id:5 , progress:''}]);



    const [renameFileId , setRenameFileId] = useState(null);
    const [renameFileIdToEdit , setRenameFileIdToEdit] = useState('');
    const [fileUpdated , setFileUpdated] = useState(3);
    // -------------------------auth context -------------------------
    const authCtx = useContext(AuthContext);
    const decoded = jwtDecode(authCtx.token);

    // -------------------------function to make a normal button triger the file picker -------------------------
    const inputFile = useRef(null)
    const onButtonClick = (e) => {
        // `current` points to the mounted file input element
        inputFile.current.click();
     };

     //history and location
     const history = useHistory();
     const location = useLocation()
     const queryParams = new URLSearchParams(location.search);


        
     //-------------------------function to get files from file picker btn-------------------------
    const getFile =(e)=>{
        //check if files less that 6
        if(file.length <6){
             //check file format
            if(e.target.files[0].name.split(".").pop()==='mp4'){
                //check if file is repetitive
                if(file.some((el)=>{return el.name === e.target.files[0].name}) === true){
                    setFailedOpenToast(true);
                    setFailedMsgToast("ویدیو تکراری است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }else{
                    if(e.target.files[0].size < 204800 * 1024){
                        setFile([...file  , ...e.target.files]);
                    }else{
                        setFailedOpenToast(true);
                        setFailedMsgToast("حجم فایل باید کم تر از 200MB باشد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast("فرمت ویدیو مناسب نیست");
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
        e.preventDefault();
        let currentFileTemp = e.dataTransfer.files;
        //check if files less that 6
        if(file.length <6){
            //check file format
            if(currentFileTemp[0].name.split(".").pop()==='mp4'){
                //check if file is repetitive
                if(file.some((el)=>{return el.name === currentFileTemp[0].name}) === true){
                    setFailedOpenToast(true);
                    setFailedMsgToast("ویدیو تکراری است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }else{
                    if(currentFileTemp[0].size < 204800 * 1024){
                        setFile([...file  , ...currentFileTemp]);
                    }else{
                        setFailedOpenToast(true);
                        setFailedMsgToast("حجم فایل باید کم تر از 200MB باشد");
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
                }
            }else{
                setFailedOpenToast(true);
                setFailedMsgToast("فرمت ویدیو مناسب نیست");
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
                formData.append('author' , decoded.id);
                //indicate file
                setUploadingImage(i);
                try{
                    const response = await authCtx.jwtInst({
                        method:'post',
                        url:`${authCtx.defaultTargetApi}/upload/uploadVideo`,
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
                        setProgress([{id:0 , progress:''} , {id:1, progress:''} , {id:2 , progress:''} , {id:3, progress:''} , {id:4 , progress:''} , {id:5 , progress:''}]);
                    }
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast("خطایی رخ داده است");
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }
            }
    }
}
        //delete category 
        const deleteFile = async () =>{
            const  dataToSend ={fileId:fileIdToDelete};
                try{
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/upload/deleteVideo`,
                        data:dataToSend,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data;
                    setDeleted([...data]);
                    setSuccessOpenToast(true);
                    setSuccessMsgToast(data);
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                    setShowDeleteModal(false);
                }catch(error){
                    setFailedOpenToast(true);
                    setFailedMsgToast(error.response.data);
                    const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }
        }

        const renameTheFile = async(name) =>{
            const  dataToSend ={id:renameFileIdToEdit , newName:name};
            try{
                const response = await authCtx.jwtInst({
                    method:"post",
                    url:`${authCtx.defaultTargetApi}/upload/updateVideoName`,
                    data:dataToSend,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                setFileUpdated(Math.random());
                setSuccessOpenToast(true);
                setSuccessMsgToast("نام ویرایش شد");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                setShowEditModal(false);
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast("مشکلی پیش آمده، نام ویرایش نشد");
                const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
        }
        const openEditModal =(e)=>{
            for (var i=0; i < recivedUploadedFile.length; i++) {
                if (recivedUploadedFile[i]._id === e.currentTarget.value) {
                    setRenameFileId(recivedUploadedFile[i]);
                }
            }
            setRenameFileIdToEdit(e.currentTarget.value);
            setShowEditModal(true);
            
        }
    //open and close Modal of delete btn

    //-------------------------search file-------------------------
    // const searchData = async() =>{
    //     setIsLoading(true);
    //     try{
    //         const response = await axios({
    //             url:`http://localhost:3001/upload/getImagesSearch`,
    //             method:'get',
    //             params:{
    //                 search:queryParams.get('search'),
    //                 limit:queryParams.get('limit')
    //             }
    //                 })
    //         const data = await response.data;
    //         setRecivedUploadedFile([...data.rs]);
    //         setFileLength(data.ln);
    //         setIsLoading(false);
            
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     searchData();
    // }, [fileToSearch]);
    
    const openModalByDeleteBtn =(e)=>{
        setShowDeleteModal(true);
        setFileIdToDelete(e.currentTarget.value);
    }
    const closeModalByDeleteBtn =()=>{
        setShowDeleteModal(false);
    }
const showMore =()=>{
    let addUp = 10; 
    setLimitQuery(parseInt(limitQuery+addUp));
   history.push(`cpUploadCenter?limit=${limitQuery}`); 
}
const copyLink = (e) =>{
    navigator.clipboard.writeText(e.currentTarget.value);
    setSuccessOpenToast(true);
    setSuccessMsgToast("لینک ویدیو کپی شد");
    const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
}
useEffect(() => {
    showMore();
}, []);


//-------------------------get file-------------------------
const getFiles = async(e) =>{
    setIsLoading(true);
    try{
        const response = await authCtx.jwtInst({
            url:`${authCtx.defaultTargetApi}/upload/getVideo`,
            method:'get',
            params:{
                limit:queryParams.get('limit')
            }
                })
        const data = await response.data;
        setRecivedUploadedFile([...data.rs]);
        setFileLength(data.ln);
        setIsLoading(false);
    }catch(err){
        console.log(err);
    }
}
useEffect(() => {
    getFiles()
}, [limitQuery , deleted , uploadedData , fileUpdated ]);

//-------------------------play video-------------------------
const playVideo = (e) =>{
    setShowVideoPlayModal(true);
    setShowVideoLinkModal(e.currentTarget.value);
}

//-------------------------search file-------------------------

        //search category
        const searchInFiles = async () =>{

            const  dataToSend ={searching:searchInFilesText };
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/upload/searchInVideo`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setSearchInFilesResult([...data]);
                        setSearchLoading(false); 

                    }catch(error){
    
    
                    }
        }
        useEffect(() => {
            if(searchInFilesText !== ''){
                setSearchLoading(true); 
            }
            let categorySearchTimeOut = setTimeout(()=>{
                searchInFiles();
            }, 1000)
            return () => {
                clearTimeout(categorySearchTimeOut);
            }
        }, [searchInFilesText]);
        
        useEffect(() => {
            searchInFiles();
        }, [deleted , fileUpdated]);
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
            <EditFileNameModal renameTheFile={renameTheFile} fileIdToEdit={renameFileId} showModal={showEditModal} closeModal={()=>{setShowEditModal(false)}}></EditFileNameModal>
            <form onSubmit={e =>{e.preventDefault()}}  encType="multipart/form-data" method="post">
                {/* toasts */}
                    <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
                    <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>  
                {/* modal */}
                    <Modal delete={deleteFile} closeModalFn={closeModalByDeleteBtn} showModal={showDeleteModal}></Modal>    
                    <ModalShowVideo link={showVideoLinkModal} closeModalFn={()=>{setShowVideoPlayModal(false); setShowVideoLinkModal('')}} showModal={showVideoPlayModal}></ModalShowVideo>                
            <Row>
                <Col xs={12} md={12} lg={12}>
                        <div>
                            <div className={Style.headerDiv}>
                                <NormalHeader  fontFamily='Dana1' fontSize='22px' color='#354063'  header="آپلود ویدیو(mp4)"></NormalHeader>
                            </div>
                            {/* dropezone */}
                            <div className={fileDropZone ? `${Style.dropZone} ${Style.active}` : `${Style.dropZone}`}
                            onDragOver={e=>{setFileDropZone(true); e.preventDefault();}}
                            onDragLeave={e =>{setFileDropZone(false); e.preventDefault();}}
                            onDrop={e=>{dropZoneHandler(e)}}
                            >
                            ویدیو را اینجا رها کنید
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
                                <video className={Style.priviewImageStyle} height='300px' width='100%'>
                                    <source src={`${URL.createObjectURL(data)}`} type="video/mp4" />
                                </video>
                            </div>
                            {/* file name */}
                            <div className={Style.imageSub}>
                                <h4>{data.name.split("." ,1).pop()}</h4>
                            </div>
                            {/* format showing */}
                            {data.name.split(".").pop() === 'mp4'?
                            <div style={{backgroundColor:"rgb(224, 202, 0)"}} className={Style.formatDiv}>
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
                  <Row style={{marginTop:'70px'}}>
                      <SearchBar loading={searchLoading} onChange={(e)=>{setSearchInFilesText(e.target.value)}}></SearchBar>
                  </Row>
                    <div className={Style.cardSectionDiv}>
                        <Row>
                            {searchInFilesText === '' ?
                                <div className={Style.cardDiv}>
                                    <div className={Style.filesGrid}>
                                        {recivedUploadedFile.map(data=>{
                                            return(       
                                                <div key={data._id} className={Style.savedFileCard}>
                                                    <div className={Style.fileCardDiv}>
                                                        <h4>{data.metaData.originalname.split("." ,1).pop()}</h4>
                                                    </div>
                                                    <div className={Style.cardImageDiv}>
                                                        <video height='300px' width='100%'>
                                                            <source src={`${authCtx.defaultTargetApi}/uploads/${data.metaData.filename}`} type="video/mp4" />
                                                        </video>
                                                        <div className={Style.buttonOnTop}>
                                                            <button  onClick={openEditModal} value={data._id} title="تغییر نام" className={Style.renameBtnDiv}><DriveFileRenameOutlineIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></DriveFileRenameOutlineIcon></button>
                                                            <button onClick={copyLink} value={`${authCtx.defaultTargetApi}/uploads/${data.metaData.filename}`} title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                                            <button onClick={playVideo} value={`${authCtx.defaultTargetApi}/uploads/${data.metaData.filename}`} title="پخش" className={Style.cardPlayBtnDiv}><PlayArrowIcon title="پخش"  sx={{color: '#fff' ,iconHover:'#FFF' }}></PlayArrowIcon></button>
                                                            <button onClick={openModalByDeleteBtn} value={data._id} title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>\
                                                            <div className={Style.imageCardFormat}>
                                                                <h4>mp4</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                            )       
                                        })}                                       
                                    </div> 
                                    {fileLength > 20 ?                                 
                                        <Row>  
                                            <div  style={{width:'100%' ,marginTop:'30px' , textAlign:'center' , marginBottom:'30px'}}>
                                                <button  onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                            </div>
                                        </Row>
                                    :       
                                        null
                                    }
                                </div>
                                :    
                                <div className={Style.cardDiv}>
                                {searchInFilesText !== '' && searchInFilesResult.length === 0 ?
                                    <div style={{marginTop:'40px' , marginBottom:'40px'}}>
                                        <NoDataFigure msg='ویدیو مورد نظر یافت نشد'></NoDataFigure>
                                    </div>    
                                :
                                <div className={Style.filesGrid}>
                                        {searchInFilesResult.map(data=>{
                                                return(       
                                                <div key={data._id} className={Style.savedFileCard}>
                                                    <div className={Style.fileCardDiv}>
                                                        <h4>{data.metaData.originalname.split("." ,1).pop()}</h4>
                                                    </div>
                                                    <div className={Style.cardImageDiv}>
                                                        <video height='300px' width='100%'>
                                                            <source src={`${authCtx.defaultTargetApi}/uploads/${data.metaData.filename}`} type="video/mp4" />
                                                        </video>
                                                        <div className={Style.buttonOnTop}>
                                                             <button  onClick={openEditModal} value={data._id} title="تغییر نام" className={Style.renameBtnDiv}><DriveFileRenameOutlineIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></DriveFileRenameOutlineIcon></button>
                                                            <button onClick={copyLink} value={`${authCtx.defaultTargetApi}/uploads/${data.metaData.filename}`} title="کپی کرن لینک" className={Style.cardCopyLinkBtnDiv}><ContentPasteIcon title="کپی کرن لینک" sx={{color: '#fff' ,iconHover:'#FFF' }}></ContentPasteIcon></button>
                                                            <button onClick={openModalByDeleteBtn} value={data._id} title="پخش"  className={Style.cardPlayBtnDiv}><PlayArrowIcon title="پخش"  sx={{color: '#fff' ,iconHover:'#FFF' }}></PlayArrowIcon></button>
                                                            <button onClick={openModalByDeleteBtn} value={data._id} title="حذف کردن"  className={Style.cardDeleteBtnDiv}><Delete title="حذف کردن"  sx={{color: '#fff' ,iconHover:'#FFF' }}></Delete></button>
                                                            <div className={Style.imageCardFormat}>
                                                                <h4>mp4</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>  
                                                )       
                                            })                             
                                        }
                                    </div>
                                    }
                                </div>
                            
                            }

                        </Row>
                    </div>
                    <Row>
                         {isLoading === true?<div style={{textAlign:'center' , marginTop:'50px' , width:'100%'}}><Loader border='7px solid #cecece' borderTop='7px solid #1043A9' width='40' height='40' ></Loader></div>:''}
                    </Row>
        </Fragment>
    )
}
export default CpVideoUpload;