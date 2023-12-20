import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

function Spinner({ message }) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <InfinitySpin
        type="Circles"
        color="#FF5733"
        height={50}
        width={195}
        className="m-5"
      />

      <p className="text-sm text-center px-2">{message}</p>
    </div>
  )
}

export default Spinner


// Audio, BallTriangle,
//  Bars, Blocks, Circles, CirclesWithBar, ColorRing, Comment,
//   Discuss, Dna, FallingLines, FidgetSpinner, Grid, Hearts, InfinitySpin,
//    LineWave, MagnifyingGlass, MutatingDots, Oval, ProgressBar, Puff, Radio,
//     RevolvingDot, Rings, RotatingLines, RotatingSquare, RotatingTriangles,
//      TailSpin, ThreeCircles, ThreeDots, Triangle, Vortex, Watch)