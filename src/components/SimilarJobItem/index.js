import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobList, getJobDetails} = props
  return (
    <div className="similar-job-bg-container">
      <ul className="similar-job-main-container">
        {similarJobList.map(each => (
          <li
            className="similar-job-item"
            onClick={() => getJobDetails(each.id)}
          >
            <div className="company-profile-container">
              <img
                src={each.companyLogoUrl}
                alt="company-logo"
                className="similar-company-logo"
              />
              <div className="similar-job-name-rating-main-container">
                <h1 className="similar-job-title">{each.title}</h1>
                <div className="similar-rating-container">
                  <AiFillStar className="rating-star" />
                  <p className="rating">4</p>
                </div>
              </div>
            </div>
            <h1 className="similar-job-description-title">Description</h1>
            <p className="similar-job-description-para">
              {each.jobDescription}
            </p>

            <div className="similar-job-location-job-type-container">
              <div className="similar-job-location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-head">{each.location}</p>
              </div>
              <div className="similar-job-type-container">
                <MdWork className="location-icon" />
                <p className="location-head">{each.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobItem
