import React, { Component } from 'react';
import axios from "axios";

class APIAxios extends Component {
    state = {
        isLoaded: false,
        users: [],
        error: null
    }

    componentDidMount () {
        axios.get("https://randomuser.me/api/?results=5")
            .then(response => this.setState({
                isLoaded: true,
                users: response.data.results
            }))
            .catch(error => this.setState({error, isLoaded: true}));
    }

    render() {
        const {isLoaded, error, users} = this.state;
        return (
        <>
            <h1>Random User</h1>
            {(error) && <div>{error.message}</div>}
            {!isLoaded ? <div>Loading...</div>:
            users.map(user => {
                const {name, login, email, picture} = user;
                return (
                   <div key = {login.username}>
                       <p>{name.first} {name.last}</p>
                       <img src = {picture.thumbnail}/>
                       <p>{email}</p>
                       <hr/>
                   </div> 
                );
            })
            }
        </>
        )}
}

export default APIAxios