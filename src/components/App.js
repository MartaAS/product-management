import React, { Component } from 'react';
import firebase from 'firebase';
import '../style/style.css';
import ProductListContainer from './ProductListContainer.js';


export default class App extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      allProducts: []
    }
  }

  handleClick(){
    this.state.allProducts.length = 0;
    this.loadProductsFromFirebase();
    this.paintProducts();
  }

paintProducts(){
  
  return (<div className="">
  {
    <ProductListContainer allProducts={this.state.allProducts} onEditProduct={this.handleClick} />
  }
  </div>);  
}

loadProductsFromFirebase(){
  firebase.database().ref('products').on('child_added', snapshot => {
    const product = snapshot.val();
    product.id = snapshot.key;
    this.setState({
      allProducts: this.state.allProducts.concat(product)
    })
  });
}
  

  componentDidMount(){
    this.loadProductsFromFirebase();
    // firebase.database().ref('products').on('child_added', snapshot => {
    //   const product = snapshot.val();
    //   product.id = snapshot.key;
    //   this.setState({
    //     allProducts: this.state.allProducts.concat(product)
    //   })
    
    //});
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">         
        </header>
        <button >Añadir Nuevo Producto</button>
        {this.paintProducts()}
      </div>
    );
  }
}

