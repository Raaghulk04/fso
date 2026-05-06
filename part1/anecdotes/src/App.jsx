import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const votes = Array(anecdotes.length).fill(0)
  const getRandomInt = (max) => Math.floor(Math.random() * max)
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(votes)
  const handleNextQuote = () => {
    setSelected(getRandomInt(anecdotes.length));
  }
  const handleVoting = () => {
    const copy = {...voted}
    copy[selected] += 1
    setVoted(copy)
  }

  const findMostVotes = () => {
    let max = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (voted[i] > voted[max]) {
        max = i;
      }
    }
    return max;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>
      <Button onClick={handleVoting} text="vote" />
      <Button onClick={handleNextQuote} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[findMostVotes()]}</p>
      <p>has {voted[findMostVotes()]} votes</p>
    </div>
  )
}

export default App