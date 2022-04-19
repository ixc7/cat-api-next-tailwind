import { useState } from 'react'

const Search = ({ query, runQuery }) => {
  const [value, setValue] = useState('')

  const clear = () => {
    runQuery('')
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    runQuery(value)
    setValue('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Search..." value={value} onChange={onChange} />
      { query ? <span onClick={clear}>[<em>{query}</em>][X]</span> : <input type="submit" value="[>]" /> }
    </form>
  )
}

export default Search
