import { get } from 'https'
import { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'

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
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
        {
          data.map(x => (
            <div key={x.name} className={styles.card}>
                <ul>
                  <li>Name: {x.name}</li>
                  <li>Description: {x.description}</li>
                  <li>Affection: {x.affection_level}</li>
                </ul>
            </div>
          ))
        }
        </div>
      </main>
    </div>
  )
}

export default Home
