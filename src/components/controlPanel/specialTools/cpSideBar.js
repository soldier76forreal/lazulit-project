import Style from "./cpSideBar.module.css";
import { useEffect , useContext , useState  ,Fragment ,  } from "react";
import {Navbar, Row , Nav ,NavDropdown , Form ,FormControl ,Button, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDom from "react-dom";
import jwt_decode from "jwt-decode";
import AuthContext from "../../../store/auth";
import BookIcon from '@mui/icons-material/Book';
// import Logo from "../../assets/logo.png";
import {Route , Redirect, Switch ,Link ,useHistory } from "react-router-dom";
import ActivePage from "../../../store/activePage";
import prof from '../../../assets/prof.jpg';



const CpSideBarPortal =(props)=>{
    const authCtx = useContext(AuthContext);
    const activePageCtx = useContext(ActivePage);
    var decoded = jwt_decode(authCtx.token);
    const history = useHistory();
    const logOutHandler = () =>{
        authCtx.logout();
        history.replace('/logIn');
    }
    const [sideBarMenuActive , setSideBarMenuActive] = useState(true);
    const activeSideBar = (e) =>{
        if(sideBarMenuActive === false){
            setSideBarMenuActive(true);
        }else if(sideBarMenuActive === true){
            setSideBarMenuActive(false);
        }
    }
    return(
        <Fragment>
        <div dir="rtl"   className={sideBarMenuActive === true ? `${Style.sideBar}`:`${Style.sideBar} ${Style.active}`}>
                    <div className={Style.logoContent}>
                        <div className={Style.logo}>
                            {/* <img className={Style.logoIcon} src={`${Logo}`}/> */}
                            <div className={Style.logoName}>LMC</div>
                        </div>
                        <FontAwesomeIcon  onClick={activeSideBar}  className={Style.barsIcon} icon={"bars"}></FontAwesomeIcon>

                    </div>   
                <ul className={Style.nav_list}>
                    <div className={activePageCtx.activePage === 'dashBoard'? Style.activePage : null}>  
                        <li>
                            <a href='https://analytics.google.com/'>
                                <FontAwesomeIcon className={Style.listIconStyle}  icon={"th-large"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>google analytics</span> 
                            </a>
                            <span className={Style.toolTip}>google analytics</span> 

                        </li>
                    </div>
                    
                    <div className={activePageCtx.activePage === 'product'? Style.activePage : null}>
                        <li>
                            <Link to="/cp/products">
                                <FontAwesomeIcon className={Style.listIconStyle}  icon={"file"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>پست ها</span> 
                            </Link>
                            <span className={Style.toolTip}>پست ها</span> 

                        </li>
                    </div>
                    <div className={activePageCtx.activePage === 'category'? Style.activePage : null}>
                        <li>
                            <Link to="/cp/tagsAndCategories/?pageState=category">
                                <FontAwesomeIcon className={Style.listIconStyle}  icon={"tags"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>تگ ها</span> 
                            </Link>
                            <span className={Style.toolTip}>تگ ها</span> 
                        </li>
                    </div> 
                    <div className={activePageCtx.activePage === 'upload'? Style.activePage : null}>
                        <li>
                            <Link target='_blank'  to='/cp/cpUploadCenter'>
                                <FontAwesomeIcon className={Style.listIconStyle}  icon={"upload"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>آپلود سنتر</span> 
                            </Link>
                            <span className={Style.toolTip}>آپلود سنتر</span> 
                        </li>
                    </div> 
                    <div className={activePageCtx.activePage === 'comments'? Style.activePage : null}>
                        <li>
                                <Link to='/cp/comments'>
                                    <FontAwesomeIcon className={Style.listIconStyle}  icon={"comments"}></FontAwesomeIcon> 
                                    <span className={Style.links_Name}>نظرها</span> 
                                </Link>
                            
                            <span className={Style.toolTip}>نظرها</span> 
                        </li>
                    </div> 

                    <div className={activePageCtx.activePage === 'oprator'? Style.activePage : null}>
                        <li>
                            <Link to='/cp/oprators?page=pcOprators'>
                                <FontAwesomeIcon className={Style.listIconStyle} icon={"headset"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>اپراتور ها</span> 
                            </Link>
                            <span className={Style.toolTip}>اپراتور ها</span>  
                        </li>
                    </div>
                    <div className={activePageCtx.activePage === 'users'? Style.activePage : null}>
                        <li>
                            <Link to='/cp/users'>
                                <FontAwesomeIcon className={Style.listIconStyle} icon={"user"}></FontAwesomeIcon> 
                                <span className={Style.links_Name}>کاربر ها</span> 
                            </Link>
                            <span className={Style.toolTip}>کاربرها</span>  
                        </li>
                    </div>
                    <div className={activePageCtx.activePage === 'blog'? Style.activePage : null}>
                        <li>
                            <Link to='/cp/blog'>
                                <BookIcon className={Style.listIconStyle} sx={{fontSize:'28px'}}></BookIcon> 
                                <span className={Style.links_Name}>بلاگ پست</span> 
                            </Link>
                            <span className={Style.toolTip}>بلاگ پست</span>  
                        </li>
                    </div>

                    {/* <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        <span className={Style.toolTip}>داشبورد</span> 

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        <span className={Style.toolTip}>داشبورد</span> 

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        <span className={Style.toolTip}>داشبورد</span> 

                    </li> */}
                </ul>
                
                    <hr className={Style.line}></hr>
                <div className={Style.profile_content}>
                    <div className={Style.profile}>
                        <div className={Style.profile_details}>
                           {decoded.profileImage !== undefined?
                                <img alt={`${decoded.firstName} ${decoded.lastName}`} title={`${decoded.firstName} ${decoded.lastName}`} src={`${authCtx.defaultTargetApi}/uploads/${decoded.profileImage.filename}`} className={Style.profilePhoto}></img>
                                :
                                <img alt='placeholder' title='placeholder' className={Style.profilePhoto} src={`${prof}`}></img>
                            }
                            <div className={Style.name_job}>
                            <div className={Style.name}>{`${decoded.firstName} ${decoded.lastName}`}</div>
                                <div className={Style.role}>{decoded.role}</div>
                            </div>
                        </div>
                        <FontAwesomeIcon onClick={logOutHandler} className={Style.log_out}  icon={"sign-out-alt"}></FontAwesomeIcon>
                    </div>
                </div>
        </div>  
        </Fragment> 
    )
}


const CpSideBar = (props)=>{

    return(
        <Fragment>
            {ReactDom.createPortal(
            <CpSideBarPortal >
            </CpSideBarPortal>
            ,
            document.getElementById('header_container')
            
            )}

        </Fragment>
    );
}

export default CpSideBar;