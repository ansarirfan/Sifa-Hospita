import React from 'react'
import Header from '../components/Header'
import Speciality from '../components/Speciality'
import TopDoctors from '../components/TopDoctors'
import Banner from '../context/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <Speciality />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
