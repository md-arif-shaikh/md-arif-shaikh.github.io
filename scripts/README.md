# CV Generation with AcademicCV.jl

This directory contains scripts to automatically generate a professional academic CV from YAML data files using the custom [AcademicCV.jl](https://github.com/md-arif-shaikh/AcademicCV.jl) package.

## Overview

The CV is generated from structured YAML and BibTeX data files in the `_data/` directory and compiled into a professional PDF using a customizable LaTeX template.

## Data Files

The following data files in `_data/` are used to generate the CV:

- **authinfo.yaml** - Personal information (name, email, website, position, etc.)
- **cv.yaml** - Professional positions and education
- **achievements.yaml** - Awards and honors
- **teaching.yaml** - Teaching experience
- **visits.yaml** - Research visits
- **seminars.yaml** - Invited seminars
- **conference-talks.yaml** - Conference presentations
- **conference-posters.yaml** - Conference posters
- **workshops.yaml** - Workshop participation

### BibTeX Files

Publications are managed in BibTeX format:
- **short_author.bib** - Your individual publications
- **sxs.bib** - SXS Collaboration publications
- **lvk.bib** - LIGO-Virgo-KAGRA Collaboration publications

## Template

The LaTeX template is located at `scripts/cv_template.tex`. It uses Mustache templating syntax and features:

- Professional formatting with custom colors and styling
- Reverse-numbered publication lists
- Automatic author name abbreviation and highlighting
- Hyperlinked DOIs and arXiv identifiers
- Sections for positions (with mentors), education (with advisors), publications, achievements, talks, seminars, teaching, and visits

## Local Usage

### Prerequisites

- Julia 1.10 or later
- LaTeX distribution (TeX Live, MacTeX, or MiKTeX)

### Build Steps

**Option 1: Using the build script (recommended)**
```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

**Option 2: Manual steps**

1. **Install Julia dependencies:**
   ```bash
   julia --project=. -e 'using Pkg; Pkg.add(url="https://github.com/md-arif-shaikh/AcademicCV.jl")'
   ```

2. **Generate CV:**
   ```bash
   julia --project=. scripts/build_cv.jl
   ```

The generated files will be in `_data/arif/`:
- `cv_arif.tex` - LaTeX source
- `cv_arif.pdf` - Compiled PDF

## GitHub Actions

The workflow is configured to automatically:
- Run daily at midnight (UTC)
- Run on every push (except to pdflatex branch)
- Install Julia and LaTeX
- Install AcademicCV.jl package
- Generate the CV PDF
- Commit the PDF to the `pdflatex` orphan branch

The workflow file is at `.github/workflows/cv.yml`.

## Features

✨ **Data-Driven:** All CV content comes from YAML/BibTeX files  
📚 **BibTeX Support:** Publications managed in standard BibTeX format  
🎨 **Professional Styling:** Clean, modern template with color accents  
🔗 **Smart Linking:** Automatic hyperlinks for DOIs, arXiv, websites  
✍️ **Author Highlighting:** Your name is automatically underlined in publications  
📝 **Reverse Numbering:** Publications numbered from most recent  
🤖 **Automated:** GitHub Actions builds CV on every data update  

## Customization

### Modify Personal Information
Edit `_data/authinfo.yaml` to update your contact details and introduction.

### Add Publications
Add entries to the appropriate BibTeX file in `_data/`:
- Personal papers → `short_author.bib`
- Collaboration papers → `sxs.bib` or `lvk.bib`

### Customize Template
Edit `scripts/cv_template.tex` to:
- Change colors (headercolor, linkcolor, accentcolor)
- Modify section ordering
- Adjust formatting and spacing
- Add new sections

### Update Other Sections
Edit the corresponding YAML files in `_data/` to add/modify:
- Positions, education → `cv.yaml`
- Awards → `achievements.yaml`
- Teaching → `teaching.yaml`
- Visits → `visits.yaml`
- Talks/Seminars → `conference-talks.yaml`, `seminars.yaml`

## Package Information

This setup uses the custom AcademicCV.jl package which provides:
- YAML and BibTeX data loading
- Mustache template processing
- Automatic author abbreviation (e.g., "Shaikh, M. A.")
- LaTeX sanitization and HTML entity decoding
- PDF compilation with error handling

For more details, see the [AcademicCV.jl repository](https://github.com/md-arif-shaikh/AcademicCV.jl).
