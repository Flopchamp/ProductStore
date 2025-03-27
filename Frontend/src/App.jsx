import { Box } from "@chakra-ui/react";
import CreatePage from './Pages/CreatePage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import Products from './components/productCard'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* <Route path="/product" element={<CreatePage />} /> */}
      </Routes>
    </Box>
  );
}

export default App;