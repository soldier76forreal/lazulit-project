
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './searchBarV2.module.css';
import Loader from './loader';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
let SearchBarV2 = (props)=>{
    return (
        // <FontAwesomeIcon size='lg' color='#fff' icon='search'></FontAwesomeIcon>
        <div className={Style.searchBarDiv}>
            <div className={Style.searchBtn}>{props.loading === true?<Loader marginBottom={'2px'} borderTop={'3px solid #fff'} border={'#1043A9 3px solid'} width={'22px'} height={'22px'}></Loader>:<FontAwesomeIcon size='lg' color='#1043A9' icon='search'></FontAwesomeIcon>}</div>
            <input onChange={props.onChange} placeholder='جستجو...' className={Style.searchBar} type='search'></input>
            {/* <div className={Style.clearBtn}>            
                <FontAwesomeIcon size='lg' color='#000' icon='times'></FontAwesomeIcon>
            </div> */}
        </div>
    )
}
export default SearchBarV2;