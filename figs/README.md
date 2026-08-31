# Figures and images

Figures in this directory are loaded directly by `content-loader.js`. Their paths, captions, and alternative text live in the `publications` table in `data/site.db`.

The profile portrait, `myself1.jpg`, also lives here. Its path is stored in the `profile.portrait` database field.

You can replace an existing figure by overwriting its file while keeping the same filename. No JavaScript or database change is required. Use PNG for diagrams and a compressed JPEG or WebP for photographic or cover artwork.

To use a new filename, update the corresponding database row:

```sql
UPDATE publications
SET figure_path = 'figs/my-new-figure.png',
    figure_alt = 'Accessible description of the figure',
    figure_caption = 'Short caption shown below the figure'
WHERE id = 1;
```

Keep figures reasonably sized for the web and include all fonts and visual elements directly in the image.
