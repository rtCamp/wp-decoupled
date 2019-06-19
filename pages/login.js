import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Mutation, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import client from '../components/ApolloClient';

const LOGIN_USER = gql`
  mutation LoginUser($username: String! $password: String!) {
    login(input: {
      clientMutationId: "uniqueId"
      username: $username
      password: $password
    }) {
      authToken
      user {
        id
        userId
        name
      }
    }
  }
`;

class Login extends Component {

	handleLogin = async (event, login) => {
		event.preventDefault();
		const { username, password } = this.state;

		await login({ variables: { username, password } })
			.then(response => this.handleLoginSuccess(response))
			.catch(err => this.handleLoginFail(err))
	};

	handleLoginSuccess = response => {
		console.warn( response );
		// localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data.login));
		// this.props.history.push('/profile');
		if(this._isMounted) {
			this.setState({
				validate: false,
				username: '',
				password: '',
				error: '',
			});
		}
		// this.props.history.push('/profile');
	};

	handleLoginFail = err => {
		const error = err.split('_').join(' ').toUpperCase();

		if(this._isMounted) {
			this.setState({
				validate: true,
				loading: false,
				error ,
			});
		}
	};

	handleUsername = username => {
		this.setState({ username });
	}

	handlePassword = password => {
		this.setState({ password });
	}

	renderMessage(loading, error) {
		if (error) {
			return (
				<Alert variant="danger">
					{this.state.error}
				</Alert>
			)
		} else if (loading) {
			return (
				<Alert variant="primary">
					Loading...
				</Alert>
			)
		}
	}

	render() {
		const { validate } = this.state;
		return (
			<ApolloProvider client={client}>
				<Mutation mutation={LOGIN_USER}>
					{(login, { loading, error }) => (
						<div className="container">
							<form
								method="POST"
								onSubmit={(event) => this.handleLogin(event, login)}
							>
								<h2>React WPGraphQL Auth</h2>
								<div className="form-group">
									<label htmlFor="username">Username</label>
									<input
										type="text"
										required
										placeholder="Username / Email"
										onChange={event => this.handleUsername(event.target.value)}
										value={this.state.username}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										required
										placeholder="Password"
										onChange={event => this.handlePassword(event.target.value)}
										value={this.state.password}
									/>
								</div>
								{this.renderMessage(loading, error)}
								<button className="btn btn-secondary" type="submit">
									Login
								</button>
							</form>
						</div>
					)}
				</Mutation>
			</ApolloProvider>
		)
	}
}

export default Login;
