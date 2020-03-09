import React, { Component } from 'react';

import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

import api from '../../services/api';

import formatPrice from '../../util/format';

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/biquinis');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(
        this.getCorrectProductPriceAtVtex(product.items)
      ),
    }));
    this.setState({ products: data });
  }

  getCorrectProductPriceAtVtex(arrItems) {
    let price = 0;
    arrItems.forEach(item => {
      if (item.sellers[0].commertialOffer.Price > 0) {
        price = item.sellers[0].commertialOffer.Price;
      }
    });
    return price;
  }

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.productId}>
            <img
              src={product.items[0].images[0].imageUrl}
              alt={product.productName}
              title={product.productName}
            />
            <strong>{product.productName}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button">
              <div>
                <MdAddShoppingCart size={13} color="#FFF" /> 1
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
