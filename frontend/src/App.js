import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './features/Dashboard';
import Login from './features/Login';
import Register from './features/Register';

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />}>Home</Route>
          <Route path='/register' element={<Register />}>Register</Route>
          <Route path='/login' element={<Login />}>Login</Route>
        </Routes>
      </div>
    </Router>
    </> 
  );
}

export default App;
