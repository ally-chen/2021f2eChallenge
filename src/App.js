import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Wrapper } from "@googlemaps/react-wrapper";
import { PageContextProvider } from '@/store/pageStore';
import { LocationContextProvider } from '@/store/locationStore';
import Menu from '@/component/Menu/Menu';
import Footer from '@/component/Footer/Footer';
import NotFound from '@/container/NotFound/NotFound';
import Home from '@/container/Home/Home';
import Page from '@/container/Page/Page';
import List from '@/container/List/List';
import Bike from '@/container/Bike/Bike';
import BikeMap from '@/container/BikeMap/BikeMap';
import BikeLane from '@/container/BikeLane/BikeLane';

function App() {
  return (
    <LocationContextProvider>
      <PageContextProvider>
        {/* <Wrapper apiKey={auth.gMapKey} render={(status) => <h1>{status}</h1>}> */}
          <Router>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="sites" element={<List />} />
              <Route path="food" element={<List />} />
              <Route path="stay" element={<List />} />
              <Route path="events" element={<List />} />
              <Route path="bike" element={<Bike />}>
                <Route path="search" element={<BikeMap />} />
                <Route path="lane" element={<BikeLane />} />
                <Route index element={<BikeMap />} />
              </Route>
              <Route path=":type/:id" element={<Page />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        {/* </Wrapper> */}
      </PageContextProvider>
    </LocationContextProvider>
  );
}

export default App;
