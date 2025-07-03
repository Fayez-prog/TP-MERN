import React from 'react'

const Afficheproduct = ({products,handleDelete}) => {
  return (
    <div>
      <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Code Produit</th>
                        <th>Designation Produit</th>
                        <th>Prix Produit</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td>{product.designation}</td>
                            <td>{product.prix}</td>
                            <td>
                                <img 
                                    src={product.image} 
                                    alt={product.designation} 
                                    style={{ width: '50px' }} 
                                />
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(product.code)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default Afficheproduct
