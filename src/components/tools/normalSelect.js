import { Fragment } from 'react';
import Select from 'react-select';

  
const NormalSelect = (props) =>{
    const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          width:'100%',
          color:'#354063',
          borderRadius:'0px'
          
        }),
        control: (provided, state) => ({
            ...provided,
            width:'100%',
            borderRadius:'5px',
            borderWidth:'3px',
            borderColor:'#1043A9'
          }),
    
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }

    return(
        <div style={{maxWidth:`${props.width}`}}>
                        <Select 
            onChange={props.onChange}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#FFFFFF',
                        primary: '#1043A9',
                        neutral0:'#FFFFFF',
                        neutral80:'#354063',
                        neutral90:'#354063',
                        neutral70:'#354063',

                        neutral50:'#354063',
                    },
                    })}
            options={props.options}
            placeholder={props.placeholder}
            styles={customStyles}
            />
        </div>
    )
}
export default NormalSelect; 