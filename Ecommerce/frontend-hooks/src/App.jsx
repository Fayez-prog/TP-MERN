import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.css";
import Listarticles from './Components/Articles/Listarticles'
import Insertarticles from './Components/Articles/Insertarticles'
import Editarticles from './Components/Articles/Editarticles'
import Viewarticles from './Components/Articles/Viewarticles'
import Listcategories from './Components/Categories/Listcategories'
import Insertcategories from './Components/Categories/Insertcategories'
import Editcategories from './Components/Categories/Editcategories'
import Viewcategories from './Components/Categories/Viewcategories'
import Listscategories from './Components/Scategories/Listscategories'
import Insertscategories from './Components/Scategories/Insertscategories'
import Editscategories from './Components/Scategories/Editscategories'
import Viewscategories from './Components/Scategories/Viewscategories'
import Menu from './Components/Menu'
import Listarticlescard from "./Components/Client/Listarticlescard"
import { CartProvider } from "use-shopping-cart";
import Cart from "./Components/Client/Shopping/cart";

function App() {
  return (
    <>
      <CartProvider>
      <Router>
        <Menu/>
        <Routes>
          <Route path="/articles" element={<Listarticles/>}/>
          <Route path="/articlescard" element={<Listarticlescard/>}/>
          <Route path="/articles/add" element={<Insertarticles/>}/>
          <Route path="/articles/edit/:id" element={<Editarticles/>}/>
          <Route path="/articles/view/:id" element={<Viewarticles/>}/>
          <Route path="/categories" exact element={<Listcategories/>}/>
          <Route path="/categories/add" element={<Insertcategories/>}/>
          <Route path="/categories/edit/:id" element={<Editcategories/>}/>
          <Route path="/categories/view/:id" element={<Viewcategories/>}/>
          <Route path="/scategories" element={<Listscategories/>}/>
          <Route path="/scategories/add" element={<Insertscategories/>}/>
          <Route path="/scategories/edit/:id" element={<Editscategories/>}/>
          <Route path="/scategories/view/:id" element={<Viewscategories/>}/>
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
      </CartProvider>
    </>
  )
}

export default App