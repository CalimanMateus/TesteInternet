import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpeedTest from './pages/SpeedTest';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Speed Test Application</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SpeedTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
