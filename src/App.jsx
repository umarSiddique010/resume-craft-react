import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from '../public/favicon.ico';

const WelcomePage = lazy(() => import('./components/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const DisplayTemplate = lazy(
  () => import('./components/DisplayTemplate/DisplayTemplate'),
);

const App = () => {
  return (
    <Suspense fallback={AppFallback}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/resumeCrafted" element={<DisplayTemplate />} />
      </Routes>
    </Suspense>
  );
};

export default App;

function AppFallback() {
  return (
    <div
      style={{
        color: '#ffffff',
        background: '#0a0018',
        width: '100%',
        fontSize: '2rem',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img height="100px" src={logo} alt="logo" />
      Loading...
    </div>
  );
}
