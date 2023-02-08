import axios from "axios";
import {UsersItemType} from "../state/reducers/users-reducer";
import {ProfileType} from "../state/reducers/profile-reducer";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6408b3a3-6577-4f97-aa9e-f7b63990ec1a'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    ...settings,
})


export const ProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    setStatus(status:string) {
        return instance.put(`/profile/status`, status)
    },
    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    savePhoto(photo: any) {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
}
export const AuthMeAPI = {
    getAuth() {
        return instance.get('/auth/me')
    },
    signIn(email: string, password: string, rememberMe: boolean) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('/auth/login',)
    }
}
export const UsersAPI = {
    getUsers(page?: number) {
        return instance.get<UsersItemType>(`/users?page=${page}`)
    },

    followUser(userId: string) {
        return instance.post(`/follow/${userId}`)
    },
    unFollowUser(userId: string) {
        return instance.delete(`/follow/${userId}`)
    },

}

