import React from 'react'

export default function Item(props) {
  return (
    <li className="border d-flex justify-content-between align-items-center p-2 m-2">
        <div className="p-3">{props.txt}</div>
        {/* ici lorsque l'on va cliquer sur le bouton, notre fonction va permettre de récupérer l'ID de l'element */}
        {/* nb : on fait appelle à une fonction anonyme (flechée) pour ne pas que la fonction soit lancé lors du chargement de la page mais bien au click du bouton. */}
        <button onClick={() => props.delFunc(props.id)} 
        className="btn btn-danger p-2 h-50">Supprimez</button>
    </li>
  )
}
