import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isErr: false}

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.setState({isErr: false, errMsg: ''})
      this.onSuccess(data.jwt_token)
    } else {
      const errmsg = data.error_msg
      this.setState({isErr: true, errMsg: errmsg})
    }

    this.setState({username: '', password: ''})
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isErr, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <form className="form-container" onSubmit={this.SubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-page-logo"
          />
          <div className="input-container">
            <label htmlFor="nameInput" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              onChange={this.updateUserName}
              value={username}
              placeholder="Username"
              className="name-input"
              id="nameInput"
            />
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              onChange={this.updatePassword}
              value={password}
              placeholder="Password"
              className="login-input"
              id="password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {isErr && <p className="err-msg">*{errMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
