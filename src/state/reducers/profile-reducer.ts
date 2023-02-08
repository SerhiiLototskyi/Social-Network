import {Dispatch} from "redux";
import {setInitializeStatusAC} from "./initialization-reducer";
import {ProfileAPI} from "../../API/API";
import {AppThunk} from "../store";
import {authMeThunk, firstInitializeMeAC} from "./authMe-reducer";

export type ProfileType = {
    /*aboutMe: null,*/
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string
    },
    photos: {
        small: string,
        large: string
    }
}
export type ProfilePageType = {
    profile: ProfileType
    profileStatus: string
}
const initialState: ProfilePageType = {
    profile: {
        userId: 0,
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: ""
        },
        photos: {
            small: '',
            large: ''
        }
    },
    profileStatus: ''
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case "GET-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET-USER-STATUS": {
            return {...state, profileStatus: action.status}
        }
        default:
            return state
    }
}

export const setProfileAC = (profile: ProfileType) => ({type: 'GET-PROFILE', profile} as const)
export const setUserStatusAC = (status: string) => ({type: 'SET-USER-STATUS', status} as const)

export const SetUserProfileThunk = (userId: number): AppThunk => async (dispatch) => {
    dispatch(setInitializeStatusAC(true))
    try {
        const res = await ProfileAPI.getUserProfile(userId)
        dispatch(setProfileAC(res.data))
    } catch (e) {
        throw new Error()
    } finally {
        dispatch(setInitializeStatusAC(false))
        dispatch(firstInitializeMeAC(false))
    }
}

export const SetStatusThunk = (status: string): AppThunk => async (dispatch) => {
    dispatch(setInitializeStatusAC(true))
    try {
        await localStorage.setItem('myStatus', status)
        dispatch(setUserStatusAC(status))
    } catch (e) {
        throw new Error()
    } finally {
        dispatch(setInitializeStatusAC(false))
    }
}
export const GetStatusThunk = (): AppThunk => async (dispatch) => {
    dispatch(setInitializeStatusAC(true))
    try {
        const status = await localStorage.getItem('myStatus')
        if (status) {
            dispatch(setUserStatusAC(status))
        }

    } catch (e) {
        throw new Error()
    } finally {
        dispatch(setInitializeStatusAC(false))
    }
}
export const savePhotoThunk = (photo: object): AppThunk => async (dispatch) => {
    try {
        const res = await ProfileAPI.savePhoto(photo)
        dispatch(authMeThunk())
    } catch (e) {
        throw new Error()
    }
}

export type ProfileActionsType = ReturnType<typeof setProfileAC> | ReturnType<typeof setUserStatusAC>
