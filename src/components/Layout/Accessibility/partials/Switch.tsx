import { FC } from "react";

interface SwitchProperties {
    isChecked: boolean;
    onChange: () => void;
}

const Switch:FC<SwitchProperties> = (props) => {
    
    return(
        <>
            <label htmlFor="id_input" className="switch">
                <input 
                    type="checkbox"
                    role="switch"
                    checked={props.isChecked}
                    onChange={props.onChange}
                />
            </label>
        </>
    )
}

export default Switch;