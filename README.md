[![LinkedIn][linkedin-shield]][linkedin-url]
# React Store Management Application

## Overview:
This **React | TypeScript** project made with is a store management application designed for organizing the layout and inventory of a physical store. The application is adaptable to various types of stores, such as clothing, electronics, or supermarkets. It allows users to visualize and manage departments, product locations, and inventory within a store.

## Features
### User Roles
- **Customer:**
  - Search for products by name or promotion status.
  - View product details, including description, image, properties, promotion status and stock quantity.
  - Visualize the location of a product on a department's floor plan.
- **Manager:** 
  - All functionalities of a customer.
  - Modify product details, including name, description, image URL, price, promotion status, and stock quantity.
  - Perform CRUD operations on product properties.
  - Set minimum stock levels for products.
  - Assign products to specific locations on the department's floor plan.
  - Monitor products low on stock or out of stock with a visual representation on the floor plan.

### Navigation and authentication
- User authentication is simulated with a test button for assigning the manager role to a user.
- Navigation is facilitated through a navigation drawer and routing

### Extra features:
- Users can customize application settings, including:
  - Background color.
  - Display of product names.
  - Display of product prices.
  - Display of promotions.
  - Change colors of the floor plan.
- Dark mode.


## Backend Simulation
Backend Simulation
The application utilizes a simulated backend using JSON server.
The data.json file contains structured data for at least one store with meaningful information for creating a visually appealing floor plan.
The project includes an npm script and devDependency for starting the backend without the need for a global installation of json-server.


## Getting Started
1. Clone the repository.
2. Run ```npm install``` to install dependencies. 
3. Add the **data.json** file to the project on GitLab. 
4. Start the backend using ```npm run start-backend.``` 
5. Run ```npm start``` to launch the React application.
---
##### Note: The application does not implement user authentication due to limitations with JSON server. The manager role can be simulated using the provided test button.

##### Author: [Milan de Kok]([linkedin-url])

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat-square&logo=linkedin
[linkedin-url]: https://linkedin.com/in/milandekok