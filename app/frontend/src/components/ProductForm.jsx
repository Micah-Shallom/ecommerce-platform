// ProductForm.js
import React, { useState } from 'react';
import { Container, FormContainer, Input, Button } from '../styles/ProductFormStyles';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price){
        alert("Missing Fields detected")
        return; 
    }

    try {
      const response = await fetch("http://localhost:4000/products", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Parse the response body as JSON
      const data = await response.json();

      console.log(data)


      setProduct({ name: '', price: '' });

    } catch (error) {
        console.error("Error adding product:", error.message);
        alert(`Error adding product ${error.message}`)
    }
  };

  return (
    <>
      <Container>
        <FormContainer onSubmit={handleSubmit}>
            <h2 style={{textAlign:"center"}}>Add a Product</h2>
          <Input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <Button type="submit">Add Product</Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default ProductForm;
