import DisplayTemplate from './components/DisplayTemplate/DisplayTemplate';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/resumeCrafted" element={<DisplayTemplate />} />
    </Routes>
  );
};

export default App;
