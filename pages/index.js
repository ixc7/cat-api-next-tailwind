import { get } from 'https'
import { useState, useEffect } from 'react'
import Image from 'next/image'

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

  // TODO better error handling
  useEffect(() => {
    if (!localStorage.getItem('apiData')) {
      // nothing cached, fetch data from API
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
    } else {
      // use cache
      setData(JSON.parse(localStorage.getItem('apiData')))
    }
  }, [])

  return (
    <main className='container mx-auto'>

      <div className='container top-0 px-2 bg-cyan-100 flex justify-between fixed z-10'>
        <Search query={query} runQuery={runQuery} />
        <Pagination page={page} pages={pages} setPage={setPage} />
      </div>

      <div className='bg-cyan-800 mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {matches()
          .slice(0 + page * max, max + page * max)
          .map(({ name, image, description, affection_level }) => (
            <div key={name} className='border-solid border-2 border-cyan-900 px-2'>
              {image?.url
                ? (
                  <Image src={image.url} width='100' height='100' alt='image' />
                  )
                : (
                  <span>(No Image)</span>
                  )}
              <ul>
                <li>
                  <em>{name}</em>
                </li>
                <li>
                  <em>{description}</em>
                </li>
                <li>
                  <em>Affection Level: {affection_level}</em>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </main>
  )
}

export default Home
