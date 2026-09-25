import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Skills from './components/Skills'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Testimonials />
      <Skills />
      <Blog />
      <Contact />
      <Footer />
      <ChatWidget />
      <BackToTop />
    </>
  )
}
