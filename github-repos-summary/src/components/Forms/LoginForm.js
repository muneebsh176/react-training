import React from 'react'
import './LoginForm.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

const LoginForm = () => {
    return (
        <Form className="login-form">
            <h1 data-testid="main-header" className="text-center">
                <span className="font-weight-bold">GitHub Repos Summary</span>
            </h1>
            <h2 data-testid="sub-header" className="text-center">
                Welcome
            </h2>
            <FormGroup>
                <Label>Username</Label>
                <Input data-testid="username-field" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" />
            </FormGroup>
            <Button data-testid='login-btn' className="btn-lg btn-dark btn-block">Log in</Button>
        </Form>
    );
}

export default LoginForm