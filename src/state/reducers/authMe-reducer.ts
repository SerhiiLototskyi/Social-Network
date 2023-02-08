import {AuthMeAPI} from "../../API/API";
import {setInitializeStatusAC} from "./initialization-reducer";
import {GetStatusThunk, SetUserProfileThunk} from "./profile-reducer";
import {AppThunk} from "../store";

export type AuthMeDataType = {
    id: number,
    email: string,
    login: string,
    firstInitializeMe?: boolean,
    error: string
}

const initialState: { me: AuthMeDataType } = {
    me: {
        id: 0,
        email: '',
        login: '',
        firstInitializeMe: false,
        error: ''
    }
}
export const AuthMeReducer = (state: { me: AuthMeDataType } = initialState, action: AuthActionsType): { me: AuthMeDataType } => {
    switch (action.type) {
        case 'SET-AUTH-ME-DATA':
            return {...state, me: {...action.authMeData}}

        default:
            return state
    }
}

export const setAuthMeDataAC = (authMeData: AuthMeDataType) => ({type: 'SET-AUTH-ME-DATA', authMeData} as const)
export const firstInitializeMeAC = (toogleStatus: boolean) => ({type: 'SET-FIRST-AUTH-ME', toogleStatus} as const)
export const setErrorAC = (error: string) => ({type: 'SET-ERROR', error} as const)


export const authMeThunk = (): AppThunk => async (dispatch) => {

    try {
        const res = await AuthMeAPI.getAuth()
        if (res.data.resultCode === 0) {
            dispatch(setAuthMeDataAC(res.data.data))
            dispatch(SetUserProfileThunk(res.data.data.id))
            dispatch(GetStatusThunk())
        } else {
            const logoutData: AuthMeDataType = {
                id: 0,
                email: '',
                login: '',
                error: ''
            }
            dispatch(setAuthMeDataAC(logoutData))
        }
    } catch (e) {
    }
}
export const logoutThunk = (): AppThunk => async (dispatch) => {
    dispatch(setInitializeStatusAC(true))
    const logoutData: AuthMeDataType = {
        id: 0,
        email: '',
        login: '',
        error: ''
    }
    try {
        const res = await AuthMeAPI.logout()
        dispatch(setAuthMeDataAC(logoutData))
    } catch (e) {
        throw new Error()
    } finally {
        dispatch(setInitializeStatusAC(false))
    }
}
export const signInThunk = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(setInitializeStatusAC(true))
    try {
        const res = await AuthMeAPI.signIn(email, password, rememberMe)
        if (res.data.resultCode === 0){
            dispatch(authMeThunk())
            dispatch(setErrorAC(''))
        } else if (res.data.resultCode === 1){
            dispatch(setErrorAC('some error'))
        }
    } catch (e) {
        throw new Error()
    } finally {
        dispatch(setInitializeStatusAC(false))
    }
}

export type AuthActionsType =
    | ReturnType<typeof setAuthMeDataAC>
    | ReturnType<typeof firstInitializeMeAC>
    | ReturnType<typeof setErrorAC>
