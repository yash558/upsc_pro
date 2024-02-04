import React from 'react'
import { Home, About, Client, Courses, Faq, Navbar, Footer } from '../components'
const Main = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Courses />
      <About />
      <Faq />
      <Client />
      <Footer />
    </div>
  )
}

export default Main
