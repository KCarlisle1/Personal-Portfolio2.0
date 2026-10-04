import React from 'react'

function CuedMood() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090817] p-4">
      <video
        controls
        autoPlay
        className="max-h-screen max-w-full rounded-xl shadow-2xl"
      >
        <source
          src={`${import.meta.env.BASE_URL}projects/cued-mood/cuedMood.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video element.
      </video>
    </main>
  )
}

export default CuedMood
