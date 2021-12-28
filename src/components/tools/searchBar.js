
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './searchBar.module.css';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
let SearchBar = (props)=>{
    return (
        <div className={Style.searchBarDiv}>
            <button className={Style.searchBtn}><FontAwesomeIcon size='lg' color='#fff' icon='search'></FontAwesomeIcon></button>
            <input placeholder='جستجو...' className={Style.searchBar} type='search'></input>
            {/* <div className={Style.clearBtn}>            
                <FontAwesomeIcon size='lg' color='#000' icon='times'></FontAwesomeIcon>
            </div> */}
        </div>
    )
}
export default SearchBar;