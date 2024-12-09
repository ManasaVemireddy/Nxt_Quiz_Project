import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Login/Login';
import HomePage from './Components/Home/Home';
import QuizGameRoute from './Components/Quiz/Quiz';
import ResultsPage from './Components/ResultsPage/ResultsPage';
import ReportPage from './Components/ReportPage/ReportPage';
import NotFound from './Components/NotFound/NotFound';
import Header from './Components/Header/Header';

// Layout component for conditional header rendering
const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where the header should be hidden
  const hideHeaderRoutes = ['/login', '/notfound'];

  // Check if the current route matches one of the hideHeaderRoutes
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <main>{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizGameRoute />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for invalid URLs */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
