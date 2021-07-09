import React from 'react'
import './LoginForm.css'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useForm } from 'react-hook-form'

const LoginForm = ({ isAuthenticated, authError, authenticate }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form className="login-form" onSubmit={handleSubmit(authenticate)}>
            <h1 data-testid="main-header" className="text-center">
                <span className="font-weight-bold">GitHub Repos Summary</span>
            </h1>
            <h2 data-testid="sub-header" className="text-center">
                Welcome
            </h2>
            {
                !isAuthenticated && authError &&
                <Alert data-testid="auth-error" color="danger">
                    {authError}
                </Alert>
            }
            <FormGroup>
                <Label>Username</Label>
                <Input data-testid="username-field" type="text" name="username" placeholder="Username" {...register('username', { required: true })} />
                {errors.username && errors.username.type === "required" && <Alert data-testid="username-required" color="danger">Username is required</Alert>}
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input data-testid="password-field" type="password" name="password" placeholder="Password" {...register('password', { required: true })} />
                {errors.password && errors.password.type === "required" && <Alert color="danger">Password is required</Alert>}

            </FormGroup>
            <Button data-testid='login-btn' className="btn-lg btn-dark btn-block">Log in</Button>
        </Form>
    );
}

export default LoginForm