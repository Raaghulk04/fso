const Course = ({course}) => {
	return (
		<><h1>{course.name}</h1>
			{course.parts.map(part =>
				<p key={part.id}>{part.name} {part.exercises}</p>
			)}
			<p><b> total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercise</b></p>	
		</>
	)
}

export default Course;