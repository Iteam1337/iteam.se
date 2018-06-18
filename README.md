# iteam.se

**NOTE**: The project requires `node@4.2.4`

Project uses `assemble` and `gulp`

**First clone the repo**
```bash
git clone https://github.com/Iteam1337/iteam.se.git
```

**Step in to the folder**
```bash
cd iteam.se
```

**Install dependencies**
```bash
npm install
```

**Run tasks**
```bash
npm start
```

# Structure

## Pages
**directory: `src/pages/`**


`index.hbs` gets rendered (this included sub-directories)

## Layout
**directory: `src/layouts/`**

Add them as `.hbs`-files

To include layouts, define the partial in the top-`yaml` as followed:

```yml
---
partial: default
---
```

**If default options should be used for layouts**, place them in `src/data/layouts/` as an `.yml`-file, with the same name as the layout

## Partials
**directory: `src/partials/`**

`.hbs`-files should be used

They are included by using `{{>partial}}` or using the `partials`-layout and
including the `partials:` in the top-`yaml`

An example for the top-`yaml`:

```yml
---
layout: partials
partials:
    -
        type: partial-file-name
        options: data to send to partial
        options-2: can be multiple options
---
```

## Data
**directory: `src/data/`**

Not used more than default options for layouts, at the moment

## Content
**directory: `src/content/`**

The content that should be copied to the final project should be placed in this folder

This can include images and fonts

## Scripts
**directory: `src/scripts/`**

All scripts used on the page should be placed in `src/scripts/`

They are all concatinated and uglified

## Stylesheets
**directory: `src/scss/`**

This project uses `scss` for the stylesheet

The first file included is `all.scss`. So if there should be new files included, do try to follow the structure that the project uses

## Tests
**directory: `src/test/`**

The testframework used is `mocha`

