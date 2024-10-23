import React from "react"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Recent from "./recent/Recent"
import MapSection from "./map/mapSection"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <MapSection/>
      {/* <Awards />
      <Location />
      <Team />
      <Price /> */}
    </>
  )
}

export default Home
