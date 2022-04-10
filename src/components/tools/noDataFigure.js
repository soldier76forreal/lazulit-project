import Style from './noDataFigure.module.css'; 
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import noDataImg from '../../assets/noData.png'

const NoDataFigure = (props) =>{
    return(

            <div className={Style.noDataDiv}>
                <img className={Style.img} src={`${noDataImg}`}></img>
                <h4 className={Style.msg}>{props.msg}</h4>
            </div>
    )
}
export default NoDataFigure;