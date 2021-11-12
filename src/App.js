import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Menu from './component/Menu/Menu';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/sites" element={<div>All Sites</div>} />
        <Route path="/events" element={<div>All Events</div>} />
        <Route path="/food" element={<div>All food</div>} />
        <Route path="/stay" element={<div>All hotels</div>} />
        <Route path="/local" element={<div>All local sites</div>} />
      </Routes>
    </Router>
  );
}

export default App;
