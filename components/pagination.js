const Pagination = ({ page, pages, setPage }) => (
  <div className='bg-cyan-600'>
    {page > 0
      ? (
        <button onClick={() => {setPage(page - 1)}}>
          {'<'}
        </button>
      ) : (
        <span>&nbsp;&nbsp;</span>
      )
    }

    {[...Array(Math.ceil(pages()))].map((x, i) => {
      return (
        <button key={x} onClick={() => { setPage(i) }} className={i === page ? 'bold' : ''}>
          {i + 1}
        </button>
      )
    })}

    {page < pages() - 1
      ? (
        <button onClick={() => { setPage(page + 1) }}>
          {'>'}
        </button>
      ) : (
        <span>&nbsp;&nbsp;</span>
      )
    }
  </div>
)

export default Pagination
