import Header from '@/ui-components/Header'
import { ArrowBigLeft, ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
export default function PageNotFound() {
  return (
    <>
    <Header/>
    <div className='flex items-center justify-center h-[80vh] flex-col gap-1'>
        <span className='text-[60px] opacity-75 leading-none'><b>4</b>0<b>4</b></span>
        <span className='leading-none text-[16px] mb-3'>Page not <b>found</b></span>
        <Link className='underline flex gap-2 hover:text-[#A445ED]'>  Back to home</Link>
    </div>
    </>
  )
}
