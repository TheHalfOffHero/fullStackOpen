const Course = ({ courses }) => {
    return (
        <div>
        <Header course={courses} />
        <Content parts={courses.parts} />
        <Total parts={courses.parts} />
        </div>
    )
}

const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
        {props.parts.map(part => <Part key={part.name} part={part} />)}
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>
                <b>Total of {props.parts.reduce((acc, part) => acc + part.exercises, 0)} excercises</b>
            </p>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}

export default Course;