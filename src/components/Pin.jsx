import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'

function Pin({ pin }) {

  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)

  const navigate = useNavigate()

  const { postedBy, image, _id, destination } = pin;

  const user = fetchUser()

  const alreadySaved = !!(pin?.save?.filter((item) => item?.postedBy?._id === user.jti))?.length;

  const savePin = (_id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(_id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.jti, //jti
          postedBy: {
            _type: 'postedBy',
            _ref: user.jti
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.Location.reload()
      })
  }


  return (
    <div className='m-2'>
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg transition-all duration-500 ease-in-out overflow-hidden"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        {image && (
          <img src={urlFor(image).width(480).url()} alt="user-post" className="rounded-lg w-full" />
        )}

        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pl-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-6 rounded-3xl flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 transition-all hover:shadow-md outline-none">
                  <ArrowDownwardIcon style={{ fontSize: '18px' }} className=" text-gray-700" />
                </a>
              </div>

              {alreadySaved?.length !== 0 ? (
                <button
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-3.5 text-sm py-1 mr-0.5 text-base rounded-3xl hover:shadow-medium outlined-none"
                  type="button"
                > {pin?.save?.length} Saved</button>
              ) : (
                <button
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-3.5 text-sm py-1 mr-0.5 text-base rounded-3xl hover:shadow-medium outlined-none "
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin(_id)
                  }}
                >{pin?.save?.length} save</button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}

                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-xs flex items-center gap-2 text-black font-bold py-1 p-2 pl-3 pr-3 rounded-full opacity-70 hover:opacity-100 hover:shadow-md whitespace-nowrap"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill fontSize={13} />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}

              {postedBy?._id !== user?.jti && (
                <button
                  className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-sm mr-0.5 text-base rounded-3xl hover:shadow-medium outlined-none "
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      <div>
        <Link
          to={`/user-profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img
            src={postedBy?.image}
            alt="user-image"
            className="w-8 h-8 rounded-full object-cover"
          />

          <p className="font-semibold text-black capitalize">{postedBy?.userName}</p>
        </Link>
      </div>
    </div>
  )
}

export default Pin