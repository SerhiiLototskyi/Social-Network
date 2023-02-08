import {Button} from '@mui/material';
import React, {useState} from 'react';
import {UserType} from "../../state/reducers/users-reducer";
import s from "./User.module.css"
import {UsersAPI} from "../../API/API";
import {useNavigate} from "react-router-dom";
import {SetUserProfileThunk} from "../../state/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../state/hooks";

export const User = (props: UserType) => {

    let [isFollow, setisFollow] = useState(props.followed)
    let [disabledFollowBtn, setDisabledFollowBtn] = useState(false)
    const isLoggedUser = useAppSelector(state => state.authMe)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const followUserHandler = async () => {
        setDisabledFollowBtn(true)
        try {
            await UsersAPI.followUser(props.id.toString())
            setisFollow(!isFollow)
            setDisabledFollowBtn(false)
        } catch (e) {
        }
    }

    const unFollowUserHandler = async () => {
        setDisabledFollowBtn(true)
        try {
            await UsersAPI.unFollowUser(props.id.toString())
            setisFollow(!isFollow)
            setDisabledFollowBtn(false)
        } catch (e) {
        }
    }
    const getUserProfileHandler = () => {
        dispatch(SetUserProfileThunk(props.id))
       setTimeout(() => {navigate('/')},200)
    }
    return (
        <div className={s.User}>
            <img className={s.UserImg}
                 src={props.photos.large ? props.photos.large : "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"}
                 alt="sorry"
                 onClick={getUserProfileHandler}/>
            <div>{props.name}</div>
            <div>{props.status}</div>
            {isLoggedUser.me.login != null ?
                <div>{isFollow ? <Button disabled={disabledFollowBtn} onClick={unFollowUserHandler} variant="text"
                                         color={"primary"}>UnFollow</Button> :
                    <Button disabled={disabledFollowBtn} onClick={followUserHandler} variant="text"
                            color={"primary"}>Follow</Button>}</div> : <div></div>}

        </div>
    );
};

