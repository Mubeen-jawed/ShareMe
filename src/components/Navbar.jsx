import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {

  const navigate = useNavigate();

  if (!user) return null

  return (

    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">

      <div className="flex justify-start items-center w-full px-2 rounded-lg bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className='ml-1 text-gray-400' />
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>

      <div className="flex gap-3">

        <Link to={`user-profile/${user._id}`} className="hidden md:block">
          <img src={user.image} alt="user-image" className="w-14 h-12 rounded-lg" />
        </Link>

        <Link to={"/create-pin"} className="text-sm flex flex-col border text-black border-gray-500 rounded-lg h-12 w-24 md:h-12 md:w-14 flex justify-center items-center transition-all hover:bg-red-500 hover:text-white hover:border-white">
          <IoMdAdd />
          Upload
        </Link>

      </div>
    </div>
  )
}

export default Navbar
