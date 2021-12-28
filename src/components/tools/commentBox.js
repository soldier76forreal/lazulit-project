import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./commentBox.css";
import NormalBtn from "../tools/normalBtn";
import { color } from '@mui/system';


let CommentBox = (props)=>{
    return(

        <Col  className="commentSectionCol"  xs={12} md={12} lg={12}>

          <div className="commentSection">
            <div  className="commentHeaderSection">
                <div dir="rtl" className="commentCounter">
                   <h3><span>5</span> دیدگاه</h3>
                </div> 
                <div dir="rtl" className="charCounter">
                   <h3><span>{props.counter}/1500 </span>کاراکتر باقی مانده</h3>
                </div> 
            </div>
            <div dir="rtl" className="commentItself">
                <div className="textareaDiv">
                   <Form.Control onChange={props.saveComment} className="commentTextarea" as="textarea" rows={3} />
                </div>
            </div>
                <div dir="rtl" className="commentFooter">

                    {props.commentErrorStatus === false ? 
                    (
                        <div>     
                        <input checked={props.checkboxStatus} onChange={props.commentCheckBox} type="checkbox"></input>
                       <h4>قوانین را مطالعه کرده ام</h4>
                     <div className="commentSendBtn">
                       <NormalBtn send={props.sendComment}  btnName="ارسال"></NormalBtn>
                     </div>
                  </div>
                    ):(
                    <div> 
                        {/* <div>
                        <h4 style={{color:"#F38033" , marginBottom:"15px" , fontSize:"20px"}}>{props.commentErrorMsg}</h4>

                        </div> */}
                        <input checked={props.checkboxStatus} onChange={props.commentCheckBox} type="checkbox"></input>
                       <h4>قوانین را مطالعه کرده ام</h4>
                     <div className="commentSendBtn">
                       <NormalBtn send={props.sendComment}  btnName="ارسال"></NormalBtn>
                     </div>                  

                    </div>
                    )}


              </div>
          </div>
        </Col>
    );
}


export default CommentBox;