import React from 'react'

interface Props{
    page:number,
    totalPage:number,
    onPageChange:(page:number)=>void
}

const Pagination = ({page,totalPage,onPageChange}:Props) => {
  const goPrev=()=>{
    if(page>1) onPageChange(page-1)
}
const goNext=()=>{
    if(page<totalPage) onPageChange(page+1)
}
  return (
    <div className="flex items-center gap-3">
   {/* Prev */}
      <button onClick={goPrev}
      disabled={page===1}
      className='px-3 py-1 border border-border rounded-lg disabled:opacity-40 cursor-pointer'>Prev</button>
      {/* pageindicator */}
      <span className="px-4 py-1 border border-border rounded-lg bg-card">{page}/{totalPage||1}</span>
      <button onClick={goNext}
      disabled={page>=totalPage}
      className='px-3 py-1 border border-border rounded-lg disabled:opacity-40 cursor-pointer'>Next</button>
    </div>
  )
}

export default Pagination
