import Image from 'next/image'
import React from 'react'

type Props = {
    image:any,
    title:string,
    price:string
}
const Card = ({image,title,price}:Props) => {
  return (
    <div className='relative w-full h-full py-5 '>
        <div className="absolute -top-7 left-[70] -translate-x-1/2">
        <Image src={image} alt="food" width={120} height={120}  className='rounded-full'/>
        </div>
      <div className="bg-card rounded-2xl p-5 mb-5 pt-16 shadow-xl mt-4 space-y-3">
        <h3 className="text-lg font-semibold text-text-primary whitespace-pre">
            falafal with salad
        </h3>
           <p className="text-gray-400 text-sm mt-1">
      AED 11
    </p>

    <button className="absolute bottom-1  right-2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xl">
      +
    </button>

      </div>
    </div>
  )
}

export default Card

