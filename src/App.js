
import './App.css';
import { Home } from './screens/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import {CartProvider} from './components/CartContext';
import { Orders } from './screens/Orders';
function App() {
  return (
    
      <CartProvider>

        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signIn" element={<SignIn />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/orders" element={<Orders />} />              
            </Routes>
          </div>
        </Router>
      </CartProvider>

  );
}

export default App;
