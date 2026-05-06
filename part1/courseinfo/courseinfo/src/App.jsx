import { useState } from 'react'

const Header = ({text}) => {
	return <h1><b>{text}</b></h1>
}
const Statistics = ({good, neutral, bad}) => {
	const all = () => good + neutral + bad;
	const avg = () => (good - bad) / all();
	const positive = () => good / all();
	if (all() === 0) {
		return <p>No Feedback given</p>
	} else {

	
		return <table>
				<tr>good {good}</tr>
				<tr>neutral {neutral}</tr>
				<tr>bad {bad}</tr>
				<tr>all {all()}</tr>
				<tr>average {avg()}</tr>
				<tr>positive {positive()}</tr>
			</table>
	}
}
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGoodFeedback = () => {
		setGood(good + 1)
	}

	const handleBadFeedback = () => {
		setBad(bad + 1)
	}

	const handleNeutralFeedback = () => {
		setNeutral(neutral + 1)
	}

	const all = () => good + bad + neutral
	const positive = () => good / all()
	const average = () => (good - bad) / all()

	return (
		<div>
			<Header text='give feedback'/>
			<Button onClick={handleGoodFeedback} text='good'></Button>
			<Button onClick={handleNeutralFeedback} text='neutral'></Button>
			<Button onClick={handleBadFeedback} text='bad'></Button>
			<Header text='statistics'/>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
