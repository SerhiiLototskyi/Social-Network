import React, {useEffect} from 'react';
import './App.module.css';
import {Navigation} from "./Components/Navigation/Navigation";
import {Profile} from "./Components/Profile/Profile";
import s from './App.module.css'
import {Navigate, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {UsersPage} from "./Components/Users/Users";
import {LinearProgress} from "@mui/material";
import {authMeThunk} from "./state/reducers/authMe-reducer";
import {Header} from './Components/Header/Header';
import {SignIn} from './Components/LoginPage/Login';
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {savePhotoThunk, SetStatusThunk, SetUserProfileThunk} from "./state/reducers/profile-reducer";

function App() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(authMeThunk())
    }, [dispatch])
    const isLoggedUser = useAppSelector(state => state.authMe.me)
    const profileUser = useAppSelector(state => state.profile)
    const initializeStatus = useAppSelector(state => state.initialize.initializeProgress)
    const isOwnerUser = profileUser.profile.userId === isLoggedUser.id
    const savePhoto = (photo: any) => {
        dispatch(savePhotoThunk(photo))
    }
    const saveStatusProfile = (status: string) => {
        dispatch(SetStatusThunk(status))
    }
    if (isLoggedUser.firstInitializeMe === false){
        return <LinearProgress className={s.LineProgress}/>
    }
    return (
        <div className={s.AppContainer}>
            {initializeStatus && <LinearProgress className={s.LineProgress}/>}
            <Header isOwnerUser={isOwnerUser} profileUser={profileUser} isLoggedUser={isLoggedUser}/>
            <div className={s.BodyContainer}>
                <Navigation isLoggedUser={isLoggedUser}/>
                <Routes>
                    <Route path={'/'} element={
                        <Profile
                            isLoggedUser={isLoggedUser}
                            savePhoto={savePhoto}
                            profileUser={profileUser}
                            isOwnerUser={isOwnerUser}
                            saveStatusProfile={saveStatusProfile}
                        />}/>
                    <Route path={'/users'} element={<UsersPage/>}/>
                    <Route path={'/login'} element={<SignIn profileUser={profileUser}/>}/>
                </Routes>
            </div>

        </div>
    );
}


export default App;
