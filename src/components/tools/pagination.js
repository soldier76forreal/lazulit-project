import {React , useState ,useEffect} from 'react';
import './pagination.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pag = (props) =>{
    const [items , setItems] = useState([]);
    // const [prevItem , setPrevItem] = useState(props.prev);
    // const [nextItem , setNextItem] = useState(props.next);

    
    useEffect(() => {
        props.getCategories();

        const half =Math.round(props.max/2);
        let to = props.max;
        if(props.current + half >= props.total){
            to = props.total;
        }else if(props.current > half){
            to = props.current + half;
        }
        let from = to - props.max;

        setItems(Array.from({length:props.max},(_,i) => (i+1) + from));

}, [props.current , props.newCategory , props.queryPage]);





    return(
      <div className='pg'>
          <ul className='pg_ul'>
              <li onClick={props.prevPage} className="pg_backClick">
                  <FontAwesomeIcon onClick={props.prevPage} className="pg_iconRFirst" size='sm' color='#F38033' icon='chevron-left'></FontAwesomeIcon>
              </li>
                 {items.map(data=>{
                     return(
                        <li key={data} id={data} onClick={props.setCurrent} value={data} className={data === props.current ? 'pg_active pg_item' : 'pg_item'}>{data}</li>

                     )                       
                     
                 })}
              <li onClick={props.nextPage} className='pg_forwardClick'>
                  <FontAwesomeIcon onClick={props.nextPage} className="pg_iconRight" size='sm' color='#F38033' icon='chevron-right'></FontAwesomeIcon>
              </li>
          </ul>
      </div>
    )
} 
export default Pag;