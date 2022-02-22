import {useState} from 'react'
import Item from './Item'
import { v4 as uuidv4 } from 'uuid'

export default function Form(){

    const [dataArr, setDataArr] = useState([ //j'initalise un état de mon tableau que je remplis
        {txt: "coder en css", id: uuidv4()},
        {txt: "lire qur'an", id: uuidv4()},
        {txt: "apprendre sourate",id: uuidv4()}
    ])

    const [stateInput, setStateInput] = useState(); //j'initialise un état vide de mon input pour le mettre à zéro par la suite

    const deleteElement = id => {
        const filteredState = dataArr.filter(item => {  //je defini une constante qui contient mon tableau, dans lequel je filtre les éléments
            return item.id !== id; // en ne laissant que ceux qui sont différents de l'ID de l'élément sur lequel je viens de cliquer
        })
        setDataArr(filteredState) //Je mets à jour mon tableau avec les données récupéré après ce filtre, donc avec l'élément supprimé en moins
    } //en finalité : ça me permet de supprimer un élément du tableau 

    const addTodo = e =>{
        e.preventDefault(); //preventDefault : pour éviter que le formulaire ne se mette à jour 
        const newArr = [...dataArr] // on créé un nouveau tableau basé sur l'ancien tableau + ce qui va changer

        const newTodo = {}; //on créé on nouvel objet au meme propriétés que les autres items du tableau de base
        newTodo.txt = stateInput; //On lui attribut la valeur de l'input
        newTodo.id = uuidv4(); //On lui attribue aussi un nouvel id

        newArr.push(newTodo) //push me permet d'ajouter un élément à la fin d'un tableau existant (ici newArr), je lui ajoute le nouvel élément
        setDataArr(newArr) //Je mets à jour la tableau de base (dataArr) avec ce qui se trouve dans notre nouveau tableau créé précédemment (newArr) qui contient les nouvelles données
        
        setStateInput('') //On remet l'input à zero pour l'insertion d'un nouvel élément
    }

    const linkedInput = e => { //on récupère la valeur de l'input
        setStateInput(e); //On met à jour le state avec la valeur de l'input
    }



    return(
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
            <form onSubmit={addTodo} 
            className="mb-3">
                <label htmlFor="todo" className="form-label mt-3">Chose à faire</label>
                <input value={stateInput}
                //on lie la value à un state pour pouvoir le mettre à 0 par la suite
                onInput={e => linkedInput(e.target.value)}
                //Lorsque l'on écrit dans le champ on récupère le contenu de celui-ci
                type="text" className="form-control" id="todo" />
                <button className="mt-2 btn btn-primary d-block">Envoyez</button>
            </form>

            <h2>Liste des choses à faire :</h2>
            <ul className="list-group">
                {/* On va créer une liste d'éléments à partir du tableau de base  */}
                {dataArr.map((item, index) => {
                    return(
                        //on appelle le component item en passant en props les différents paramètres qui nous seront utiles
                        <Item 
                        txt={item.txt}
                        key={item.id}
                        id={item.id}
                        //On fait aussi passer une fonction qui permet de nous retourner par la suite l'ID de l'élément séléctionné afin de le supprimer
                        delFunc={deleteElement}
                        />
                    )
                })}
            </ul>
        </div>
    )
}