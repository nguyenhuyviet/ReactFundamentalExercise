import React from 'react'
import UserContext from '../../../contexts/UserContext/UserContext'
import LoginComponent from '../LoginComponent/LoginComponent';
import Axios from 'axios'

interface IProfile {
    id: string,
    name: string,
    createdAt: string
}


const ProfileComponent = () => {
    const { id, token, setUser } = React.useContext(UserContext);
    const baseURL = 'https://60dff0ba6b689e001788c858.mockapi.io/users/'
    const [profile, setProfile] = React.useState<IProfile>({
        id: '',
        name: '',
        createdAt: ''
    });

    React.useEffect(() => {  
        if (token)
        {        
            Axios.get(`${baseURL}/${id}`, {
                headers: {
                  'Authorization': `token ${token}`
                }
              }).then((response) => {
                setProfile(response.data)
                if (setUser)
                {
                    setUser({id: id, token: token, name: response.data.name, createdAt: response.data.createdAt});
                }
            })

        }
    },[token]);

    return (
        <div>
            {profile && profile.id && <div><span>Id: {profile.id}</span><br></br></div>}
            {profile && profile.name && <div><span>Name: {profile.name}</span><br></br></div>}
            {profile && profile.createdAt && <div><span>CreatedAt: {profile.createdAt}</span><br></br></div>}
            {!token && <LoginComponent></LoginComponent>}
        </div>
    );
}

export default ProfileComponent