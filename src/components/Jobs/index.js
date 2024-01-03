import {Component} from 'react'
import UserDetails from '../UserDetails'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  render() {
    const a = 10
    return (
      <div className="jobs-main-container">
        <Header className="header" />
        <div className="main-job-flex-container">
          <div className="user-details-and-filter-container">
            {/* <input type="imput"  className=""/> */}
            <div className="user-details">
              <UserDetails />
              <hr className="hr" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
