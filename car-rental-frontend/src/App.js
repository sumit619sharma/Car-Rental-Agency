
import './App.css';
import AvailableCars from './screens/AvailableCars';
import AgencyRegistration from './screens/Agency-Regt';
import CustomerRegistration from './screens/Customer-Regt';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './screens/Login';

import BookedCar from './screens/BookedCar';
import NavBar from './components/Navbar';
import CustomCar from './screens/CustomCar';


function App() {
  const user = JSON.parse(localStorage.getItem('user')) || null  ;
   

  return (
    <div className="App">
    <Router>
    <NavBar/>
    <Routes>
    
    <Route path='/' element={<AvailableCars/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/customer' element={  <CustomerRegistration/>  } />
      <Route path='/car' element={<CustomCar/>} />
      <Route path='/agency' element={  <AgencyRegistration/>  } />
      
        <Route path='/booked' element={<BookedCar/>} />
      
      <Route path="*" element={ <AvailableCars />} />
        </Routes>
   </Router>
    </div>
  );
}

export default App;
