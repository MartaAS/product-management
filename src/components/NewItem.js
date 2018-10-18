import React from 'react';
import firebase from 'firebase';

export default class NewItem extends React.Component {

  constructor(){
    super();
    this.state = {
      picture: ''
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/images/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed' , snapshot => {
    }, error => {
        console.log('error al cargar la imagen')
    }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          
        this.setState({
          picture: downloadURL
        });
        }
      )
        
    }); 
    
  }


  isValid(){
    let isValid = true;

    if(/^\s+|\s+$/.test(this.name.value)
    || this.name.value === ''  
    || /^\s+|\s+$/.test(this.description.value)
    || this.description.value === ''
    || this.stock.value === ''){
      isValid = false;
      alert(`No se han rellenado todos los campos correctamente,
       comprueba que no ha introducido espacios al principio o 
       al final del campo nombre y descripción`)
    }

    if (!/^([0-9])*$/.test(this.stock.value)){
      alert('rellene el campo stock con un valor numérico')
      isValid = false;
    }

    return isValid;
  }

  onInsertNew = () => {
    if(this.isValid()){ 
    const newProduct = {  
      name: this.name.value,
      description: this.description.value,
      stock: this.stock.value,
      imagen: this.state.picture
    }       
      this.props.onInsertNew(newProduct);  
      this.hiddenContentNewProduct()
    }
  }

  showContentNewProduct(){
    document.getElementsByClassName('container__form-newProduct')[0].classList.remove('modal')
    var newProductInputName = document.getElementsByClassName('new__product-formName')[0];
    var newProductInputDescription = document.getElementsByClassName('new__product-formDescription')[0];
    var newProductInputStock = document.getElementsByClassName('new__product-formStock')[0];
    newProductInputName.value = "";
    newProductInputDescription.value = "";
    newProductInputStock.value = "";
  }

  hiddenContentNewProduct(){
    document.getElementsByClassName('container__form-newProduct')[0].classList.add('modal')
    
  }

  render(){
    return(
      <div className="product-details">
        <button className="btn__new" onClick={this.showContentNewProduct}>
          <div className="icon__new"></div>
          Nuevo
        </button>
        <div className="container__form-newProduct modal">
          <span className="btn__close" onClick={this.hiddenContentNewProduct}>X</span>
          <span className="text__new-item">Rellena los campos para poder añadir un disco más en el almacén</span>
          <div className="container__form-new-item">
            <input className="new__product-formName" type="text" placeholder='Nombre' ref={(c) => this.name = c} />
            <input className="new__product-formDescription" type="text" placeholder='description' ref={(c) => this.description = c} />
            <input className="new__product-formStock" type="text" placeholder='stock' ref={(c) => this.stock = c} />
            <input type="file" className="btn__up-image" onChange={this.handleUploadImage} />
          </div>          
          <button className="btn__addNewProduct btn" onClick={this.onInsertNew}>
            <div className="icon__save"></div>
            guardar
          </button> 
        </div>
      </div>
    )
  }
}