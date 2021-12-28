//modules
import Style from './multiLangBtn.module.css';
import per from '../../assets/per.png';
import arb from '../../assets/arb.png';
import eng from '../../assets/eng.png';
const MultiLangBtn = () =>{
    return(
        
        <div className={Style.btnDiv}>
            <button className={`${Style.active} ${Style.perBtn}`}><div className={`${Style.btnIcon} ${Style.active}`} style={{ backgroundImage: `url(${per})` }}></div>فارسی</button>
            <button className={` ${Style.perBtn}`}><div className={`${Style.btnIcon}`} style={{ backgroundImage: `url(${arb})` }}></div>عربی</button>
            <button className={` ${Style.perBtn}`}><div className={`${Style.btnIcon}`} style={{ backgroundImage: `url(${eng})` }}></div>English</button>
        </div>
    )
}

export default MultiLangBtn;