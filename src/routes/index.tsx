import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ScrollToTop from '../components/ScrollToTop';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
