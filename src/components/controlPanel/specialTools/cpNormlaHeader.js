//module
import Style from './cpNormalHeader.module.css';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';


//component
import NormalHeader from '../../tools/normalHeader';
import MultiLangBtn from '../../tools/multiLangBtn';

const CpNormalHeader = (props) =>{
    return(
        <Fragment>
                <Row dir="rtl">
                    {/* header */}
                    <Col xs={12} md={12} lg={4}>
                        <div className={Style.topRightDivHeaderContainer}>
                            <div className={Style.headerTitleDiv}>
                                {/* custom header title component */}
                                <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header={props.name}></NormalHeader>
                            </div>                           
                        </div>  
                    </Col>

                    <Col xs={0} md={0} lg={4}>

                    </Col>

                    <Col  xs={12} md={12} lg={4}>
                        <div className={Style.topLeftDivHeaderContainer}>
                            <div className={Style.multiLangDiv}>
                                {/* multi lang switcher component */}
                                <MultiLangBtn></MultiLangBtn>

                            </div>
                        </div>
                    </Col>
                    <div className={Style.lineDiv}></div>
                </Row>
        </Fragment>
    )
}
export default CpNormalHeader;