import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import PrivateComponent from './Components/PrivateComponent'
import Admlogin from './Components/Admlogin';
import Adminhome from './Components/Adminhome';
import PrivateAdmin from './Components/PrivateAdmin';
import UpdateUser from './Components/UpdateUser';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/update" element={<h1>update product</h1>} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/adminlogin" element={<Admlogin />} />
            <Route element={<PrivateAdmin />}>
              <Route path="/adminhome" element={<Adminhome />} />
              <Route path="/adminupdate/:id" element={<UpdateUser />} />
            </Route>


          </Routes>

        </div>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
