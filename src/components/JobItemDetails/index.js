import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const keys = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    currStatus: keys.initial,
    jobData: {},
    similarJobsData: [],
    skillsList: [],
    companyDetail: {},
  }

  componentDidMount() {
    this.setState({currStatus: keys.inprogress})
    this.getJobDetails()
  }

  getJobDetails = async smData => {
    this.setState({currStatus: keys.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const urlValue = smData === undefined ? id : smData
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${urlValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()

      const jobData = {
        companyLogoUrl: responseData.job_details.company_logo_url,
        companyWebsiteUrl: responseData.job_details.company_website_url,
        employmentType: responseData.job_details.employment_type,
        id: responseData.job_details.id,
        jobDescription: responseData.job_details.job_description,
        skills: responseData.job_details.skills,
        lifeAtCompany: responseData.job_details.life_at_company,
        location: responseData.job_details.location,
        packagePerAnnum: responseData.job_details.package_per_annum,
        rating: responseData.job_details.rating,
        title: responseData.job_details.title,
      }

      const similarJobsData = responseData.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const skillsList = jobData.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const companyDetail = {
        description: jobData.lifeAtCompany.description,
        imageUrl: jobData.lifeAtCompany.image_url,
      }
      this.setState({currStatus: keys.success})
      this.setState({jobData, similarJobsData, skillsList, companyDetail})
    } else {
      this.setState({currStatus: keys.failure})
    }
  }

  loadingView = () => (
    <div className="loading-view">
      <div className="loader-container">
        <Loader type="ThreeDots" color="red" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-logo"
      />
      <h1 className="failure-head">failure view Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot Seem to find the page you are looking for.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobsData, skillsList, companyDetail} = this.state
    return (
      <>
        <div className="job-details-main-container">
          <div className="company-profile-container">
            <img
              src={jobData.companyLogoUrl}
              alt="company-logo"
              className="company-logo"
            />
            <div className="job-name-rating-main-container">
              <h1 className="job-title">{jobData.title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-star" />
                <p className="rating">{jobData.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-salary-bg-container">
            <div className="location-job-type-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-head">{jobData.location}</p>
              </div>
              <div className="location-container">
                <MdWork className="location-icon" />
                <p className="location-head">{jobData.employmentType}</p>
              </div>
            </div>
            <p className="lpa">{jobData.packagePerAnnum}</p>
          </div>
          <hr width="90%" color="#878888" />
          <div className="description-head-website-url-main-container">
            <h1 className="description-title">Description</h1>
            <a
              href={jobData.companyWebsiteUrl}
              className="website-url-container"
            >
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="description-para">{jobData.jobDescription}</p>
          <h1 className="skill-head">Skills</h1>
          <SkillsCard skillsList={skillsList} />
          <h1 className="skill-head">Life at Company</h1>
          <div className="company-life-style">
            <p className="company-life-style-para">
              {companyDetail.description}
            </p>
            <img
              src={companyDetail.imageUrl}
              alt="company img"
              className="company-life-style-img"
            />
          </div>
        </div>
        <h1 className="Similar-jobs-title">Similar Jobs</h1>
        <SimilarJobItem
          similarJobList={similarJobsData}
          getJobDetails={this.getJobDetails}
        />
      </>
    )
  }

  renderJobDetails = () => {
    const {currStatus} = this.state
    switch (currStatus) {
      case keys.inprogress:
        return this.loadingView()
      case keys.success:
        return this.renderSuccessView()
      case keys.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-page-container">
        <Header />
        <div className="job-details-bg-container">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
