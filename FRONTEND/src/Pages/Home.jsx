import React from 'react'
import Carousel from '../Components/Carousel'
import Heros from '../Components/Heros'
import BookGenreCards from '../Components/BookGenreCards'

function Home() {
  return (
    <div className='px-5'>
      <Carousel/>
      <Heros/>
      <BookGenreCards/>
    </div>
  )
}

export default Home
