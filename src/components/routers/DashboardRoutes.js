import { Routes, Route } from "react-router-dom";
import { Navbar } from "../ui/NavBar"
import { DcScreen } from '../dc/DcScreen';
import { MarvelScreen } from '../marvel/MarvelScreen';
import { SearchScreen } from '../search/SearchScreen';
import { HeroScreen } from "../hero/HeroScreen";

export const DashboardRoutes = () => {
  // cuando se crea rutas hijas no es necesario crear BrowserRouter
  return (
    <>
        <Navbar />
        <div className="container">
          <Routes>            
              <Route path="marvel" element={<MarvelScreen />} />
              <Route path="dc" element={<DcScreen />} />
              <Route path="search" element={<SearchScreen />} />
              <Route path="hero" element={<HeroScreen />} />
              <Route path="/" element={<MarvelScreen />} />
          </Routes>
        </div>
        
    </>
  )
}
