# The Dairing Company eCommerce api


## Routes

## products

1. **Fetch all Posts**
    
     @description           Fetch all products

     @route                 GET /products

     @access                Public 

2. **Create Post**

    @description            Add new product

    @route                  POST  /products

    @access                 Private/admin

3. **Fetch Specific Post**
    
    @description            Fetch single product

    @route                  GET  /products/:id

    @access                 Public


4. **Delete Post**
    
    @description            Delete a product

    @route                  DELETE  /products/:id

    @access                 Private/admin


5. **Update Post**

    @description            Edit the price of a product 

    @route                  PATCH  /products/:id

    @access                 Private/admin


## orders

1. **Fetch all Posts**

    @description           Fetch all orders

    @route                 GET  /orders

    @access                Private/admin


2. **Create Post**

    @description           Create an order

    @route                 POST  /orders

    @access                Public


3. **Fetch Specific Post**

    @description          Fetch single order

    @route                Get  /orders/:id

    @access               Public


4. **Delete Post**

    @description          Delete a order

    @route                DELETE  /orders/:id

    @access               Public


## User


1. **LogIn User**
    
    @description           Auth user & get token

    @route                 POST /users/login
    
    @access                Public 


2. **Register New User**
    
    @description           Register a new User

    @route                 POST /users
    
    @access                Public 

3. **Get User Profile**
    
    @description           User Profile

    @route                 GET /users/profile
    
    @access                Private

4. **Get Users**

    @description          Get all users

    @route                GET  /users

    @access               Private/admin

5. **Get specific User**

    @description          Get user by Id

    @route                GET  /users/:id

    @access               Private/admin

6. **Delete User**

    @description         Delete a user

    @route               DELETE  /users/:id

    @access              Private/admin

