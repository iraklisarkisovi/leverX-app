import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Admin from './pages/admin';
import Signin from './pages/signin';
import Signup from './pages/signup';
import User from './pages/user';
import IndexProtection from './protectedroute/indexprotection';
import AdminProtection from './protectedroute/adminprotection';
import { Provider } from 'react-redux';
import { MainStore } from './redux/store/store';
import Notfoundpage from './pages/notfoundpage';

function App() {
  return (
    <Provider store={MainStore}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <IndexProtection>
                <Home />
              </IndexProtection>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminProtection>
                <Admin />
              </AdminProtection>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user/:id"
            element={
              <IndexProtection>
                <User />
              </IndexProtection>
            }
          />
          <Route element={<Notfoundpage />} path="/pagenotfound" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
