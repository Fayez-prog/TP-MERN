import React, { useState } from 'react';
import Afficheproduct from './Afficheproduct';

const Listarticles = () => {
    const [products, setProducts] = useState([
        {
            code: 1,
            designation: "Laptop Dell",
            prix: 2300,
            image: "https://m.media-amazon.com/images/I/61enrCge7ML._AC_SL1000_.jpg"
        },
        {   
            code: 2,
            designation: "Imprimante Epson",
            prix: 590,
            image: "https://www.alarabia.com.tn/19901-product_zoom/imprimante-epson-ecotank-l5290-4en1-a4-c11cj65405.jpg"
        },
        {
            code: 3,
            designation: "Scanner Canon",
            prix: 450,
            image: "https://zoom.com.tn/26143-large_default/scanner-canon-canoscan-lide-300.jpg"
        },
        {
            code: 4,
            designation: "Souris Logitech",
            prix: 50,
            image: "https://campusinformatique.com/wp-content/uploads/2024/07/LOGITECH-G903-LIGHTSPEED.png"
        },
        {
            code: 5,
            designation: "Clavier Corsair",
            prix: 120,
            image: "https://cdn.lesnumeriques.com/optim/produits/104/38871/corsair-k63_4a60cabb76bd0504_png__1200_1200__overflow.jpg"
        }
    ]);

    const [newProduct, setNewProduct] = useState({
        code: "",
        designation: "",
        prix: "",
        image: ""
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (newProduct.code && newProduct.designation && newProduct.prix && newProduct.image) {
            setProducts([...products, {
                ...newProduct,
                code: parseInt(newProduct.code) || Math.max(...products.map(p => p.code)) + 1
            }]);
            setNewProduct({
                code: "",
                designation: "",
                prix: "",
                image: ""
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: name === 'prix' || name === 'code' ? Number(value) : value
        });
    };

    const handleDelete = (code) => {
        setProducts(products.filter(product => product.code !== code));
    };

    return (
        <div className="container">
            <h2 className="my-4">Liste des produits</h2>
            
            <form className="mb-4 p-3 border rounded" onSubmit={handleAddProduct}>
                <h4>Ajouter un nouveau produit</h4>
                <div className="mb-3">
                    <label className="form-label">Code</label>
                    <input 
                        type="number" 
                        className="form-control"
                        name="code"
                        value={newProduct.code}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Désignation</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="designation"
                        value={newProduct.designation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input 
                        type="number" 
                        className="form-control"
                        name="prix"
                        value={newProduct.prix}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL de l'image</label>
                    <input 
                        type="url" 
                        className="form-control"
                        name="image"
                        value={newProduct.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Ajouter Produit
                </button>
            </form>

            <Afficheproduct products={products} handleDelete={handleDelete}/>
        </div>
    );
}

export default Listarticles;