import React, { useState, useEffect } from 'react';
import { USER } from '../../../util/constants';
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button';
import AuthContext from '../../../contexts/AuthContext'

import './Profile.scss'

function Profile(props) {
    const [currentUser, setCurrentUser] = useState(null);
    const { resetAuthState } = React.useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem(USER)) {
            setCurrentUser(JSON.parse(localStorage.getItem(USER)));
        } else{
            setCurrentUser(null);
        }
    }, []);

    const handleLogout = () => {
        resetAuthState(props);
    }

    return (
        <React.Fragment>

            <div className="container profile-container">

                {currentUser &&
                    <div className="profile-card">

                        <img
                            className="profile-image"
                            src={currentUser?.imageUrl}
                            alt={currentUser?.name}
                        />

                        <div className="username-text">
                            {currentUser?.name}
                        </div>
                    </div>
                }

                <div className="logout">
                    <Button label="Logout" className="p-button logout-btn" onClick={handleLogout} />
                </div>

            </div>
        </React.Fragment>
    );

}

export default withRouter(Profile);
