import { get } from 'https'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Search from '../components/search'

// TODO cache in localStorage
// TODO better error handling
// TODO pagination
//
//      max: 20
//      page count: Math.ceil(data.length / max)
//                  store count in state (67 items/4 pages)
//                  recalculate count on each new query
//
//      store current page index in state (0-3)
//      reset index to 0 on each new query
//
//      render (a-b) range of items:
//      data.slice(0 + (max * currentPage), max + (max * currentPage))
//
//      render buttons based on count: <-[1][2][3][4]->
//      highlight current index
//      buttons change index and should be enabled/disabled accordingly.

const Home = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const max = 20

  const runQuery = q => {
    setQuery(q)
    setPage(0)
  }

  useEffect(() => {
    get('https://api.thecatapi.com/v1/breeds', res => {
      if (res.statusCode !== 200) return setData([{ Error: 'Invalid response code' }])

      let acc = ''
      res.on('data', d => (acc += d))

      res.on('end', () => {
        try {
          setData(JSON.parse(acc))
        } catch (e) {
          setData([{ Error: 'Error fetching data' }])
        }
      })
    })
  }, [])

  return (
    <main className='container'>
      <Search query={query} runQuery={runQuery} />

      <div className='bg-cyan-600'>
        {
          page > 0 ? <button onClick={() => { setPage(page - 1) }}>{'<'}</button> : <span>&nbsp;&nbsp;</span>
        }

        {[
          ...Array(
            Math.ceil(
              data.filter(x => x.name.toLowerCase().includes(query.toLowerCase())).length / max
            )
          )
        ].map((x, i) => {
          return (
            <button
              key={x}
              onClick={() => {
                setPage(i)
              }}
              className={i === page ? 'bold' : ''}
            >
              {i + 1}
            </button>
          )
        })}

        {
          page < ( data.filter(x => x.name.toLowerCase().includes(query.toLowerCase())).length / max ) - 1 ? <button onClick={() => { setPage(page + 1) }}>{'>'}</button> : <span>&nbsp;&nbsp;</span>
        }
      </div>

      <div className='bg-cyan-800'>
        {data
          .filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0 + (page * max), max + (page * max))
          .map(({ name, image, description, affection_level }) => (
            <div key={name}>
              {image?.url
                ? (
                  <Image src={image.url} width='100' height='100' alt='image' />
                  )
                : (
                  <span>(No image)</span>
                  )}
              <ul>
                <li>
                  <em>Name</em>: {name}
                </li>
                <li>
                  <em>Description</em>: {description}
                </li>
                <li>
                  <em>Affection Level</em>: {affection_level}
                </li>
              </ul>
            </div>
          ))}
      </div>
    </main>
  )
}

export default Home
