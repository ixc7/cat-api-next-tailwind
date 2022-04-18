import { get } from 'https'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Search from './Search'

const Home = () => {
  const [data, setData] = useState([])

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
      <Search />

      <div className='bg-cyan-800'>
        {data.map(({ name, image, description, affection_level }) => (
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
