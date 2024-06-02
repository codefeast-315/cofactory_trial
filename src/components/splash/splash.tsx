import React from 'react'
import Loader from '../loader'

const SplashScreen = ({title}:{title:string}) => {
  return (
    <div
    className='flex gap-8 flex-col justify-center items-center h-[100vh] text-xl bg-white'
    ><Loader/>
    <h4 className='text-xl animate-bounce uppercase text-pink-500'>{title}</h4>
    </div>
  )
}

export default SplashScreen