import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaHome} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {ImExit} from 'react-icons/im'

const Header = props => {
  const logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="nav-website-logo"
          className="nav-web-logo"
        />
      </Link>
      <div className="mobile-nav-item-container">
        <Link to="/">
          <FaHome color="white" />
        </Link>
        <Link to="/jobs">
          <MdWork color="white" />
        </Link>
        <ImExit size="23px" color="white" onClick={logoutFunction} />
      </div>
      <div className="lg-nav-item-container">
        <Link to="/">
          <p className="nave-home-btn-ele">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="nave-home-btn-ele">Jobs</p>
        </Link>
      </div>
      <button type="button" onClick={logoutFunction} className="logout-btn">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
