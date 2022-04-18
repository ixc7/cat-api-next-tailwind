import { useState } from 'react'

const Search = () => {
  const [query, setQuery] = useState('')
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
    setQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setValue('')
    console.log(`submit: '${query}'`)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Search..." value={value} onChange={onChange} />
        <input type="submit" value=">" />
      </form>
    </div>
  )
}

export default Search
