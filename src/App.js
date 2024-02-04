import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Footer, Home, Navbar } from './components'
import QuestionForm from './pages/upload'
import Main from './pages/Main'
import QuestionList from './pages/Test'
import PracticeQuestion from './pages/Practice'
import Quiz from './pages/Quiz'
import Practice from './pages/PracticePage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/practice" element={<Practice/>} />
        <Route path="/quiz" element={<Quiz />} />

        <Route path="/test" element={<PracticeQuestion />} />
        <Route path="/upload" element={<QuestionForm />} />
      </Routes>
    </div>
  )
}

export default App
