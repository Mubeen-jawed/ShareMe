import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const PinDetail = () => {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if (data[0]) {
            const query1 = pinDetailMorePinQuery(data[0]);

            client.fetch(query1)
              .then((res) => setPins(res))
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  console.log(pinDetail);

  // if (!pinDetail) {
  //   return <Spinner message="Loading Pin..." />
  // }

  return (
    <div className="flex xl-flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="user-post"
          className="rounded-t-3xl rounded-b-lg"
        />
      </div>

      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-9 h-6 rounded-3xl flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 transition-all hover:shadow-md outline-none">
              <ArrowDownwardIcon style={{ fontSize: '18px' }} className=" text-gray-700" />
            </a>
          </div>
          <a href={pinDetail.destination} target="_blank">
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-boldbreak-words mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3 ">
            {pinDetail.about}
          </p>
        </div>
        <Link
          to={`/user-profile/${pinDetail.postedBy?._id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pinDetail.postedBy?.image}
            alt="user-image"
            className="w-8 h-8 rounded-full object-cover"
          />

          <p className="font-semibold text-black capitalize">{pinDetail.postedBy?.userName}</p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail.comment.map((comment, i) => {
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
              <img src={comment.postedBy.image} alt="user-profile" className="w-10 h-10 cursor-pointer rounded-full" />
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default PinDetail