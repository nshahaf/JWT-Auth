import reactLogo from './assets/icons/react.svg' // ./ for src directory
import viteLogo from '/vite.svg' // / for public directory
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
function App() {

  return (
    <>
      <div className="app h-screen min-w-96 ">
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company" element={<HomePage />} />
          <Route path="/features" element={<HomePage />} />
          <Route path="/team" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
        </Routes>
      </div>
    </>
  )
}


export default App