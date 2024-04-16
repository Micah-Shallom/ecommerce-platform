const request = require('supertest');
const app = require('./server'); 

let server;

beforeAll(async () => {
    // Start the server before running tests
    server = app.listen(3000);
  
    // Wait for the server to be listening (optional)
    await new Promise(resolve => server.on('listening', resolve));
  });
  
afterAll(async () => {
    // Close the server after all tests are done
    server.close();
  });

describe('API Endpoints', () => {
  let productId;

  // Test for adding a new product
  it('should add a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Test Product', price: 10.99 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

//   // Test for getting all products
//   it('should get all products', async () => {
//     const res = await request(app).get('/products');
    
//     expect(res.statusCode).toEqual(200);
//     expect(Array.isArray(res.body)).toBeTruthy();
//   });

//   // Test for getting a single product
//   it('should get a single product', async () => {
//     const res = await request(app).get(`/products/${productId}`);
    
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('name', 'Test Product');
//   });

//   // Test for updating a product
//   it('should update a product', async () => {
//     const res = await request(app)
//       .put(`/products/${productId}`)
//       .send({ name: 'Updated Product', price: 15.99 });
    
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('name', 'Updated Product');
//   });

//   // Test for deleting a product
//   it('should delete a product', async () => {
//     const res = await request(app).delete(`/products/${productId}`);
    
//     expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('message', 'Product deleted successfully');
//   });
});


  