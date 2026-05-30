# Work Breakdown Structure

## Milestones

###  PROJECT SETUP AND CONFIGURATION 
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

Creating project folder
1.  Create a new folder with your <project name>.
2.  Inside that folder create two new folders.
3.  Name one as **Client**.
4.  Name another one as **Server**.
5.  Now open that folder in VS Code.
Client setup (installing react app)
Open the Client folder in the terminal of VS code.
npm create vite@latest . -- --template react
Select React framework from the given options.
Select a framework:
React
Select JavaScript variant from the given options.
Select a variant:
JavaScript
Now lets navigate to the client folder by giving the following command.
cd client
To install all the packages run the following command.
npm install
To start the React server type the following command.
npm run dev

Server setup (npm init)
Open Server folder in terminal of VScode.
npm init -y
Create files:
server.js
Create folders:
models
controllers
routes


### DATABASE DEVELOPMENT
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

• Install Mongoose. 
• Create database connection. 

Schema use-case: 
1. User Schema: 
• Schema: userSchema 
• Model: ‘User’ 
• The User schema represents the user data and includes fields such as username, email, and password. 
• It is used to store user information for registration and authentication purposes.
 • The email field is marked as unique to ensure that each user has a unique email address
2. Product Schema: 
• Schema: productSchema 
• Model: ‘Product’ 
• The Product schema represents the data of all the products in the platform. 
• It is used to store information about the product details, which will later be useful for  ordering . 
3. Orders Schema: 
• Schema: ordersSchema 
• Model: ‘Orders’ 
• The Orders schema represents the orders data and includes fields such as userId,  product Id, product name, quantity, size, order date, etc., 
• It is used to store information about the orders made by users. 
• The user Id field is a reference to the user who made the order. 

4. Cart Schema: 
• Schema: cartSchema 
• Model: ‘Cart’ 
• The Cart schema represents the cart data and includes fields such as userId, product  Id, product name, quantity, size, order date, etc., 
• It is used to store information about the products added to the cart by users. • The user Id field is a reference to the user who has the product in cart. 
5. Admin Schema: 
• Schema: adminSchema 
• Model: ‘Admin’ 
• The admin schema has essential data such as categories, banner.


### BACKEND DEVELOPMENT
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

Setup express server: 
• Create index.js file. 
• Create an express server on your desired port number.
• Define API’s
1.Set Up Project Structure: 
• Create a new directory for your project and set up a package.json file using the npm init command. 
• Install necessary dependencies such as Express.js, Mongoose, and other required packages. 
2.Database Configuration: 
• Set up a MongoDB database either locally or using a cloud-based MongoDB service like MongoDB Atlas or use locally with MongoDB compass. 
• Create a database and define the necessary collections for admin, users, products, orders and other relevant data. 
3. Create Express.js Server: 
• Set up an Express.js server to handle HTTP requests and serve API endpoints. 
• Configure middleware such as body-parser for parsing request bodies and cors for handling cross-origin requests.

4. Define API Routes: 
• Create separate route files for different API functionalities such as users, orders, and authentication. 
• Define the necessary routes for listing products, handling user registration and  login,managing orders, etc. 
• Implement route handlers using Express.js to handle requests and interact with the database. 
5. Implement Data Models: 
• Define Mongoose schemas for the different data entities like products, users,  and orders. 
• Create corresponding Mongoose models to interact with the MongoDB database.
 • Implement CRUD operations (Create, Read, Update, Delete) for each model to perform database operations.

6. User Authentication:
• Create routes and middleware for user registration, login, and logout.
 • Set up authentication middleware to protect routes that require user authentication. 
         7. Handle new products and Orders: 
• Create routes and controllers to handle new product listings, including fetching products data from the database and sending it as a response. 
• Implement ordering(buy) functionality by creating routes and controllers to  handle order requests, including validation and database updates. 
        8. Admin Functionality: 
• Implement routes and controllers specific to admin functionalities such as adding products, managing user orders, etc. 
• Add necessary authentication and authorization checks to ensure only authorized admins can access these routes. 
9. Error Handling: 
• Implement error handling middleware to catch and handle any errors that occur during the API requests. 
• Return appropriate error responses with relevant error messages and HTTP status codes.


### FRONTEND DEVELOPMENT
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

1. Setup React Application:
• Create a React app in the client folder.
• Install required libraries
• Create required pages and components and add routes.

2.Design UI components:
• Create Components.
• Implement layout and styling.
• Add navigation.

3.Implement frontend logic:
• Integration with API endpoints.
• Implement data binding.


### PROJECT IMPLEMENTATION & EXECUTION
- **Status:** todo
- **Priority:** medium
- **Due:** N/A

User Authentication

Backend: Handles HTTP requests for login, registration, and logout.

FRONTEND: Provides UI for login, registration, and logout functionalities.

All Products (User)

Backend: Fetches all products and sends data to the client.

FRONTEND: Displays products on the homepage with filtering options.

Add Product to Cart / Buy Product

Backend: Processes purchases with payment and address details; adds items to the cart linked to user ID.

FRONTEND: Allows users to add products to the cart or buy directly.

Order Products

Backend: Places orders for products in the cart associated with the user.

FRONTEND: UI to review cart and confirm orders.

UI Pages
Landing Page | Products | Authentication | User Profile | Cart | Admin Dashboard | All Orders | All Products

