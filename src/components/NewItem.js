import React from 'react';

export default class NewItem extends React.Component {

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

  onInsertNew = () => {
    if(!this.validate()){
      const newProduct = {  
        name: this.name.value,
        description: this.description.value,
        stock: this.stock.value
      }
      this.props.onInsertNew(newProduct);  
      this.props.hiddenContent()
    }
  }

  render(){
    return(
      <div className="product-details">
      <button className="btn__new" id="" onClick={this.props.showContent}></button>
      <div className="container__form-newProduct hidden">
        <input type="text" placeholder='Nombre' ref={(c) => this.name = c} />
        <input type="text" placeholder='description' ref={(c) => this.description = c} />
        <input type="text" placeholder='stock' ref={(c) => this.stock = c} />
        <p>{this.props.image}</p>
        <button className="btn__addNewProduct" onClick={this.onInsertNew} id="">guardar Nuevo Producto</button> 
      </div>
      </div>
    )
  }
}