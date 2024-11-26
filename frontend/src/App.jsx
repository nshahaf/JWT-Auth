import reactLogo from './assets/icons/react.svg' // ./ for src directory
import viteLogo from '/vite.svg' // / for public directory
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signin from './components/Signin';
import Signup from './components/Signup';
function App() {

  return (
    <>
      <div className="app h-screen ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

function NotFoundPage() {
  return <HomePage />;
}

export default App