import * as React from 'react';
import s from "./Header.module.css"
import {Button} from "@mui/material";
import {AuthMeDataType, logoutThunk} from "../../state/reducers/authMe-reducer";
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {ProfilePageType} from "../../state/reducers/profile-reducer";

type HeaderPropsType = {
    isLoggedUser: AuthMeDataType
    profileUser: ProfilePageType
    isOwnerUser: boolean
}

export const Header = (props: HeaderPropsType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch<any>(logoutThunk())
        navigate('/login')
    }
    return (
        <div className={s.Header}>
            {props.isLoggedUser.login != ''? <div>{props.isOwnerUser && <img className={s.SmallProfilePhoto} src={props.profileUser.profile.photos.small} alt=""/>}</div>: null}
            {props.isLoggedUser.login && <div>{props.isLoggedUser.login}</div>}
            <NavLink to={'/login'} className={s.ButtonContainer}>
                {props.isLoggedUser.login? <Button onClick={logoutHandler}  className={s.Button} variant="contained">Logout</Button>:
                <Button className={s.Button} variant="contained">Login</Button>}
            </NavLink>
        </div>
    );
}