import React, { useState } from 'react';
import axios from 'axios';
import TokenService from '../services/tokenService';

const LogIn = (props) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: '/api/users/logIn',
            method: 'put',
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                username: state.username,
                password: state.password
            }
        }).then((res) => {
            console.log(res.data.token);
            TokenService.saveToken(res.data.token);
            props.history.push('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            Username <br/>
            <input type="text" name="username" value={state.username} onChange={onChange}/> <br/>
            Password <br/>
            <input type="password" name="password" value={state.password} onChange={onChange}/> <br/>
            <input type="submit" /> <br/>
        </form>
    );
};

export default LogIn;