import "bootstrap/dist/css/bootstrap.min.css";
import Livres from "./components/Livres";

function App() {
  return (
    <div className="container">
      <h1 className="my-4">Bienvenue dans notre site</h1>
      <Livres />
    </div>
  );
}

export default App;