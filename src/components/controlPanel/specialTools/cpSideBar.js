import Style from "./cpSideBar.module.css";
import { useEffect , useContext , useState  ,Fragment ,  } from "react";
import {Navbar, Row , Nav ,NavDropdown , Form ,FormControl ,Button, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDom from "react-dom";

// import Logo from "../../assets/logo.png";
import {Route , Redirect, Switch ,Link ,useHistory } from "react-router-dom";



const CpSideBarPortal =(props)=>{

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
                            <div className={Style.logoName}>Soldier76</div>
                        </div>
                        <FontAwesomeIcon  onClick={activeSideBar}  className={Style.barsIcon} icon={"bars"}></FontAwesomeIcon>

                    </div>   
                <ul className={Style.nav_list}>
                    <li>
                        <Link to='cp/dashboard'>
                            <FontAwesomeIcon className={Style.listIconStyle}  icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        <span className={Style.toolTip}>داشبورد</span> 

                    </li>
                    <li>
                        <Link to="/cp/products">
                            <FontAwesomeIcon className={Style.listIconStyle}  icon={"file"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>پست ها</span> 
                        </Link>
                        <span className={Style.toolTip}>پست ها</span> 

                    </li>
                    <li>
                        <Link to="/cp/tagsAndCategories">
                            <FontAwesomeIcon className={Style.listIconStyle}  icon={"tags"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>تگ ها</span> 
                        </Link>
                        <span className={Style.toolTip}>تگ ها</span> 

                    </li>
                    <li>
                        <Link to='/cp/cpUploadCenter'>
                            <FontAwesomeIcon className={Style.listIconStyle}  icon={"upload"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>آپلود سنتر</span> 
                        </Link>
                        <span className={Style.toolTip}>آپلود سنتر</span> 

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle}  icon={"comments"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>نظرها</span> 
                        </Link>
                        <span className={Style.toolTip}>نظرها</span> 

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"user"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>کاربر ها</span> 
                        </Link>
                        {/* <span className={Style.toolTip}>داشبورد</span>  */}

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        {/* <span className={Style.toolTip}>داشبورد</span>  */}

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        {/* <span className={Style.toolTip}>داشبورد</span>  */}

                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon className={Style.listIconStyle} icon={"th-large"}></FontAwesomeIcon> 
                            <span className={Style.links_Name}>داشبورد</span> 
                        </Link>
                        {/* <span className={Style.toolTip}>داشبورد</span>  */}

                    </li>
                </ul>
                
                    <hr className={Style.line}></hr>
                <div className={Style.profile_content}>
                    <div className={Style.profile}>
                        <div className={Style.profile_details}>
                            <img src="../../assets/prof.jpg" className={Style.profilePhoto}></img>
                            <div className={Style.name_job}>
                                <div className={Style.name}></div>
                                <div className={Style.role}>ادمین</div>
                            </div>
                        </div>
                        <FontAwesomeIcon  className={Style.log_out}  icon={"sign-out-alt"}></FontAwesomeIcon>
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