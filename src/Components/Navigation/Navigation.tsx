import React from 'react';
import s from "./Navigation.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {SetUserProfileThunk} from "../../state/reducers/profile-reducer";
import {useAppDispatch} from "../../state/hooks";
import {AuthMeDataType} from "../../state/reducers/authMe-reducer";

type NavigationPropsType = {
    isLoggedUser: AuthMeDataType
}

export const Navigation = ({isLoggedUser}: NavigationPropsType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const getMyProfileHandler = () => {
        dispatch(SetUserProfileThunk(isLoggedUser.id))
        setTimeout(() => {navigate('/')}, 200)
    }
    return (
        <div className={s.Navigation}>
            {isLoggedUser.login === '' ? <NavLink to={"/login"} className={s.NavLinks}> My profile</NavLink> :
                <div  onClick={getMyProfileHandler}  className={s.NavLinks}> My profile</div>}
            <NavLink to={'/users'} className={s.NavLinks}>Users</NavLink>
        </div>
    );
};

