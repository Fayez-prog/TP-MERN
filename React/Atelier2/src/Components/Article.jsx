import { useState } from "react";

const Article = () =>{
const[article, setArticle] = useState({
    id: 1,
    designation: "laptop Dell",
    prix: 2300
})
    return(
        <>
        <p>Fiche Article</p>
        <p>Id: {article.id}</p>
        <p>Designation: {article.designation}</p>
        <p>Prix: {article.prix} €</p>
        </>
    )
}
export default Article;