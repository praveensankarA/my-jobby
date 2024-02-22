import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'

const JobCard = props => {
  const {jobList} = props

  return (
    <div className="job-card-main-container">
      {jobList.length === 0 ? (
        <div className="empty-list-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt=""
            className="empty-list-logo"
          />
          <h1 className="empty-head">No jobs Founded</h1>
          <p className="empty-sub-title">
            We could not find any jobs ,try other filters.
          </p>
        </div>
      ) : (
        <ul className="job-item-container">
          {jobList.map(each => (
            <Link to={`/jobs/${each.id}`} className="link-ele">
              <li className="job-ele">
                <div className="logo-name-container">
                  <img
                    src={each.companyLogoUrl}
                    alt={each.id}
                    className="company-logo-job-card"
                  />
                  <div className="timing-and-rating-main-container">
                    <p className="name-of-roll">{each.title}</p>
                    <div className="rating-container">
                      <AiFillStar className="star" />
                      <p className="rating">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="work-location-sealery-container">
                  <div className="location-work-container">
                    <div className="location-container">
                      <MdLocationOn />
                      <p>{each.location}</p>
                    </div>
                    <div className="location-container">
                      <MdWork />
                      <p className="work-type">{each.employmentType}</p>
                    </div>
                  </div>
                  <p className="lpa">{each.packagePerAnnum}</p>
                </div>
                <hr className="job-card-hr" />
                <div className="description-container">
                  <p className="description-head">Description</p>
                  <p>{each.jobDescription}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JobCard
