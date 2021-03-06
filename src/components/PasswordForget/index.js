import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';
import {SignUpFormContainer, SignUpContainter} from '../SignUp';
import { StyledInput, StyledButton } from '../SearchWordForm';

const PassForgetForm = styled(SignUpFormContainer)` 
`

const PasswordForgetButton = styled(StyledButton)`
    color: #fff;
    background-color: #185C5E;

    &:disabled {
        cursor:default;
        color: #000;
        background-color: #656970;
      }
`
const PasswordForgetPageDiv = styled(SignUpContainter)`
`

const PasswordForgetPage = () => (
    <PasswordForgetPageDiv>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </PasswordForgetPageDiv>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';

        return (
            <PassForgetForm onSubmit={this.onSubmit}>
                <StyledInput
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <PasswordForgetButton disabled={isInvalid} type="submit">
                    Reset My Password
                </PasswordForgetButton>
                {error && <p>{error.message}</p>}
            </PassForgetForm>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };