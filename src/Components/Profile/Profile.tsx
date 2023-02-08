import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Profile.module.css"
import {Box} from "@material-ui/core";
import {CircularProgress, TextField, Tooltip} from "@mui/material";
import {useAppSelector} from "../../state/hooks";
import {useNavigate} from "react-router-dom";
import {ProfilePageType, ProfileType} from "../../state/reducers/profile-reducer";
import {AuthMeDataType} from "../../state/reducers/authMe-reducer";

type ProfilePropsType = {
    profileUser: ProfilePageType
    isOwnerUser: boolean
    savePhoto: (photo: any) => void
    saveStatusProfile: (status: string) => void
    isLoggedUser: AuthMeDataType
}

export const Profile = ({profileUser,isLoggedUser, isOwnerUser, savePhoto, saveStatusProfile}: ProfilePropsType) => {
    const navigate = useNavigate()
    const initializeStatus = useAppSelector(state => state.initialize.initializeProgress)
    const [statusChanging, setStatusChanging] = useState(false)
    const [statusText, setStatusText] = useState('')

    useEffect(() => {
        setStatusText(profileUser.profileStatus)
        if (profileUser.profile.fullName === "") {

            setTimeout(() => {navigate('/login')},200)
        }
    }, [profileUser.profileStatus,profileUser])
    const onChangePhotoFile = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (e.target.files.length) {
            // @ts-ignore
            savePhoto(e.target.files[0])
        }
    }
    const startChangeStatusHandler = () => {
        setStatusChanging(true)
    }
    const setStatusHandlerBlur = () => {
        saveStatusProfile(statusText)
        setStatusChanging(false)
    }
    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.target.value)
    }

    if (initializeStatus === true) {
        return <Box className={s.Profile}>
            <CircularProgress size={300}/>
        </Box>
    } else {
        return (
            <div className={s.ProfileContaner}>
                <div className={s.Profile}>
                    <img className={s.ImgAvatar}
                         src={profileUser.profile.photos.large || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"}
                         alt=""/>
                    <div className={s.ProfileInfo}>
                        <div>{profileUser.profile.fullName}</div>
                        <div>Looking For A Job</div>
                    </div>
                </div>
                <div>
                    {isOwnerUser ?
                        <Tooltip title="Change photo" arrow>
                            <input onChange={onChangePhotoFile} type='file'/>
                        </Tooltip>
                        : ''}
                </div>
                {isOwnerUser ? <div>{statusChanging ?
                    <TextField multiline onKeyPress={event => {
                        if (event.charCode === 13) {
                            setStatusHandlerBlur()
                        }
                    }} value={statusText} onChange={onChangeInputText} autoFocus={true} onBlur={setStatusHandlerBlur}/>
                    : <span onDoubleClick={startChangeStatusHandler}>{statusText}</span>}</div> : ''}

            </div>
        );
    }
}