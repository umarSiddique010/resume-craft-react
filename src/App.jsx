import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FallbackUI from './components/FallbackUI/FallbackUI';

const WelcomePage = lazy(() => import('./components/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const DisplayTemplate = lazy(
  () => import('./components/DisplayTemplate/DisplayTemplate'),
);

const App = () => {
  return (
    <Suspense fallback={<FallbackUI />}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/builder" element={<HomePage />} />
        <Route path="/resume" element={<DisplayTemplate />} />
      </Routes>
    </Suspense>
  );
};

export default App;
