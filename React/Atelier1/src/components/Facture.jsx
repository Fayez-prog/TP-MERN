import { useState } from "react";
import Client from "./Client";

const Facture = () => {
  const [fact, setFact] = useState({
    numFact: "FAC-100",
    dateFact: "21/12/2023",
    mtFact: 10000
  });

  const handleChange = () => {
    setFact({...fact, numFact: "FAC-200"});
  };

  return (
    <>
      <h1>Numéro facture : {fact.numFact}</h1>
      <Client />
      <h5>Date facture : {fact.dateFact}</h5>
      <h5>Montant facture : {fact.mtFact}</h5>
      <button 
        className="btn btn-primary"
        onClick={handleChange}
      >
        Modifier
      </button>
    </>
  );
};

export default Facture;