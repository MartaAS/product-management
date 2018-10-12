import React from 'react';
import firebase from 'firebase';

export default class ProductListItem extends React.Component {
  
  onEdit = () => {

    const product = {
      id : this.props.id,
      name : document.getElementById('nameEdit').value,
      description : document.getElementById('descriptionEdit').value,
      stock : document.getElementById('stockEdit').value
    };

    //Validacion edicion valores

    //Llamada a firebase, actualizar
    firebase.database().ref('products/' + this.props.id).set({
      name: product.name,
      description: product.description,
      stock: product.stock,
      image: this.props.image
    })
  
    //{this.props.handleClick}
    this.props.onEditProduct()    

  } 
  

  render(){
    return(
      <li>
        <div className="product-item">
          <p>{this.props.id}</p>
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
          <p>{this.props.stock}</p>
          <p>{this.props.image}</p>
          <button className="" id={this.props.id} >
          Editar
          </button>
        </div>
        <div className="product-details">
          <input type="text" id="nameEdit" placeholder={this.props.name} />
          <input type="text" id="descriptionEdit" placeholder={this.props.description} />
          <input type="text" id="stockEdit" placeholder={this.props.stock} />
          <p>{this.props.image}</p>
          <button className="" onClick={this.onEdit} id="edit">
          Guardar
          </button> 
        </div>
      </li>
      
    )
  }
}