import { Component } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    showPassword: false,
    redirect: false, // Tracks redirection
  };

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    this.setState({ redirect: true }); // Trigger navigation to /home
  };

  onFailureLogin = errorMsg => {
    this.setState({ errorMsg, showErrorMsg: true });
  };

  onSubmitForm = async event => {
    event.preventDefault();
    let { username, password } = this.state;

    if (username.toLowerCase().trim(' ') === 'santosh') username = 'rahul';
    if (password === 'santosh@2023') password = 'rahul@2021';

    const userDetails = { username, password };
    const LoginApiUrl = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(LoginApiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token);
    } else {
      this.onFailureLogin(data.error_msg);
    }
  };

  updateUsername = event => this.setState({ username: event.target.value });

  updatePassword = event => this.setState({ password: event.target.value });

  togglePasswordVisibility = () =>
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="username" className="login-input-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="login-input-field"
          placeholder="santosh"
          id="username"
          onChange={this.updateUsername}
        />
      </div>
    );
  };

  renderPasswordField = () => {
    const { password, showPassword } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="login-input-label">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          className="login-input-field"
          placeholder="santosh@2023"
          id="password"
          onChange={this.updatePassword}
        />
        <div className="showPassword">
          <input
            type="checkbox"
            id="showPassword"
            className="checkfield"
            onClick={this.togglePasswordVisibility}
          />
          <label htmlFor="showPassword" className="showPassword-label">
            Show Password
          </label>
        </div>
      </div>
    );
  };

  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      return <Navigate to="/home" replace />; // Redirect to /home if already logged in
    }

    const { errorMsg, showErrorMsg, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/home" replace />; // Redirect to /home after successful login
    }

    return (
      <div className="login-container">
        <div className="newform">
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="heading1">Nxt Quiz</h1>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
