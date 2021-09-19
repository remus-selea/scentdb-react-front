import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import axiosApiCall from '../../../util/axiosService'
import { API_BASE_URL, USER } from '../../../util/constants';
import { ProgressSpinner } from 'primereact/progressspinner';

function OAuth2RedirectHandler(props) {
    const { setAuthState } = React.useContext(AuthContext)

    const extractUrlParameter = (key) => {
        return new URLSearchParams(props.location.search).get(key)
    }

    const accessToken = extractUrlParameter('token')

    useEffect(() => {
        if (accessToken) {

            const authState = {
                isAuthenticated: true,
                token: accessToken,
            };

            setAuthState(authState);

            const getUserProfile = async () => {
                const response = await axiosApiCall(API_BASE_URL + "/profile", 'get');
                localStorage.setItem(USER, JSON.stringify(response));
            }

            getUserProfile();
        }

    }, [accessToken, setAuthState]);

    const userInStorage = localStorage.getItem(USER);

    const isloading = !(accessToken && userInStorage);

    const renderRedirect = () => {
        if (!isloading) {
            return <Redirect to={{
                pathname: "/profile",
                state: {
                    from: props.location
                }
            }} />;
        } else {
            return <div className="spinner-container">
                <ProgressSpinner />
            </div>;
        }
    }

    return (
        renderRedirect()
    );
}

export default OAuth2RedirectHandler;