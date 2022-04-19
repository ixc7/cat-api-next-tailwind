const Pagination = ({ page, pages, setPage, status}) => (
  <div className='text-slate-700 select-none'>
    {
      status ?
      <span>[{status}]{'    '}</span> : null
    }
    {page > 0
      ? (
        <button onClick={() => {setPage(page - 1)}} className='hover:-translate-y-px hover:scale-105 hover:text-slate-900'>
          {'[<]'}
        </button>
      ) : (
        <span>&nbsp;&nbsp;</span>
      )
    }

    <span>&nbsp;</span>

    {[...Array(Math.ceil(pages()))].map((x, i) => {
      return (
        <button key={i} onClick={() => { setPage(i) }} className='hover:-translate-y-px hover:scale-105 hover:text-slate-900'>
          <span className={i === page ? 'font-medium text-slate-900' : ''}>{i + 1}</span>
        </button>
      )
    })}

    <span>&nbsp;</span>

    {page < pages() - 1
      ? (
        <button onClick={() => {setPage(page + 1)}} className='hover:-translate-y-px hover:scale-105 hover:text-slate-900'>
          {'[>]'}
        </button>
      ) : (
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      )
    }
  </div>
)

export default Pagination
