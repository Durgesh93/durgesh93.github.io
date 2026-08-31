# Durgesh K. Singh — Research Portfolio

A static research portfolio whose content is loaded directly from SQLite in the browser using sql.js/WebAssembly.

## Architecture

- `data/site.db` — the live content source loaded by every page
- `data/seed.sql` — optional schema/reference snapshot for recreating the database
- `figs/` — profile photo and replaceable publication figures
- `content-loader.js` — fetches SQLite and renders each page
- `styles.css` — shared responsive design
- `app.js` — accessible mobile navigation
- `index.html`, `publication.html`, `project.html`, `skills.html` — minimal page shells
- `resume.html` — print-only A4 layout rendered directly from SQLite

There is no content build step and no generated fallback content. If `site.db` cannot be loaded, the site displays a database error.

## Change content

Open the live database:

```sh
sqlite3 data/site.db
```

Useful commands:

```sql
.tables
.headers on
.mode column
SELECT * FROM profile;
SELECT id, title FROM publications ORDER BY sort_order;
UPDATE profile SET role = 'New role' WHERE id = 1;
.quit
```

Commit the changed `data/site.db` file. No HTML generation or `npm run build` command is required.

The browser opens SQLite in memory and cannot write changes back to the GitHub repository. Content changes must be made to `data/site.db` locally and then committed.

Publication figure filenames, alt text, and captions are stored in the `publications` table. See `figs/README.md` for replacement instructions.

## Create the résumé PDF

Select **Save as PDF** in the site header. The print layout queries the current profile, interests, experience, links, and publications from `site.db`, then opens the browser print dialog with an A4 layout. There is no separately maintained CV content.

You can also open `resume.html?print=1` to request the print dialog immediately after the database has loaded.

## Preview locally

Browsers cannot fetch the database when the HTML is opened through a `file://` URL, so use the local server:

```sh
npm run serve
```

Then open `http://localhost:8000`.

## Recreate the database

Only use this if you intentionally want to replace the live database with the seed snapshot:

```sh
sqlite3 data/site.db < data/seed.sql
```
