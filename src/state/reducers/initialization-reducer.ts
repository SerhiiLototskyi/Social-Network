type initialStateType = {
    initializeProgress: boolean
}

const initialState: initialStateType = {
    initializeProgress: false
}

export const InitializeReducer = (state: initialStateType = initialState, action: InitializationActionsType): initialStateType => {
    switch (action.type) {
        case 'SET-INITIALIZE-STATUS':
            return {
                ...state, initializeProgress: action.initializeValue
            }

        default:
            return state
    }
}

export const setInitializeStatusAC = (initializeValue: boolean) => ({
    type: 'SET-INITIALIZE-STATUS',
    initializeValue
} as const)


export type InitializationActionsType =
    | ReturnType<typeof setInitializeStatusAC>
