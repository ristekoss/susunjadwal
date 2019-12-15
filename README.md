# Susun Jadwal

Susun Jadwal is an open source tool to plan class schedules for university students.

Susun Jadwal by Ristek Fasilkom UI. https://ristek.cs.ui.ac.id/susunjadwal/

Monorepo setup with React frontend and Flask backend.

## Structure explained

```
backend/
  app/                // general views
  models/             // mongoDB models
  scraper/            // courses (academic.ui.ac.id) scraper
  sso/                // SSO UI authentication logic
  README.md           // important info
  requirements.txt    // dependency list
  start.sh            // script to start server
  ...
frontend/
  public/             // general configuration
  src/                // react stuff (where the fun happens)
  README.md           // important info
  package.json        // dependency list
  ...
README.md             // workspace-wide information shown in github
```

## Contributing Guide

Feel free to contribute by submitting a pull request.
