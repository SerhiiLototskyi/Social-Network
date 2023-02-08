import {ProfileAPI, UsersAPI} from "../../API/API";
import {AppThunk} from "../store";
import {setInitializeStatusAC} from "./initialization-reducer";
import {Dispatch} from "redux";

export type UserType = {
    name: string,
    id: number,
    photos: {
        small: string | undefined,
        large: string | undefined
    },
    status: string | null,
    followed: boolean

}
export type UsersItemType = {
    items: UserType[],
    totalCount: number,
    error: any
}

const initialState: UsersItemType = {
    items: [],
    totalCount: 0,
    error: null
}

export const UsersReducer = (state: UsersItemType = initialState, action: UsersActionsType): UsersItemType => {
    switch (action.type) {
        case 'SET-USERS':
            return {
                ...state, items: action.users.map(u => ({...u}))
            }
        case 'SET-TOTAL_COUNT':
            return {
                ...state, totalCount: action.totalCount
            }
        default:
            return state
    }
}

export const setUsersAC = (users: UserType[]) => ({type: 'SET-USERS', users} as const)
export const setTotalCountsAC = (totalCount: number) => ({type: 'SET-TOTAL_COUNT', totalCount} as const)

//синтаксис then
/*export const fetchUsersThunk = (): AppThunk => {
    return (dispatch) => {
        UsersAPI.getUsers()
            .then((res) => {
                dispatch(setUsersAC(res.data.items))
                dispatch(setTotalCountsAC(res.data.totalCount))
            })
    }
}*/
//синтаксис async
export const fetchUsersThunk = (page?:number):AppThunk => async dispatch => {
     dispatch(setInitializeStatusAC(true))
    try {
        const res = await UsersAPI.getUsers(page)
        dispatch(setUsersAC(res.data.items))
        dispatch(setTotalCountsAC(res.data.totalCount))
        dispatch(setInitializeStatusAC(false))
    }catch (e){
        throw new Error()
    }
}

export type UsersActionsType =
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setTotalCountsAC>
