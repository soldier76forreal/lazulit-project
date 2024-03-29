import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentItself.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import PlaceHolderImg from '../../assets/a.jpg'
import AuthContext from '../../store/auth';
import { Fragment, useContext , useState } from 'react';
import Axios  from 'axios';
import Cookies from 'js-cookie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextAvatar from './textAvatar';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import SendIcon from '@mui/icons-material/Send';
import Language from '../../store/language';
import CommentReplys from './commentReplys';
import SuccessMsg from './successMsg';
import FailedMsg from './failedMsg';
import Modal from './modal';

let CommentItself = (props) =>{
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language);
    const [author , setAuthor] = useState();
    const decode = jwtDecode(Cookies.get('accessToken'));
    const [openReplySection , setOpenReplySection] = useState(false);
    const [showReply , setShowReply] = useState(false);

    const decoded = jwtDecode(Cookies.get('accessToken'));
    
    const [comment , setComment] = useState('');
    //modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [itemToDelete , setItemToDelete] = useState("");
    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
    const commentReplyOpen = () =>{
        if(openReplySection === false){
            setOpenReplySection(true);
        }else if(openReplySection === true){
            setOpenReplySection(false);
        }
    }

    const shwoReplys = () =>{
        if(showReply === false){
            setShowReply(true);
        }else if(showReply === true){
            setShowReply(false);
        }
    }
    const sendCommentReply = async(e) =>{
        var data;
            data = {
                rootComment: props.comment.comment._id,
                targetPost  : props.comment.comment.targetPost ,
                author : jwtDecode(Cookies.get('accessToken')).id,
                replyedTo : props.comment.comment._id,
                comment:comment
            }
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/newCommentReplyCp`,
                data:data,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            setOpenReplySection(false);
            props.setRefreshList(Math.random());

        }catch(error){
            console.log(error);
            console.log('خطایی رخ داده')
        }
    }




    const like = async(e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: decoded.id
            }
        }
        try{
            const response =await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/likeCommentCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setRefreshList(Math.random());

        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const dislike = async(e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: decoded.id
            }
        }
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/dislikeCommentCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setRefreshList(Math.random());


        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const commentValidation =async (e) =>{
        const validationUpdate = {id:e.target.value};
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/commentValidationUpdate`,
                data:validationUpdate,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data;
            props.setRefreshList(Math.random());
        }catch{
            console.log('خطایی رخ داده')
        }
    }


    const deleteComment = async () =>{
        const validationUpdate = {id:itemToDelete};
        try{
            const response  =await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/deleteCommentCp`,
                data:validationUpdate,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data;
            props.setRefreshList(Math.random());
            setShowDeleteModal(false)
            setSuccessOpenToast(true);
            setSuccessMsgToast('دیدگاه حذف شد');
            const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        }catch{
            console.log('خطایی رخ داده')
        }
    }
    
    return(
        <Fragment>
            {/* Modal */}
            <Modal  delete={deleteComment} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
            {/* toasts */}
            <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
            <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
        <Col  xs={12} md={12} lg={12}>

         
        <div className={Style.commentItselfDiv}>
               <div className={Style.commentItselfDateDiv}>
                    <h4 >{moment(props.comment.comment.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h4>

                   <div style={{display:'inline-block' , marginLeft:'12px'}}>
                        {props.comment.comment.validation === true?
                            <Form.Check 
                                onChange={commentValidation}  
                                value={props.comment.comment._id}                                                   
                                type="switch"
                                checked={true}
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                            :props.comment.comment.validation === false?
                            <Form.Check 
                            onChange={commentValidation}  
                                value={props.comment.comment._id}  
                                checked={false}
                                type="switch"
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                        :null}

                   </div>
                   <div style={{display:'inline-block' , marginLeft:'-10px' }} className={Style.deleteIconDiv}><button onClick={(e)=>{setShowDeleteModal(true); setItemToDelete(e.currentTarget.value)}}  value={props.comment.comment._id} style={{border:'none' , background:'none' , padding:'0px'}} ><DeleteIcon onClick={(e)=>{setShowDeleteModal(true); setItemToDelete(e.currentTarget.value)}} className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                   <Link to={`/cp/products/productShowCase/${props.comment.comment.targetPost}`}><div style={{display:'inline-block' , marginLeft:'11px' }} className={Style.deleteIconDiv}><button   value={props.comment.comment._id} style={{border:'none' , background:'none' , padding:'0px'}} ><OpenInNewIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: 'rgb(16, 67, 169)' ,iconHover:'#FFF' }}></OpenInNewIcon></button></div></Link>

              </div>
              <div  dir="rtl"  className={Style.commentItselfProfDiv}>
                <div className={Style.commentProfItselfImage}>
                    <TextAvatar text={`${props.comment.user.firstName} ${props.comment.user.lastName}`}></TextAvatar>
                </div>
                 <div className={Style.commentProfItselfName}>
                    <h4>{`${props.comment.user.firstName} ${props.comment.user.lastName}`}</h4>
                 </div>
              </div>

              <div className={Style.commentTextItselfDiv}>
                  <p>
                    {props.comment.comment.comment}
                  </p>
              </div>
              <div   dir="rtl" className={Style.commentItselfFooterDiv}>
                    <div className={Style.commentLikeAndDislike}>
                            <div className={Style.commentLike}>
                                <h5>{props.comment.comment.likes.length}</h5>
                                {props.comment.comment.likes.includes(decode.id)?
                                    <button  value={props.comment.comment._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#009C0B" />
                                    </button>
                                :
                                    <button value={props.comment.comment._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />
                                    </button>
                                }
                            </div>
                        
                            <div className={Style.commentDislike}>
                                <h5>{props.comment.comment.dislikes.length}</h5>
                                {props.comment.comment.dislikes.includes(decode.id)?
                                    <button  value={props.comment.comment._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#D90000" />
                                    </button>
                                :
                                    <button  value={props.comment.comment._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />
                                    </button>

                                }                            
                            </div>
                        

                    </div>
                      <div onClick={shwoReplys} className={Style.commentShowReplyDiv}>
                          
                        <FontAwesomeIcon className={showReply === true?`${Style.commentShowReplyArrow} ${Style.rotateIn}`:showReply === false?`${Style.commentShowReplyArrow} ${Style.rotateOut}`:null} icon="caret-down" color="#DCDCDC" />
                        <h5><span>{props.comment.replysLength} </span>پاسخ</h5>
                        <FontAwesomeIcon className={showReply === true?`${Style.commentShowReplyArrow} ${Style.rotateIn}`:showReply === false?`${Style.commentShowReplyArrow} ${Style.rotateOut}`:null}  icon="caret-down" color="#DCDCDC" />
                      </div>
                  <div className={Style.commentReplyBtnDiv}>
                      <button onClick={commentReplyOpen} className={Style.replyBtnButton}>
                              <FontAwesomeIcon    className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                      </button>
                  </div>

              </div>
        </div>
        
    </Col>
    {openReplySection === true?
        <Col dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{ maxWidth:'90%' , margin:'8px auto 0px auto'}} xs={12} md={12} lg={12}>
            <div style={{paddingBottom:'18px'}} className={Style.replySection}>
                <h5>پاسخ شما...</h5>
                <Row>
                    <Col style={{padding:'0px'}} xs={11} md={11} lg={11}>
                        <div style={{paddingTop:'0px', paddingBottom:'0px'}} className="textareaDiv">
                            <Form.Control onChange={(e)=>{setComment(e.target.value)}} className="commentTextarea" as="textarea" rows={2} />
                        </div>
                    </Col>
                    <Col style={{padding:'0px'}} xs={1} md={1} lg={1}>                           
                        <div className={Style.btnDiv}>
                            <button onClick={sendCommentReply} className={Style.sendReply}><SendIcon sx={{color:'#fff' , fontSize:'26px', transform:"rotate(180deg)"}}></SendIcon></button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    :null}

         {showReply === true?
         props.comment.replys.map((data , i)=>{   
             return(
                 <CommentReplys setRefreshList={props.setRefreshList} rootComment={props.comment} reply={props.comment.replys} data={data}></CommentReplys>
             )
        })
        :null
    }
</Fragment>
    );
}



export default CommentItself;


