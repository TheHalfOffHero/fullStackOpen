const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    //Final content should look similar to this

    
    //<div>
    //  <Header course={course} />
    //  <Content ... />
    //  <Total ... />
    //</div>

    <div>
      <Header course={course} />
      <Content part1={part1} excercise1={exercises1} part2={part2} excercise2={exercises2} part3={part3} excercise3={exercises3}/>
      <Total excercise1={exercises1} excercise2={exercises2} excercise3={exercises3}/>
    </div>
  )
}

//Header should take care of rendering the name of the course
const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

//Content should render the parts and their number of excercises 
const Content = (props) => {
  return (
    <div>
      <p>{props.part1} {props.excercise1}</p>
      <p>{props.part2} {props.excercise2}</p>
      <p>{props.part3} {props.excercise3}</p>
    </div>
  )
}

//Total should render the total number of excercises
const Total = (props) => {
  return (
    <div>
      <p>Number of excercises {props.excercise1 + props.excercise2 + props.excercise3}</p>
    </div>
  )
}

export default App
