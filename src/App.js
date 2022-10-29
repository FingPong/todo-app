  import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import './css/Nav.css'
import './App.css'
import Login from './components/Login';
import { HomePage } from './components/Home';
import  About  from './components/About';
import  Todo  from './components/Todo';
// import { DangKy } from './components/Signup';
// import { DemoApi } from './components/DemoAPI';
import { MyContextProvider } from './contexts/MyContext';
import { TodoContextProvider } from './contexts/TodoContext';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import './css/background.css'
import { Timeline } from './components/Timeline'
// import { Timeline } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
        <div className='bg'></div>
        <div className='bg bg2'></div>
        <div className='bg bg3'></div>
      <MyContextProvider>
        <BrowserRouter>
          <nav>
            <Link to='/home' className='mylink'>Home</Link>
            <Link to='/about' className='mylink'>About</Link>
            <Link to='/todos' className='mylink'>TODOS</Link>
            <Link to='/timeline' className='mylink'>Timeline</Link>
            <Link to='/login' className='mylink'>Login</Link>
            {/* <Link to='/register' className='mylink'>Register</Link> */}
          </nav>
          
          <TodoContextProvider>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/home' element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute> 
              } />
              <Route exact path='/todos' element={<Todo />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Signup />} />
              <Route exact path='/timeline' element={<Timeline />} />
              {/* <Route exact path='/demo' element={<DemoApi />} /> */}
            </Routes>
          </TodoContextProvider>
        </BrowserRouter>
      </MyContextProvider>
    </div>  
  );
}

export default App;
