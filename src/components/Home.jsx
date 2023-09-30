import React from 'react'
import Carousel from './Carousel'

const images = [
  "https://cdn.pixabay.com/photo/2019/07/26/11/33/bag-4364558_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/07/02/21/34/shoes-2465907_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/11/16/17/30/baby-stuff-5749668_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/20/14/44/stormtrooper-1995015_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/11/22/21/paper-3146952_1280.jpg",
];

const Home = () => {
  return (
    <>
      <h1 className="slide-animation">Buy, sell, and discover fashion, home decor, beauty, and more </h1>
      <Carousel images={images} />
      <footer> @tanggoma</footer>
    </>
  )
}

export default Home
