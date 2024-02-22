import './index.css'

const SkillsCard = props => {
  const {skillsList} = props
  return (
    <div className="skills-card-main-container">
      <ul className="skills-main-container">
        {skillsList.map(each => (
          <li className="skill-ele">
            <img src={each.imageUrl} alt={each.name} className="skill-logo" />
            <p className="skill-title">{each.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillsCard
