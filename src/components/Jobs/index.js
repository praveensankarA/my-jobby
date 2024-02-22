import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobsFilterGroup from '../JobsFilterGroup'
import JobCard from '../JobCard'

import './index.css'

const keys = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    currStatus: keys.initial,
    jobList: [],
    sealeryRange: '',
    employmentType: [],
    searchInput: '',
  }

  componentDidMount() {
    this.setState({currStatus: keys.initial})
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({currStatus: keys.inprogress})
    const {sealeryRange, searchInput, employmentType} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = ` https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${sealeryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobDetails = await response.json()
      const updatedList = jobDetails.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobList: updatedList, currStatus: keys.success})
    } else {
      this.setState({currStatus: keys.failure})
    }
  }

  searchInputOnchange = event => {
    this.setState({searchInput: event.target.value}, this.getJobData)
  }

  onChangeSealery = event => {
    this.setState({sealeryRange: event.target.value}, this.getJobData)
  }

  onChangeEmpType = event => {
    const {employmentType} = this.state

    if (event.target.checked === true) {
      this.setState(
        {employmentType: [...employmentType, event.target.value]},
        this.getJobData,
      )
    } else {
      const index = employmentType.indexOf(event.target.value)
      const newList = employmentType
      employmentType.splice(index, 1)
      console.log(newList)
      this.setState({employmentType: newList}, this.getJobData)
    }
  }

  loadingView = () => (
    <div className="loading-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt=""
        className="failure-logo"
      />
      <h1 className="failure-head">Oops! Something Went Wrong </h1>
      <p className="failure-sub-line">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-btn" onClick={this.getJobData} type="button">
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {jobList} = this.state
    return <JobCard jobList={jobList} />
  }

  renderJobCardItems = () => {
    const {currStatus} = this.state

    switch (currStatus) {
      case keys.inprogress:
        return this.loadingView()
      case keys.failure:
        return this.failureView()
      case keys.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {jobList, searchInput} = this.state

    return (
      <div className="jobs-page-main-bg">
        <Header />
        <div className="jobs-page-main-container  ">
          <div className="profile-and-filter-items-main-container">
            <ProfileDetails />
            <JobsFilterGroup
              onChangeSealery={this.onChangeSealery}
              onChangeEmpType={this.onChangeEmpType}
            />
            <div className="search-bar-container sm-search-bar">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.searchInputOnchange}
              />
              <BsSearch className="search-icon" />
            </div>
          </div>
          <div className="main-job-card-items-bg-container">
            <div className="search-bar-container  lg-search-bar">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.searchInputOnchange}
                className="search-input"
              />
              <BsSearch className="search-icon" />
            </div>
            <div className="job-card-items-container">
              {this.renderJobCardItems()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
