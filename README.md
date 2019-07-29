# Susun Jadwal
[//]: # (TODO: Implement actual CI)
![Build Status](https://raw.githubusercontent.com/dwyl/repo-badges/master/svg/build-passing.svg)

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
