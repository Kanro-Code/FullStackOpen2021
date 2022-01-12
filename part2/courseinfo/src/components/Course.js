const Course = ({course}) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
  </div>
)

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Content = ({parts}) => { 
  let total = parts.reduce((sum, part) => sum + part.exercises, 0)

  console.log(total)
  return(
  <ul>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <li><b>total of {total} excercises</b></li>
  </ul>
)}

const Part = ({name, exercises}) => (
  <li>{name} {exercises}</li>
)

export default Course