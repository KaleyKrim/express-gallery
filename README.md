Express Gallery
===============

Express, Sequelize, HTML5, stored on PostgreSQL

Use the Express, Sequelize, and *almost* any other library or templating engines you want to fulfill the requirements.
recommended: Handbars and SASS.
helpful: Livereload, Gulp for watching compiling SASS

---

Create a multi-user Gallery.
Any user should be able to access these routes:

- `GET /` to view a list of gallery photos
- `GET /gallery/:id` to see a single gallery photo
  - each gallery photo should include a link to delete this gallery photo
  - each gallery photo should include a link to edit this gallery photo
- `GET /gallery/new` to see a "new photo" form
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `POST /gallery` to create a new gallery photo i
- `GET /gallery/:id/edit` to see a form to *edit* a gallery photo identified by the `:id` param
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `PUT /gallery/:id` updates a single gallery photo identified by the `:id` param
- `DELETE /gallery/:id` to delete a single gallery photo identified by the `:id` param

---

The layout of the app must match the layouts included in `/layouts`.
Match the layout as close as you can, using free and open fonts and graphics.

---

#### Responsive Layout

- does not have tablet layout
- uses a background image that is not included, you will have to find something similar (subtlepatterns.com)

#### Stretch Goals

Once you have finished with all of the requirements outlined above, you are encouraged to work on these additional stretch goals to improve the quality and usablity of your application.

- Make friendly error messages for users attempting to login using [connect-flash](https://github.com/jaredhanson/connect-flash).
- Make your site beautiful with SCSS. Note: No external libraries are allowed, be sure to use vanilla SCSS and/or JavaScript to style your application.
- Add intergration tests using Mocha and Chai, and end-to-end tests using SuperTest.
- Create an Admin role, that has elevated privledges. (i.e. Admin can delete users, Admin can edit/delete any post, etc.).
- Get a code review from an instructor or TA :sparkles:

