import React from 'react';
import ProductListItem from './ProductListItem.js'

export default class ProductListContainer extends React.Component {
  

  render(){
   
    return(
  
  <ul>
        {
          this.props.allProducts.map(({id, name, description, stock, image}) =>
          <ProductListItem 
           key = {id}
           id = {id}
           name = {name}
           description = {description}
           stock = {stock}
           image = {image}
           onEditProduct= {this.props.onEditProduct}
          />
        )          
        }
       
      </ul>
    )
  }
}