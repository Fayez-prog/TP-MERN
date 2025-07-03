import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

import Editarticles from "./Components/Articles/Editarticles";
import Insertarticles from "./Components/Articles/Insertarticles";
import Listarticles from "./Components/Articles/Listarticles";
import Viewarticles from "./Components/Articles/Viewarticles";
import ListArticleCard from "./Components/Cards/ListArticleCard";
import Editcategories from "./Components/Categories/Editcategories";
import Insertcategories from "./Components/Categories/Insertcategories";
import Listcategories from "./Components/Categories/Listcategories";
import Viewcategories from "./Components/Categories/Viewcategories";
import Editscategories from "./Components/Scategories/Editscategories";
import Insertscategories from "./Components/Scategories/Insertscategories";
import Listscategories from "./Components/Scategories/Listscategories";
import Viewscategories from "./Components/Scategories/Viewscategories";
import Menu from "./Components/Menu";

const App=() =>{
return (
<div>
  <Router>
    <Menu/>
    <Routes>
      <Route path="/articles" element={<Listarticles/>}/>
      <Route path="/articles/add" element={<Insertarticles/>}/>
      <Route path="/articles/edit/:id" element={<Editarticles/>}/>
      <Route path="/articles/view/:id" element={<Viewarticles/>}/>
      <Route path="/cards" element={<ListArticleCard/>}/>
      <Route path="/categories" element={<Listcategories/>}/>
      <Route path="/categories/add" element={<Insertcategories/>}/>
      <Route path="/categories/edit/:id" element={<Editcategories/>}/>
      <Route path="/categories/view/:id" element={<Viewcategories/>}/>
      <Route path="/scategories" element={<Listscategories/>}/>
      <Route path="/scategories/add" element={<Insertscategories/>}/>
      <Route path="/scategories/edit/:id" element={<Editscategories/>}/>
      <Route path="/scategories/view/:id" element={<Viewscategories/>}/>
    </Routes>
  </Router>
</div>
);
}
export default App;
