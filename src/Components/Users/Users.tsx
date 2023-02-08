import React, {ChangeEvent, useEffect} from 'react';
import s from "./UsersPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersThunk, UserType} from "../../state/reducers/users-reducer";
import {AppRootStateType} from "../../state/store";
import {User} from "../User/User";
import {LinearProgress, Pagination} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../state/hooks";

export const UsersPage = () => {

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.usersPage.items)
    const usersPageCount = useAppSelector(state => state.usersPage.totalCount)
    useEffect(() => {
        dispatch(fetchUsersThunk())
    }, [dispatch])

    const selectPage = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(fetchUsersThunk(page))
    }
    const countPagination = Math.round(usersPageCount / 10)

    return (
        <div className={s.UsersPage}>

            <Pagination count={countPagination} onChange={selectPage} color="primary"/>
            {
                users.map((u) => <User key={u.id}
                                       id={u.id}
                                       name={u.name}
                                       photos={u.photos}
                                       followed={u.followed}
                                       status={u.status}
                />)
            }

        </div>
    );
};

