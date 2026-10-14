# RecipeShare — Online Recipe Sharing Platform

RecipeShare is a college project developed to make discovering, organising, and sharing recipes easier. The platform provides a simple interface where users can explore recipes, search by name or ingredient, browse categories, save favourites, and add their own recipes.

This project is currently a **frontend prototype with a MySQL database design**. Java backend development and database connectivity are planned for a future stage.

## Project Information

- **Project:** RecipeShare — Online Recipe Sharing Platform
- **Team:** Team 404
- **Section:** 6
- **Institution:** Galgotias University
- **Team Members:** Anmol Kumar, Akhil Kumar, Arjun Singh, Bandana Kumari

## Features

- **Home Page:** Browse categories and discover popular recipes.
- **Browse Recipes:** Search by recipe name or ingredient and filter by category.
- **Recipe Details:** View recipe ingredients and preparation steps.
- **Login and Registration:** Demonstration screens for the planned user account system.
- **Add Recipe:** Add a recipe through the prototype interface.
- **My Recipes:** View recipes added in the current browser.
- **Favorites:** Save and view favourite recipes using the heart button.
- **User Profile:** View the profile interface.
- **Admin Dashboard:** Demonstration dashboard for recipe management.
- **Responsive Design:** Layout adapts to desktop and mobile screens.

## Technology Stack

### Currently Implemented

- **HTML5** — Page structure
- **CSS3** — Styling and responsive layout
- **JavaScript** — Page interactions and recipe rendering
- **Browser localStorage** — Stores selected demo data locally

### Planned for Future Development

- Java 17
- Jakarta Servlets and JSP
- JDBC
- MySQL 8.0
- Apache Tomcat 10.1
- Maven

## Getting Started

No additional software or build tools are required to run the current prototype.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html` to launch the website in a modern browser.
4. Use the navigation menu to explore the available pages and features.

Some demo features save data in the current browser. This data is not shared between users or devices.

## Project Structure

```text
RecipeShare/
├── index.html
├── browse.html
├── recipe.html
├── login.html
├── add-recipe.html
├── my-recipes.html
├── favorites.html
├── profile.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── app.js
├── docs/
│   ├── ER-diagram-and-database-design.md
│   └── presentation-outline.md
└── README.md
```

## How It Works

The website uses separate HTML pages for its main sections. Shared styling is maintained in `css/style.css`, while `js/data.js` contains the sample recipe data and `js/app.js` handles page interactions and rendering.

The JavaScript uses each page's `data-page` attribute to determine which functionality to initialise. Browser `localStorage` is used for selected demonstration features, including favourites, the displayed user name, and recipes added through the interface.

## Database Design

The proposed MySQL database contains six tables:

- `users` — User account information and roles
- `categories` — Recipe categories
- `recipes` — Recipe details and ownership
- `ingredients` — Ingredients associated with recipes
- `steps` — Recipe preparation instructions
- `favorites` — User-to-recipe favourites

The schema and ER diagram are available in [`docs/ER-diagram-and-database-design.md`](docs/ER-diagram-and-database-design.md).

The database schema has been created and checked locally in MySQL Workbench. **The current website is not connected to MySQL**, and the database is not included as a live hosted service in this repository.

## Current Limitations

This version is intended for demonstrating the user interface and initial database planning.

- Login and registration are demonstrations, not real authentication.
- Demo favourites and added recipes are stored in the browser, not in MySQL.
- The Admin Dashboard is a demonstration interface and does not enforce server-side permissions.
- Database connectivity through JDBC has not yet been implemented.
- The prototype has not been deployed as a live, full-stack web application.

## Future Development

The planned next steps are:

1. Set up a Maven-based Java web application using Servlets and JSP.
2. Connect the application to MySQL using JDBC and DAO classes.
3. Implement registration, login, password hashing, and session management.
4. Replace browser-only storage with database-backed operations.
5. Enforce user roles and recipe ownership on the server.
6. Add server-side validation, testing, and deployment documentation.

## Repository

GitHub: https://github.com/itsanmolkr/RecipeShare

---

**RecipeShare — A student project focused on recipe discovery, sharing, and database-backed web application design.**
5. Role-based admin access with server-side checks, and recipe approval
6. Server-side validation, image upload, ratings/comments
7. Deployment on Tomcat 10.1
