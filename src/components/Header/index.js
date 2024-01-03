import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  isLogoutClick = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <>
        <nav className="header-mobile-view-container">
          <Link to="/" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mobile-header-website-logo"
            />
          </Link>
          <ul className="mobile-header-log-items">
            <li>
              <Link to="/">
                <IoMdHome className="header-icon" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsBriefcaseFill className="header-icon" />
              </Link>
            </li>
            <li>
              <FiLogOut onClick={this.isLogoutClick} className="logout-icon" />
            </li>
          </ul>
        </nav>

        {/* ------------ lg-view --------------- */}

        <div className="header-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-main-logo"
            />
          </Link>
          <ul className="home-jobs-container">
            <li>
              <Link className="nav-item-text" to="/">
                Home{' '}
              </Link>
            </li>
            <Link to="/jobs" className="nav-item-text">
              Jobs{' '}
            </Link>
          </ul>
          <button
            type="button"
            onClick={this.isLogoutClick}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </>
    )
  }
}
export default withRouter(Header)
