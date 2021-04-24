import React, { Component } from 'react';

class API extends Component {

    state = {
        error: null,
        isLoaded: false,
        users: []
    };

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(data => {this.setState({
                    isLoaded: true,
                    users: data
                });
            },
                error => {this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
render () {
    const {isLoaded, error, users} = this.state;
    return (
        <React.Fragment>
            <h1>Random User</h1>
            {(error) && <div>{error.message}</div>}
            {!isLoaded ? <div>Loading...</div> : 
            users.map(user => {
                const {username, name, email} = user;
                return (
                    <div key = {username}>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <hr/>
                    </div>
                    );
                }   
            )        
        }
        </React.Fragment>
    )        
    };
}

export default API