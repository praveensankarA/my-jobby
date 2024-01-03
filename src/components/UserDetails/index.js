import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import './index.css'

const key = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserDetails extends Component {
  state = {currStatus: null}

  componentDidMount() {
    this.setState({currStatus: key.inProgress, profileDetails: {}})
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookie.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileDetails: formattedData, currStatus: key.success})
    } else {
      this.setState({currStatus: key.failure})
    }
  }

  failureView = () => {
    const {profileDetails} = this.state
    return (
      <button className="retry-btn" type="button" onClick={this.getData}>
        Retry
      </button>
    )
  }

  loaderView = () => {
    const {profileDetails} = this.state
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  successView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-details-container">
        <img
          src={profileDetails.profileImageUrl}
          alt=""
          className="profile-logo"
        />
        <h1 className="name">{profileDetails.name}</h1>
        <p className="bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderProfile = () => {
    const {currStatus} = this.state

    switch (currStatus) {
      case key.inProgress:
        return this.loaderView()
      case key.failure:
        return this.failureView()
      case key.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-main-container">{this.renderProfile()}</div>
    )
  }
}

export default UserDetails
