Express Gallery
===============

Express, Sequelize, HTML5, stored on PostgreSQL

Use the Express, Sequelize, and *almost* any other library or templating engines you want to fulfill the requirements.
recommended: jade, bower, sass, foundation.
helpful: livereload, gulp for watching compiling sass

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