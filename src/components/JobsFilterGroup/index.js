import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilterGroup = props => {
  const {onChangeSealery, onChangeEmpType} = props
  const renderCategoryFilter = () => (
    <div>
      <h1 className="employment-head">Type of Employment</h1>
      <ul className="checkbox-container">
        {employmentTypesList.map(each => (
          <li>
            <input
              type="checkbox"
              className="checkbox-ele"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onClick={onChangeEmpType}
            />
            <label
              className="checkbox-label-ele"
              htmlFor={each.employmentTypeId}
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr-line check-box-hr" />
      <h1 className="employment-head">Salary Range</h1>

      <ul className="radio-container">
        {salaryRangesList.map(each => (
          <li>
            <input
              type="radio"
              className="checkbox-ele"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              name="choose"
              onClick={onChangeSealery}
            />
            <label className="checkbox-label-ele" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr-line check-box-hr" />
    </div>
  )

  return <div className="filter-main-container">{renderCategoryFilter()}</div>
}

export default JobFilterGroup
