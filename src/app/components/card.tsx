import React from 'react'

const Card = ({
    title,
    response
}:{
    title:string;
    response:string;
}) => {
  return (
    <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold  uppercase '>{title}</h2>
        <textarea disabled className='w-full h-96 p-4 border-2 border-gray-300 rounded-lg' value={response}></textarea>

    </div>
  )
}

export default Card