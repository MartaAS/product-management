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
      this.hiddenContentNewProduct()
    }
  }

  showContentNewProduct(){
    document.getElementsByClassName('container__form-newProduct')[0].classList.remove('hidden')
  }

  hiddenContentNewProduct(){
    document.getElementsByClassName('container__form-newProduct')[0].classList.add('hidden')
  }

  render(){
    return(
      <div className="product-details">
        <button className="btn__new" onClick={this.showContentNewProduct}>
          <div className="icon__new"></div>
          Nuevo
        </button>
        <div className="container__form-newProduct hidden">
          <input type="text" placeholder='Nombre' ref={(c) => this.name = c} />
          <input type="text" placeholder='description' ref={(c) => this.description = c} />
          <input type="text" placeholder='stock' ref={(c) => this.stock = c} />
          <button className="btn__addNewProduct btn" onClick={this.onInsertNew}>
            <div className="icon__save"></div>
            guardar
          </button> 
        </div>
      </div>
    )
  }
}