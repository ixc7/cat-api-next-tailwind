import { useState } from 'react'

const Search = ({ query, setQuery }) => {
  const [value, setValue] = useState('')

  const clear = () => {
    setQuery('')
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setQuery(value)
    setValue('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Search..." value={value} onChange={onChange} />
        { query ? <span onClick={clear}>[<em>{query}</em>][X]</span> : <input type="submit" value="[>]" /> }
      </form>
    </div>
  )
}

export default Search
