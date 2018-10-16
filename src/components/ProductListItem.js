import React from 'react';

export default class ProductListItem extends React.Component {
  
  validate(){
    let errorValidate = false;

    if(this.name.value === ''){
      errorValidate = true;
    }

    if(this.description.value === ''){
      errorValidate = true;
    } 
    
    if(this.stock.value === ''){
      errorValidate = true;
    }
    
    if(errorValidate){
      alert('No se han rellenado todos los campos')
    }

    if (!/^([0-9])*$/.test(this.stock.value)){
      alert('Rellene el campo stock con un valor numérico')
      errorValidate = true;
    }

    return errorValidate;
  }

  onSaveEditProduct = () => {
    if(!this.validate()){
      const product = {
        id : this.props.id,
        name : this.name.value,
        description : this.description.value,
        stock : this.stock.value
      }
      this.props.onSaveEditProduct(product);  
      this.props.hiddenContent(product.id)
    } 
  }

  showContent = () => {
    this.props.showContent(this.props.id);
  }

  onDelete = () => {
    this.props.onRemove(this.props.id);
  }
  
  render(){
    return(
      <li className="list__item">
        <div className="container__product-item">
          <span>Nombre: {this.props.name}</span>
          <span>Descripción: {this.props.description}</span>
          <span>Stock: {this.props.stock}</span>
          </div>
          <div className="container__btn-item">
          <button className="btn" id={this.props.id} onClick={this.showContent}>
            <div className="icon__edit"></div>
          Editar
          </button>
          <button className="btn btn__delete" onClick={this.onDelete} id="">
          <div className="icon__delete"></div>
          Eliminar
          </button> 
          </div>
        <div className="container__product-edit hidden" id={`container__product-edit-${this.props.id}`}>
          <input type="text" name="name" placeholder={this.props.name} ref={(c) => this.name = c} />
          <input type="text" name="description" placeholder={this.props.description} ref={(c) => this.description = c} />
          <input type="text" name="stock" placeholder={this.props.stock} ref={(c) => this.stock = c} />
          <span>{this.props.image}</span>
          <button className="btn btn__save" onClick={this.onSaveEditProduct} id="">
          <div className="icon__save"></div>
          Guardar</button>           
        </div> 
        <hr></hr>
      </li>      
    )
  }
}