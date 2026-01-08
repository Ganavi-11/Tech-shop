import './App.css'
import Navbar from './Components/Navbar'
 import Carousel from './Components/Carousel'
 import PyramidCarousel from './Components/PyramidCarousel'
 
import Products from './Components/Products'
import Advantages from './Components/Advantages'
import Footer from './Components/Footer'





function App() {

  return (
    <>
      <Navbar />
      <Carousel />
      <PyramidCarousel />
      <Products/>
      <Advantages/>
      <Footer/>
      
    </>
  )
}

export default App
