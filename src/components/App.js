import React, { Component } from 'react';
import firebase from 'firebase';
import '../style/style.css';
import ProductListContainer from './ProductListContainer.js';
import NewItem from './NewItem.js';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showContent = this.showContent.bind(this);
    this.hiddenContent = this.hiddenContent.bind(this)
    this.state = {
      allProducts: []
    };
  }

  handleRemove(id){
    const response = window.confirm('¿Esta seguro de que quiere borrar el elemento?')
    if(response){
      firebase.database().ref('products').child(id).remove();
    }    
  }

  handleEdit(product){
    firebase.database().ref('products').child(product.id).update(product);
  }

  handleInsert(product){
    firebase.database().ref('products').push(product);
  }
  
  componentDidMount(){
    const {allProducts} = this.state;
    
    firebase.database().ref('products').on('child_added', snapshot => {
      allProducts.push({
        id: snapshot.key,
        name: snapshot.val().name,
        description: snapshot.val().description,
        stock: snapshot.val().stock,
        image: snapshot.val().image        
      })
      this.setState({allProducts});
    })

    firebase.database().ref('products').on('child_removed', snapshot => {
      for(let i=0;i<allProducts.length;i++){
        if(allProducts[i].id == snapshot.key){
          allProducts.splice(i,1);
        }
      }
    this.setState({allProducts});
    })

    firebase.database().ref('products').on('child_changed', snapshot => {
      for(let i=0;i<allProducts.length;i++){
        if(allProducts[i].id == snapshot.key){
          allProducts[i].name = snapshot.val().name;
          allProducts[i].description = snapshot.val().description;
          allProducts[i].stock = snapshot.val().stock;
          allProducts[i].image = snapshot.val().image;
        }
      }
    this.setState({allProducts});
    })
  }  

  showContent(){
 document.getElementsByClassName('container__form-newProduct')[0].classList.remove('hidden')
  }

  hiddenContent(){
    document.getElementsByClassName('container__form-newProduct')[0].classList.add('hidden')

  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">         
        </header>
        <ProductListContainer 
          allProducts={this.state.allProducts} 
          onRemove={this.handleRemove} 
          onEdit={this.handleEdit}
        />  
        <NewItem 
          onInsertNew={this.handleInsert} 
          showContent={this.showContent} 
          hiddenContent={this.hiddenContent}
        />
      </div>
    );
  }
}

