import {React , useState ,useEffect} from 'react';
import './pagination.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pag = (props) =>{
    // const [prevItem , setPrevItem] = useState(props.prev);
    // const [nextItem , setNextItem] = useState(props.next);

    






    return(
      <div className='pg'>
          <ul className='pg_ul'>
              <li onClick={props.prevPage} className="pg_backClick">
                  <FontAwesomeIcon onClick={props.prevPage} className="pg_iconRFirst" size='sm' color='#CCD9F7' icon='chevron-left'></FontAwesomeIcon>
              </li>
                 {props.items.map(data=>{
                     return(
                        <li key={data} id={data} onClick={props.setCurrent} value={data} className={data === props.current ? 'pg_active pg_item' : 'pg_item'}>{data}</li>
                     )                       
                 })}
              <li onClick={props.nextPage} className='pg_forwardClick'>
                  <FontAwesomeIcon onClick={props.nextPage} className="pg_iconRight" size='sm' color='#CCD9F7' icon='chevron-right'></FontAwesomeIcon>
              </li>
          </ul>
      </div>
    )
} 
export default Pag;