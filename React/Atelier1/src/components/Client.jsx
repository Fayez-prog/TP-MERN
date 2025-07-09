import { useState } from "react";

const Client = () => {
  const [nom, setNom] = useState("Esps");
  const [ville, setVille] = useState("Sfax");
  const [adresse, setAdresse] = useState("Route de la République");

  return (
    <>
      <h2>Page client</h2>
      <h1>le nom est : {nom}</h1>
      <h1>la ville est : {ville}</h1>
      <h1>adresse est : {adresse}</h1>
      <button 
        className="btn btn-success" 
        onClick={() => setNom("Esps Sfax")}
      >
        Modifier
      </button>
    </>
  );
};

export default Client;