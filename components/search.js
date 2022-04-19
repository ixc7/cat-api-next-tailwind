import { useState } from 'react'

const Search = ({ query, runQuery }) => {
  const [value, setValue] = useState('')

  const clear = () => {
    runQuery('')
  }

  const onChange = e => {
    setValue(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    runQuery(value)
    setValue('')
  }

  return (

    <form onSubmit={onSubmit} className='text-slate-600'>
      <input type='text' placeholder='Search...' value={value} onChange={onChange} className='focus:outline-none' />
      {query
        ? (
          <span onClick={clear} className='cursor-pointer select-none'>
            [<em className='text-slate-900'>{query}</em>]<span className='relative inline-block hover:-translate-y-px hover:scale-105 hover:text-slate-900'>[X]</span>
          </span>
          )
        : (
          <input type='submit' value='[>]' className='cursor-pointer select-none hover:-translate-y-px hover:scale-105 hover:text-slate-900' />
          )}
    </form>
  )
}

export default Search
