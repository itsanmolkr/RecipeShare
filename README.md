# RecipeShare: Online Recipe Sharing Platform

A college project prototype (2nd-year B.Tech CSE). Users can browse, search, save and add recipes. **This version is a frontend demo only.**

## Features
- Home page with categories and popular recipes
- Browse with live search (name or ingredient) and category filter
- Recipe details with ingredients and steps
- Login/Register screens (demo)
- Add Recipe form, My Recipes, Favorites (heart button)
- User profile and a simple Admin dashboard (stats and delete)
- Responsive layout for phone and desktop

## Technology stack
HTML5, CSS3, vanilla JavaScript. No frameworks, no build tools.

## How to run
1. Unzip the folder.
2. Double-click `index.html` (any modern browser). Nothing to install.

## Project structure
```
recipeshare/
├── index.html, browse.html, recipe.html     pages
├── login.html, add-recipe.html, my-recipes.html
├── favorites.html, profile.html, admin.html
├── css/style.css                            all styling
├── js/data.js                               sample recipes and categories
├── js/app.js                                navbar, cards, and page logic
└── docs/                                    ER diagram, DB design, presentation outline
```

## How the code works (for presenting)
- Every page has `<body data-page="...">`. `app.js` reads it and runs the matching function in the `pages` object.
- `data.js` holds the sample recipes. `app.js` builds recipe cards from that data.
- Favorites, the logged-in name and recipes you add are saved with `localStorage`. They stay in your browser only.

## Important limitations (be honest in the review)
- **No real authentication.** Login only stores a name in the browser. Passwords are not checked or saved.
- **No database.** Data lives in `localStorage` and resets if browser data is cleared.
- **No server-side security.** The Admin page is open to anyone. It is a layout demo.
- Entered text is escaped before display, but real validation must be done on the server later.

## Planned architecture (future)
Java 17, Jakarta Servlets/JSP, JDBC, MySQL, Maven, Tomcat 10.1 (`jakarta.servlet.*` imports).
Browser -> Servlet (controller) -> DAO (JDBC) -> MySQL, with JSPs as views. See `docs/ER-diagram-and-database-design.md`.

## Future development tasks
1. Maven project with Servlets/JSP; convert each HTML page to a JSP
2. Create the MySQL schema (docs) and DAO classes with JDBC `PreparedStatement`
3. Registration and login with hashed passwords (e.g. BCrypt) and `HttpSession`
4. Replace `data.js` and `localStorage` with database queries
5. Role-based admin access with server-side checks, and recipe approval
6. Server-side validation, image upload, ratings/comments
7. Deployment on Tomcat 10.1
