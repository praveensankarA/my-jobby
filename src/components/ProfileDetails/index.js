import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const key = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {currStatus: key.initial}

  componentDidMount() {
    this.setState({currStatus: key.inprogress})
    this.getUserData()
  }

  getUserData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const updatedResponseData = {
        name: responseData.profile_details.name,
        profileImageUrl: responseData.profile_details.profile_image_url,
        shortBio: responseData.profile_details.short_bio,
      }
      this.setState({
        currStatus: key.success,
        profileDetails: updatedResponseData,
      })
    } else {
      this.setState({currStatus: key.failure})
    }
  }

  // Loading-view----------------------

  loadingView = () => (
    <div className="profile-details-loading-view-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  // Success-view----------------------

  successView = () => {
    const {profileDetails} = this.state
    console.log(profileDetails)
    return (
      <div className="profile-details-success-view">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile logo"
          className="user-picture"
        />
        <h1 className="user-name">{profileDetails.name}</h1>
        <p className="user-bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  // Failure-view----------------------

  failureView = () => (
    <div className="profile-details-failure-view">
      <button
        onClick={this.getUserData}
        type="button"
        className="profile-details-failure-view-btn"
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {currStatus} = this.state

    switch (currStatus) {
      case key.inprogress:
        return this.loadingView()
      case key.success:
        return this.successView()
      case key.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-details-main-bg-container">
        {this.renderProfile()}
        <hr className="hr-line" />
      </div>
    )
  }
}

export default ProfileDetails
