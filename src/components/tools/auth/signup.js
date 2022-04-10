import Style from './signup.module.css';
import { Fragment , useState , useEffect , useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";
import AuthContext from '../../../store/auth';
import {Route , Switch  , Redirect, Link , useHistory} from "react-router-dom";
import ReactDom from "react-dom";
import blg from '../../../assets/sts.jpg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';import {Navbar,Row ,Container , Nav ,NavDropdown ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import Loader from '../loader';
import VisibilityIcon from '@mui/icons-material/Visibility';
const SignUp = (props) =>{
    useEffect(() => {
        document.title = "ثبت نام"
    }, []);
    const styles = {
        smallIcon: {
          width: 76,
          height: 76,
        }
      };

      const [name , setName] = useState('');
      const [lastName , setLastName] = useState('');
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('');
      const [signUpError , setSignUpError] = useState(false);
      const [signUpErrorMsg , setSignUpErrorMsg] = useState('');
      const [loadingStatus , setLoadingStatus] = useState(false);
      const [passwordVisibiltyStatus , setPasswordVisibilityStatus] = useState(false);
      
      const ctx = useContext(AuthContext);
      useEffect(() => {
        setSignUpError(false);
        setSignUpErrorMsg('');
    }, [name , lastName , email , password])
      const gettingName = async (e) =>{
          setName(e.target.value);
      }
      const gettingLastName = async (e) =>{
          setLastName(e.target.value)
      }
      const gettingEmail = async (e) =>{
        setEmail(e.target.value);
      }
      const gettingPassword = async (e) =>{
          setPassword(e.target.value);
      }
      const signUpData = async (e) =>{
        e.preventDefault();
        const formData = {
            firstName : name,
            lastName : lastName , 
            email : email,
            password : password
        } 

          try{
            setLoadingStatus(true);
              const response = await axios({
                  method:'post',
                  url : `${ctx.defaultTargetApi}/auth/register`,
                  data : formData,
                  config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
              })
              const data = response.data;
              console.log(data);
              ctx.login(data.token);
              setLoadingStatus(false);

          }catch(err){
              let error = 'خطایی رخ داده است!'
              if(err && err.response.data !== ''){
                  error=err.response.data;
                  setSignUpError(true);
                  setSignUpErrorMsg(error);
                setLoadingStatus(false);

              }
          }
      }
      const passwordVisibil = () =>{
        if(passwordVisibiltyStatus === true){
            setPasswordVisibilityStatus(false);
        }else if(passwordVisibiltyStatus === false){
          setPasswordVisibilityStatus(true);

        }
    }
    return(
        <Fragment>
            <div className={Style.modalBackground}>
                

             <Container style={{maxWidth:'1676px'}} fluid className={Style.container}>
                <Row className={Style.contentRow}>
                    <Col sm={0} xs={0} md={0} lg={1} xl={2} ></Col>
                                <Col style={{backgroundImage:`url(${blg})`}}  className={Style.sideImg}  xs={0} md={7} lg={6} xl={5} >
                                </Col>
                                
                                <Col dir='rtl' className={Style.signUpForm} sm={9} xs={10} md={5} lg={4} xl={3} >
                                    <form className={Style.form} onSubmit={signUpData}>
                                        <div className={Style.signUpDiv}>

                                                <h5 className={Style.signUpHeader}>
                                                    ثبت نام
                                                </h5>

                                            <div className={Style.inputDiv}> 
                                            <PersonOutlineIcon fontSize='medium' className={Style.icon}></PersonOutlineIcon>
                                                <input onChange={gettingName} autoComplete='false' type='text' placeholder="نام" className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                            <PeopleOutlineIcon   fontSize='medium' className={Style.icon}></PeopleOutlineIcon>
                                                <input onChange={gettingLastName} autoComplete='false' type='text' placeholder="نام خانوادگی" className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                            <MailOutlineIcon fontSize='medium' className={Style.icon}></MailOutlineIcon>
                                                <input onChange={gettingEmail} type='email' autoComplete='false'  placeholder="ایمیل" className={Style.input}></input>
                                            </div>
                                            <div className={Style.inputDiv}> 
                                                <VpnKeyIcon  fontSize='medium' className={Style.icon}></VpnKeyIcon>
                                                    <input onChange={gettingPassword} autoComplete='false' type={passwordVisibiltyStatus === false ?'password' :passwordVisibiltyStatus === true ? 'text':null} placeholder="کلمه عبور" className={Style.input}></input>
                                                <VisibilityIcon onClick={passwordVisibil}  fontSize='medium' className={passwordVisibiltyStatus === true ? `${Style.activeVisibility} ${Style.visibilityIconStyle}` : passwordVisibiltyStatus === false ? `${Style.visibilityIconStyle}`:null}></VisibilityIcon>

                                            </div>           
                                            <div className={Style.errorDiv}>
                                                    {/* <FontAwesomeIcon size='1x' color="#db5800"  icon='exclamation-circle'></FontAwesomeIcon> */}
                                                    {signUpError === true ? <h4>{signUpErrorMsg}</h4> : ''}
                                              </div>                                
                                            <div className={Style.signUpBtnDiv}>
                                                <button type='submit' className={Style.signUpBtn}>{loadingStatus === true ? <Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'22px'} height={'22px'}></Loader> : 'ثبت نام'}</button>
                                            </div>
                                                <div className={Style.logInDiv}>
                                                    <h5>قبلا ثبت نام کرده اید؟</h5>
                                                    <Link to='/login'><h5 className={Style.logInBtn}>ورود</h5></Link>
                                                </div>
                                            </div>
 
                                    </form>
                                </Col>
                    <Col sm={0} xs={0} md={0} lg={1} xl={2} ></Col>
                </Row>
                </Container>
                </div>
        </Fragment>
    )
}
// const SignUp = (props)=>{

//     return(
//         <Fragment>
//             {ReactDom.createPortal(
//             <SignUpPage>
//             </SignUpPage>
//             ,
//             document.getElementById('modal_place')
            
//             )}

//         </Fragment>
//     );
//}

export default SignUp;