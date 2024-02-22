import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {list: ''}

  findJob = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div className="home-main-bg-container">
        <Header />
        <div className="home-banner-container">
          <h1 className="main-home-title">Find The Job That Fits Your Life</h1>
          <p className="main-home-description">
            Millions of people are searching for jobs, salary informations,
            compony reviews. find the job that fits your abilities and
            potential.
          </p>
          <button type="button" onClick={this.findJob} className="find-job-btn">
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
