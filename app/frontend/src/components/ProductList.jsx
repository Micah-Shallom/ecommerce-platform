import React, { useState, useEffect } from 'react';
import { ListingContainer, ProductList, ProductItem } from '../styles/ProductListStyles';

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();

    return () => {
      // Cleanup (if needed)
    };
  }, []);

  return (
    <ListingContainer>
      <h2 style={{textAlign:"center"}}>Products</h2>
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            {product.name} - ${product.price}
          </ProductItem>
        ))}
      </ProductList>
    </ListingContainer>
  );
};

export default ProductListing;
