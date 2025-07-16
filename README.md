# Project Description
The application represents a complete mini web shop with a backend developed in Spring Boot and a frontend in Angular. 
The system enables users to register and log in using JWT authentication, browse products with search, sorting, and filtering capabilities, and manage a shopping cart by adding or removing products.
Additionally, a detailed view of individual products has been implemented.

# Technologies and Architecture
The backend was developed using the Spring Boot framework with Spring Security for authentication and Spring Data JPA for communication with a PostgreSQL database. 
The frontend was implemented in Angular 20 using Angular Material components and SCSS for styling.
API documentation was generated using Swagger and is available at the standard endpoint.

# Setup & Installation
Backend Setup
Requirements:

- Java 17+
- Maven
- PostgreSQL 17

# Configuration:

- Update application.properties with your PostgreSQL credentials
- Database tables auto-create on startup
- Sample data loads automatically

API docs available at: http://localhost:8080/swagger-ui.html

# Security Features
The system uses JWT tokens for authentication, with basic implementation of user roles (USER and ADMIN). 
CORS mechanisms and basic input validation have been implemented. 
Although two roles exist, their functionality has not been fully utilized in this version of the application.

# Available Features
Users can browse products with various filtering and sorting options, add products to the cart, and manage quantities. 
A detailed view of each product is available on a separate page. 
Administrative functionalities are minimal in this version.

# Challenges and Solutions
The main challenges during development included adapting to the newer Angular 20 version from previous experience with Angular 16, as well as learning Angular Material components and SCSS, which were entirely new concepts. 
Issues were resolved through systematic debugging, analyzing console outputs, and Hibernate logs. 
Frontend-backend integration required additional attention due to changes in Angular.

# With More Time
With additional time, the following improvements would be implemented: unit tests, enhanced error handling on both sides of the application, and an improved user interface with additional interactive elements such as notifications and confirmation dialogs.

