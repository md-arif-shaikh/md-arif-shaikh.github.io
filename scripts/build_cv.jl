#!/usr/bin/env julia
# Build Script for Academic CV
# This builds a CV using AcademicCV.jl with bundled templates

using AcademicCV

# Define paths - using _data directory for input
# and _data/arif for output (matching the workflow expectation)
data_dir = joinpath(@__DIR__, "..", "_data")
output_dir = joinpath(@__DIR__, "..", "_data", "arif")

# Ensure output directory exists
mkpath(output_dir)

# Build the CV using bundled templates
println("Building Academic CV...")
pdf_file = build_cv_from_data(data_dir; output_dir=output_dir)

# Rename to match workflow expectation
expected_name = joinpath(output_dir, "cv_arif.pdf")
if pdf_file != expected_name
    mv(pdf_file, expected_name, force=true)
    pdf_file = expected_name
end

println("\nCV generated successfully!")
println("PDF file: $pdf_file")
