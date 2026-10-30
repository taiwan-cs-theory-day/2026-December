# NYCU Theory Day 2026 Website

This repository contains the static website for NYCU Theory Day 2026. The goal is to keep most content editable in data files rather than hard-coded in HTML or JavaScript.

## Data source of truth

Use these files as the primary content sources:

- `data/Theoryday_2026_DEC.csv` contains speaker profile data: speaker name, category, affiliation, title, expertise, talk title, abstract, and the talk date/time. This is the main data source for the speaker pages and speaker lists.
- `data/schedule.csv` contains schedule-only rows: day, date, time, type, session title, and presenter/organizer labels. This file is the source of truth for all session timings and dates.
- `data/site-content.json` contains reusable text like About, event information, organizer lists, sponsor acknowledgements, and category labels. Do not rename keys.

### Rules for editing data

- Keep one speaker per row in `data/Theoryday_2026_DEC.csv`.
- Use the allowed categories exactly: `keynote`, `plenary`, `others`, and `panel`.
- Keep the column header row unchanged. If you add a new column, update the site-data parsing logic and validation script.
- Use relative image paths such as `images/speakers/your-photo.jpg` under the project root.
- If a field contains commas, quote the entire CSV field and double any internal quotes.
- Do not duplicate date/time data in the speaker CSV when the schedule CSV already specifies the session timing. The schedule CSV should remain the single source of truth for day/time values.

### CSV example

```csv
Speaker,category,image_link,affiliation,title,expertise,talktitle,abstract,talk_date,talk_start_time,talk_end_time
Jane Smith,keynote,images/speakers/jane-smith.jpg,University of X,Professor,"Algorithms / Optimization","A Useful Talk","A short abstract about the talk.",4/21,14:10,15:10
```

## Local preview

Use Python’s built-in web server from the project root:

```bash
python -m http.server
```

Then open the site in a browser at `http://localhost:8000`.

## Validation before publishing

Before pushing or publishing, run:

```bash
npm run validate:data
```

This validates:

- required CSV and JSON files exist,
- speaker categories are valid,
- image paths resolve to real files,
- date and time fields are present when expected,
- schedule rows do not duplicate the same day/time slot,
- speaker names referenced in the schedule can be matched to the speaker CSV.

## Cache-busting and content updates

When content changes, update the version number in `site-version.json` so the browser refreshes cached assets.

Example:

```json
{
  "version": "2026-12-01-1"
}
```

## Maintenance tips

- Keep text edits in `data/site-content.json` instead of editing HTML.
- Keep speaker facts in `data/Theoryday_2026_DEC.csv` instead of embedding them in JavaScript.
- Keep schedule slot metadata in `data/schedule.csv` rather than duplicating the same day/time information in multiple places.
- Keep folder names and image names predictable so photo updates stay easy.
- Add a readable commit message whenever you change speaker data or event text, so the publication history is easier to audit.

## Deployment

The repository is designed for a simple static deployment. After validating the data and updating the version file, publish the site as usual for the target hosting environment.

