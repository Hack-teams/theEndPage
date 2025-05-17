import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Showcase from '../components/Showcase'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

export default function home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <Showcase/>
      <Footer/>
    </>
  )
}
