import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../styles/home.css'
import SideBar from '../components/SideBar/SideBar'
import Tokens from '../components/Tokens'

const Home = () => {
  return (
    <div className='bg-[#13131A] text-white'>
      <NavBar/>
      <div className='flex place-content-center my-6'>
        <ul className='flex text-[#CFCFCF]'>
              <li className=''>
                <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Portfolio</a>
              </li>
              <li className=''>
                <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>NFT's</a>
              </li>
              <li className=''>
                <a className='cursor-pointer hover:text-white px-2 border-r border-[#CFCFCF]'>Transactions</a>
              </li>
              <li className=''>
                 <a className='cursor-pointer hover:text-white px-2'>Time Machine</a>
              </li>
          </ul>
      </div>
      <div className='flex'>
        <SideBar/>
        <Tokens/>
      </div>
    </div>
  )
}

export default Home