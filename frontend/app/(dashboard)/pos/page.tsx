import Image from 'next/image'
import React from 'react'
import pasta from '../../../Assets/delicious-pasta-plate.png'
import Card from '@/components/ui/Card'
import { FaBed } from 'react-icons/fa'
import Cart from '../../../Assets/Group.png'
import { MdTableRestaurant } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { MdSwapHoriz } from "react-icons/md";


const POS = () => {
  return (
    <div className="relative w-full min-h-screen ">
      <div className="absolute inset-0 bg-cover bg-top opacity-60 blur-[2px]  " style={{backgroundImage:`url(${pasta.src})`}}/>
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-black/95 to-black'/>
       <div className='flex gap-8 flex-col w-full mt-5 z-10 relative'>
    <div className='flex w-full gap-3 overflow-x-auto no-scrollbar'>
      {Array.from({length:20}).map((_,index) => (
        <Image src={pasta} alt="food" width={100} height={100} key={index} />
      ))}
    </div>
    <div className='flex gap-3'>
      <button className='bg-main-primary'>
        Vegetarian
      </button>
 <button className='bg-main-primary'>
        Vegetarian
      </button>
       <button className='bg-main-primary'>
        Vegetarian
      </button>
       <button className='bg-main-primary'>
        Vegetarian
      </button>
       <button className='bg-main-primary'>
        Vegetarian
      </button>
    </div>
    <div className='lg:flex-row flex  flex-col w-full gap-3 items-stretch '>
    {/* menu part */}
      <div className='flex flex-col gap-2 mt-12 items-center'>
      <div className="lg:w-4xl w-fit grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({length:14}).map((_,index) => (
          <div className='grid grid-cols-1 gap-3' key={index}>
            <div className="flex flex-col h-56 w-48 py-4">
<Card image={pasta} title="pasta" price="AED 11" key={index}/>
            </div>
 
          </div>
       
      ))}
      
      </div>
      <div className=" rounded-2xl shadow-lg text-white bg-card h-32 w-full ">
        <div className="flex py-2 px-3 items-center gap-4 ">
        <div className="flex flex-col  gap-2 text-text-primary items-center">
          <div className=" w-24 h-20 bg-button-primary rounded-2xl p-3 text-text-secondary  flex justify-center items-center">
            <MdTableRestaurant size={40} />
          </div>
          <h2 className=' font-semibold text-xs'>Order</h2>
      </div>
      <div className="flex flex-col gap-2 text-text-primary   items-center justify-center">
          <div className=" w-24 h-20 bg-button-primary text-text-secondary rounded-2xl p-3 flex justify-center items-center ">
            <MdSwapHoriz size={40} />
          </div>
          <h2 className='text-xs font-semibold'>Order</h2>
      </div>
      <div className="flex flex-col gap-2 text-text-primary   items-center justify-center">
          <div className=" w-24 h-20 bg-button-primary text-text-secondary rounded-2xl p-3 flex justify-center items-center">
            <FaBoxOpen size={40} />
          </div>
          <h2 className='text-xs font-semibold'>Order</h2>
      </div>
      <div className="flex flex-col gap-2 text-text-primary  items-center justify-center">
          <div className=" w-24 h-20 bg-button-primary text-text-secondary rounded-2xl p-3 flex justify-center items-center">
            <FaUtensils  size={40}/>
          </div>
          <h2 className='text-xs font-semibold'>Order</h2>
      </div>
      </div>
      </div>
      </div>
      {/* order taking */}
     <div className='flex flex-col flex-1  bg-background-secondary px-2 py-2 text-text-primary rounded-2xl'>
    <div className='flex justify-between items-center'>
      <p>Order:N/A</p>
      <p>Table:N/A</p>
     
    </div>
     <div className='flex flex-col gap-2'>
      <h2>Cutomer Type</h2>
      <div className='flex justify-between'>
        <p>Dining</p>
        <FaBed/>
    
    </div>
    <div className='flex justify-between'>
        <p>Dining</p>
        <FaBed/>
    
    </div>
    </div>
     <div className="h-42 p-6">
      <Image src={Cart} alt=""/>
     </div>
    <div className='bg-main-primary flex flex-col'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, enim animi dignissimos illum et voluptatibus, ipsum vitae magni ea laborum possimus qui deleniti maiores pariatur adipisci? Quod qui architecto iusto?
      Doloribus expedita doloremque optio excepturi commodi amet, totam ex veritatis. Inventore voluptatem odio eaque mollitia aperiam asperiores, fugit qui impedit repellendus in hic ex tempora nihil corporis cupiditate officia obcaecati.
     Aperiam debitis nemo ad quibusdam eum quidem quisquam, expedita exercitationem iure voluptate rerum, vel pariatur excepturi unde veniam libero maxime autem quasi ullam repellendus dolore quos! Quam atque eveniet quod.
    </div>
  </div>
  </div>
    </div>
    </div>
   
   
  )
}

export default POS

