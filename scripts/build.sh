#!/bin/bash

# Build CV using AcademicCV.jl
# This script installs the package and builds the CV

set -e

echo "======================================"
echo "Building CV with AcademicCV.jl"
echo "======================================"
echo ""

# Navigate to the repository root
cd "$(dirname "$0")/.."

# Install the AcademicCV.jl package
echo "Step 1: Installing AcademicCV.jl package..."
julia --project=. -e 'using Pkg; Pkg.add(url="https://github.com/md-arif-shaikh/AcademicCV.jl")'

echo ""
echo "Step 2: Building CV..."
julia --project=. scripts/build_cv.jl

echo ""
echo "======================================"
echo "Done! Check _data/arif/cv_arif.pdf"
echo "======================================"
