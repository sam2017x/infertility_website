import React, { useEffect, useState } from 'react';
import userService from '../util/api/users';
import hash from '../util/js/md5';
import translate from '../util/localization/i18n'

const Settings = props => {

    const [ userList, setUserList ] = useState([])
    const [ newUsername, setnewUsername ] = useState('')
    const [ newPassword, setnewPassword ] = useState('')
    const [ newPassword2, setnewPassword2 ] = useState('')
    const [ newUserLevel, setUserLevel ] = useState(false)
    const [ updPassword, setUpdPassword ] = useState('')
    const [ updPassword2, setUpdPassword2 ] = useState('')
    const [ feedback, setFeedback ] = useState([])

    useEffect(() => {
        if (window.localStorage.getItem('level') === 'admin'){
            const conf = {
                headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` }
            }
            userService.list_users({}, conf).then(users => setUserList(users)).catch(error => console.log(error))
            userService.get_feedback().then(fb => {setFeedback(fb);}).catch(error => console.log(error))
        }
    }, [])

    if (window.localStorage.getItem('token') === null){
        props.setView('login')
    }

    const handleNewUser = () => {
        if ((newPassword === newPassword2) && (newPassword.trim().length >= 4) && (newUsername.trim() !== "") && (newPassword.trim().length < 11) && (newUsername.trim().length <= 15) && (newPassword.trim().includes(" ") === false) && (newUsername.trim().includes(" ") === false)) {
            const conf = {
                headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` }
            }
            const user = {
                newUser: {
                    name: newUsername.trim(),
                    password: hash(newPassword.trim()),
                    level: newUserLevel ? 'admin' : 'user'
                }
            }
            userService.add_user(user, conf).then(res => userService.list_users({}, conf)).then(users => {setUserList(users);alert(`${newUsername.trim()} ${translate('set_added')}`); setnewUsername('');setnewPassword('');setnewPassword2('');setUserLevel(false)}).catch(error => alert(`${error.message}`))
        }
        else {
            alert(`${translate('set_failed_1')}\n${translate('set_failed_2')}\n${translate('set_failed_3')}\n${translate('set_failed_4')}`)
        }

    }

    const handleRemoveUser = (id,name) => {
        if (window.confirm(`${translate('set_remove_1')} ${name} ${translate('set_remove_2')}`)){
            const conf = {
                headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` }
            }
            userService.deleter(id, conf).then(res =>  userService.list_users({}, conf).then(users => {setUserList(users);}).catch(error => alert(`${error.message}`)))
        }
        else {

        }
    }

    const removeFeedback = (id) => {
        userService.del_feedback(id).then(() => userService.get_feedback().then(fb => {setFeedback(fb)}).catch(error => console.log(error)))
    }

    const updPw = () => {
        if ((updPassword === updPassword2) && (updPassword.trim().length >= 4) && (updPassword.trim().length < 11) && (updPassword.trim().includes(" ") === false)) {
            const conf = {
                headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` }
            }
    
            userService.upd_pw({newPassword: hash(updPassword.trim())}, conf).then(res => {alert(`${translate('set_passupdate')}`);setUpdPassword(''); setUpdPassword2('');}).catch(error => alert(`${error.message}`))
        }
        else {
            alert(`${translate('set_failed_1')}\n${translate('set_failed_2')}\n${translate('set_failed_4')}`)
        }

    }

    return(
        <div className="container">
            {window.localStorage.getItem('level') === 'admin' && <>
        
        <div className="forms">
            <form>
                <h3>{translate('set_ad_1')}</h3>
                <input placeholder={translate('username')} title={translate('set_u_title')} type="text" value={newUsername} onChange={(e) => setnewUsername(e.target.value)}/>
                <input placeholder={translate('password')} title={translate('set_pw_title')} type="password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)}/>
                <input placeholder={translate('pass_again')} type="password" value={newPassword2} onChange={(e) => setnewPassword2(e.target.value)}/>
                <label htmlFor="privilege">{translate('set_ad_2')}<input type="checkbox" id="privilege" checked={newUserLevel} onChange={() => setUserLevel(!newUserLevel)} /></label>
                <input type="button" value={translate('set_ad_3')} onClick={handleNewUser}/>
            </form>
        </div>
        <div className="forms">
            <form>
                <h3>{translate('set_ad_4')}</h3>
                <input placeholder={translate('new_pass')} title={translate('set_pw_title')} type="password" value={updPassword} onChange={(e) => setUpdPassword(e.target.value)}/>
                <input placeholder={translate('pass_again')} type="password" value={updPassword2} onChange={(e) => setUpdPassword2(e.target.value)}/>
                <input type="button" value={translate('set_ad_5')} onClick={updPw}/>
            </form>
        </div>
    <div className="users-list">
        <h3>{translate('set_ad_7')}</h3>
        <ul>
    {userList.map((user) => <li key={`${user.name}-key`}>{user.name} ({user.level.slice(0,1)}) {user.name !== window.localStorage.getItem('user') && <button onClick={() => handleRemoveUser(user.id, user.name)}>{translate('set_rm')}</button>}</li>)}
        </ul>
    </div>
    <div>
        <h3>{translate('set_ad_6')}</h3>
        <div className="feedbacks">
            {feedback.map((fb, i) => <div key={`${i}-xd`}>
            <h4>{fb.createdAt.slice(0,10)} {fb.createdAt.slice(11,16)} <button className="removeButton" onClick={() => removeFeedback(fb._id)}>x</button></h4>
            <p>{fb.message}</p>
        </div>)}</div>
    </div>
     </>}
        { window.localStorage.getItem('level') === 'user' && <>

        <div className="forms">
        <form>
            <h3>{translate('set_ad_4')}</h3>
            <input placeholder={translate('new_pass')} title={translate('set_pw_title')} type="password" value={updPassword} onChange={(e) => setUpdPassword(e.target.value)}/>
            <input placeholder={translate('pass_again')} type="password" value={updPassword2} onChange={(e) => setUpdPassword2(e.target.value)}/>
            <input type="button" value="Update" onClick={updPw}/>
        </form>
    </div> </>}
        <div>
            <input value={translate('naviLogout')} type="button" onClick={() => {window.localStorage.clear();props.updateNavi();props.setView('login');}} />
        </div>
    </div>
    )
}


export default Settings