import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ProfileActionsType, ProfileReducer} from "./reducers/profile-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {UsersActionsType, UsersReducer} from "./reducers/users-reducer";
import {InitializationActionsType, InitializeReducer} from "./reducers/initialization-reducer";
import {AuthActionsType, AuthMeReducer} from "./reducers/authMe-reducer";


const rootReducer = combineReducers({
    profile: ProfileReducer,
    usersPage: UsersReducer,
    initialize: InitializeReducer,
    authMe: AuthMeReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AllActionsType = UsersActionsType | AuthActionsType | InitializationActionsType | ProfileActionsType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>