import React, { useState } from 'react';

const Livres = () => {
  // État pour le formulaire de nouveau livre
  const [livre, setLivre] = useState({
    isbn: "",
    titre: "",
    auteur: "",
    annedition: "",
    prix: "",
    couverture: ""
  });

  // État pour la liste des livres
  const [livres, setLivres] = useState([
    {
      isbn: "42368756",
      titre: "ReactJS",
      auteur: "Romain Rissouan",
      annedition: 2021,
      prix: 33,
      couverture: "https://fr.wikipedia.org/wiki/React"
    },
    {
      isbn: "123698745",
      titre: "Les VPNS",
      auteur: "Stephan@gmail.com",
      annedition: 2020,
      prix: 55,
      couverture: "https://www.cloudgratuit.fr/ce-que-vous-devez-savoir-sur-les-vpn/"
    },
    {
      isbn: "54894",
      titre: "Techniques de Référencement Web",
      auteur: "Patrick Mampe",
      annedition: 2020,
      prix: 55,
      couverture: "https://blog.internet-formation.fr/wp-content/uploads/2018/04/1e-4e-couverture-livre-SEO.jpg"
    },
    {
      isbn: "54645f",
      titre: "VueJS",
      auteur: "Alexandra Martin",
      annedition: 2020,
      prix: 20,
      couverture: "https://m.media-amazon.com/images/I/718QqTsp1tl._SY466_.jpg"
    },
    {
      isbn: "65465445",
      titre: "Laravel",
      auteur: "Eric Sarrion",
      annedition: 2020,
      prix: 50,
      couverture: "https://images.booksense.com/images/132/218/9798554218132.jpg"
    }
  ]);

  // Gestion des changements dans les inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivre({
      ...livre,
      [name]: value
    });
  };

  // Ajout d'un nouveau livre
  const addLivre = () => {
    if (livre.isbn && livre.titre && livre.auteur) {
      setLivres([livre, ...livres]);
      // Réinitialiser le formulaire
      setLivre({
        isbn: "",
        titre: "",
        auteur: "",
        annedition: "",
        prix: "",
        couverture: ""
      });
    }
  };

  // Suppression d'un livre
  const handleDelete = (isbn) => {
    setLivres(livres.filter((liv) => liv.isbn !== isbn));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des Livres</h2>
      
      {/* Formulaire d'ajout */}
      <div className="card mb-4">
        <div className="card-header">Ajouter un nouveau livre</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input 
                type="text" 
                className="form-control" 
                id="isbn" 
                name="isbn" 
                value={livre.isbn} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="titre" className="form-label">Titre</label>
              <input 
                type="text" 
                className="form-control" 
                id="titre" 
                name="titre" 
                value={livre.titre} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="auteur" className="form-label">Auteur</label>
              <input 
                type="text" 
                className="form-control" 
                id="auteur" 
                name="auteur" 
                value={livre.auteur} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="annedition" className="form-label">Année</label>
              <input 
                type="text" 
                className="form-control" 
                id="annedition" 
                name="annedition" 
                value={livre.annedition} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="prix" className="form-label">Prix</label>
              <input 
                type="text" 
                className="form-control" 
                id="prix" 
                name="prix" 
                value={livre.prix} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="couverture" className="form-label">URL Couverture</label>
              <input 
                type="text" 
                className="form-control" 
                id="couverture" 
                name="couverture" 
                value={livre.couverture} 
                onChange={handleChange} 
              />
            </div>
            <div className="col-md-12">
              <button 
                className="btn btn-success"
                onClick={addLivre}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des livres */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ISBN</th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Année</th>
            <th>Prix</th>
            <th>Couverture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {livres.map((livre, index) => (
            <tr key={index}>
              <td>{livre.isbn}</td>
              <td>{livre.titre}</td>
              <td>{livre.auteur}</td>
              <td>{livre.annedition}</td>
              <td>{livre.prix} €</td>
              <td>
                {livre.couverture && (
                  <img 
                    src={livre.couverture} 
                    alt={livre.titre} 
                    width="80" 
                    height="80" 
                    className="img-thumbnail"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />
                )}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Modifier</button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(livre.isbn)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Livres;