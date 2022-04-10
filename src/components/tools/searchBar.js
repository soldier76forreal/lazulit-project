
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './searchBar.module.css';
import Loader from './loader';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
let SearchBar = (props)=>{
    return (
        // <FontAwesomeIcon size='lg' color='#fff' icon='search'></FontAwesomeIcon>
        <div className={Style.searchBarDiv}>
            <button className={Style.searchBtn}>{props.loading === true?<Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'22px'} height={'22px'}></Loader>:<FontAwesomeIcon size='lg' color='#fff' icon='search'></FontAwesomeIcon>}</button>
            <input onChange={props.onChange} placeholder='جستجو...' className={Style.searchBar} type='search'></input>
            {/* <div className={Style.clearBtn}>            
                <FontAwesomeIcon size='lg' color='#000' icon='times'></FontAwesomeIcon>
            </div> */}
        </div>
    )
}
export default SearchBar;