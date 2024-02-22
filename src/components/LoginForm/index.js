import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {name: 'rahul', password: 'rahul@2021', isErr: false, errMsg: ''}

  nameOnchange = event => {
    this.setState({name: event.target.value})
  }

  passwordOnchange = event => {
    this.setState({password: event.target.value})
  }

  loginOnSubmitFunction = async event => {
    event.preventDefault()
    const {name, password, errMsg, isErr} = this.state
    const userDetails = {
      username: name,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({errMsg: '', isErr: false})

      const responseData = await response.json()
      const jwtToken = responseData.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      const responseData = await response.json()
      this.setState({errMsg: responseData.error_msg, isErr: true})
    }
  }

  render() {
    const {name, password, errMsg, isErr} = this.state
    const jwtToken = Cookies.get('jwt_token')

    return (
      <div>
        {jwtToken !== undefined && <Redirect to="/" />}
        <div className="main-login-bg-container">
          <form
            className="login-form-container"
            onSubmit={this.loginOnSubmitFunction}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="main-logo"
              className="main-website-logo"
            />
            <div className="login-input-container">
              <label htmlFor="name" className="name-label">
                USERNAME
              </label>
              <input
                value={name}
                onChange={this.nameOnchange}
                className="input-ele"
                id="name"
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password" className="name-label">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.passwordOnchange}
                className="input-ele"
                id="password"
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isErr === true && <p className="err-msg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
