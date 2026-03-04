import MatrixBackground from './components/MatrixBackground';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <>
      {/* Layer 0: animated matrix rain */}
      <MatrixBackground />

      {/* Layer 1: fixed navigation */}
      <Navbar />

      {/* Layer 2: main content */}
      <Dashboard />
    </>
  );
}
