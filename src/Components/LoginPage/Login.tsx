import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import s from './Login.module.css'
import {useNavigate} from "react-router-dom";
import {signInThunk} from "../../state/reducers/authMe-reducer";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {ProfilePageType} from "../../state/reducers/profile-reducer";

type ProfilePropsType = {
    profileUser: ProfilePageType
}

export const SignIn = ({profileUser}: ProfilePropsType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const error = useAppSelector<string | undefined>(state => state.authMe.me.error)
    return (
        <div className={s.SignIn}>
            <h1>Sign In</h1>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        // @ts-ignore
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        // @ts-ignore
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(signInThunk(values.email, values.password, values.rememberMe))
                    if (error === "") {
                        setSubmitting(true)
                        setTimeout(() => {
                            navigate('/')
                        }, 1000)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form className={s.form}>
                        <div>
                            <Field type="email" name="email"/>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div>
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div>
                            <Field type="checkbox" name="rememberMe"/> Remember Me
                            <ErrorMessage name="rememberMe" component="div"/>
                        </div>
                        {error != '' ? error: "Error"}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

