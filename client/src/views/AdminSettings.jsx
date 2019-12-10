import React, {useState} from React;
import Input from "../components/Input";
import translate from '../util/localization/i18n';

const AdminSettings = (props) => {

    return(
        <div className="AdminSettings">
            <label htmlFor="username" >{translate(username)}</label>
            <Input id="username" />        
            <Input />        
            <Input />        
            <Input />        
        </div>

    );
}

export default AdminSettings;