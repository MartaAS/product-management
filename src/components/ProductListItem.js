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
      alert('rellene el campo stock con un valor numérico')
      errorValidate = true;
    }

    return errorValidate;
  }

  onEdit = () => {
    if(!this.validate()){
      const product = {
        id : this.props.id,
          name : this.name.value,
          description : this.description.value,
          stock : this.stock.value
      }
      this.props.onEdit(product);  
  } 
}

  onDelete = () => {
    this.props.onRemove(this.props.id);
  }
  
  render(){
    return(
      <li>
        <div className="product-item">
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
          <p>{this.props.stock}</p>
          <p>{this.props.image}</p>
          <button className="" id={this.props.id}>Editar</button>
        </div>
        <div className="product-details">
          <input type="text" name="name" placeholder={this.props.name} ref={(c) => this.name = c} />
          <input type="text" name="description" placeholder={this.props.description} ref={(c) => this.description = c} />
          <input type="text" name="stock" placeholder={this.props.stock} ref={(c) => this.stock = c} />
          <p>{this.props.image}</p>
          <button className="" onClick={this.onEdit} id="">Guardar</button>           
        </div>        
        <button className="" onClick={this.onDelete} id="">Eliminar</button> 
      </li>      
    )
  }
}