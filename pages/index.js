import { get } from 'https'
import { useState, useEffect } from 'react'

import Pagination from '../components/pagination'
import Search from '../components/search'

const Home = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const max = 20
  const matches = () => data.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
  const pages = () => matches().length / max
  const runQuery = q => {
    setQuery(q)
    setPage(0)
  }

  const getSearchStatus = () => { return matches().length && query ? <span><span className='font-medium'>{matches().length}</span> results for <em className='font-medium'>{query}</em></span> : (query ? <span>no results</span> : null ) }

  useEffect(() => {
    // nothing cached, fetch data from API
    // TODO format error responses (they will break rn.)
    if (!localStorage.getItem('apiData')) {
      get('https://api.thecatapi.com/v1/breeds', res => {
        if (res.statusCode !== 200) return setData([{ Error: 'Invalid response code' }])

        let acc = ''
        res.on('data', d => (acc += d))

        res.on('end', () => {
          try {
            localStorage.setItem('apiData', acc)
            setData(JSON.parse(acc))
          } catch (e) {
            setData([{ Error: 'Error fetching data' }])
          }
        })
      })
    // use cached data to save on API calls
    // (returned value is always the same)
    } else {
      setData(JSON.parse(localStorage.getItem('apiData')))
    }
  }, [])

  // TODO move grid to separate component (this looks unreadable rn.)
  return (
    <main className='container mx-auto'>
      <div className='container top-0 px-3 py-1.5 bg-slate-400 flex justify-between fixed z-10 shadow-lg'>
        <Search query={query} runQuery={runQuery} />
        <div className='container absolute mx-auto w-full text-center select-none pointer-events-none'><h2 className='font-bold text-slate-500 invisible md:visible'>Cat Breed Finder</h2></div>
        <Pagination page={page} pages={pages} setPage={setPage} status={getSearchStatus()} />
      </div>

      <div className='mt-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {matches()
          .slice(0 + page * max, max + page * max)
          .map(({ name, image, description, affection_level }, i) => (
            <div key={name} className={`m-2 cursor-pointer lg:hover:bg-slate-300 hover:shadow-lg lg:hover:scale-105 lg:hover:-translate-y-0.5 transition-transform duration-300 ease-out ${i % 2 === 0 ? 'bg-slate-50' : 'hover:bg-slate-100'}`}>
                {
                  image?.url ? (
                    <div className={`${i % 2 === 0 ? 'bg-slate-50' : ''} relative bg-contain lg:bg-transparent lg:bg-cover bg-no-repeat bg-center w-full lg:h-48 h-60 my-2`} style={{'backgroundImage': `url(${image.url})`}}></div>
                  ) : (
                    <div className='w-full lg:h-48 h-60 my-2 flex flex-col justify-end text-right p-1.5 light italic bg-slate-200 text-slate-500'>(No Image)</div>
                  )
                }

                <div className='p-1'>
                  <p className='font-medium text-slate-900'>{name}</p>
                  <p className='text-xs pb-1.5 text-slate-800'>Affection Level: {affection_level}</p>
                  <p className='italic text-sm py-1 text-slate-600'>{description}</p>
                </div>
            </div>
          ))}
      </div>
    </main>
  )
}

export default Home
