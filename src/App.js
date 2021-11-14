import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { PageContextProvider } from '@/store/pageStore';
import { LocationContextProvider } from '@/store/locationStore';
import Menu from '@/component/Menu/Menu';
import NotFound from '@/container/NotFound/NotFound';
import Home from '@/container/Home/Home';
import Page from '@/container/Page/Page';
import List from '@/container/List/List';

function App() {
  return (
    <LocationContextProvider>
      <PageContextProvider>
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sites" element={<List />} />
            <Route path="food" element={<List />} />
            <Route path="stay" element={<List />} />
            <Route path="events" element={<List />} />
            <Route path=":type/:id" element={<Page />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </PageContextProvider>
    </LocationContextProvider>
  );
}

export default App;
