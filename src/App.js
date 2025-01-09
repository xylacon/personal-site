import './style/App.css'

import { useEffect } from 'react'
import { Content, Footer, Sidebar, Tabs } from './components'

function App() {
  useEffect(() => {
    function changeTheme() {
      let dark = window.matchMedia("(prefers-color-scheme: dark)").matches

      if (dark) {
        document.documentElement.setAttribute("data-theme", "dark")
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#2a283f")
      } else {
        document.documentElement.setAttribute("data-theme", "light")
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ece8ff")
      }
    }

    changeTheme()
    
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme)
    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", changeTheme)
  }, [])

  return (
    <div id="App">
      <Sidebar />
      <Tabs />
      <Content />
      <Footer />
    </div>
  )
}

export default App