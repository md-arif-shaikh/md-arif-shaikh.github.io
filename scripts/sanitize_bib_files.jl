# Sanitize BibTeX files to work with both LaTeX and HTML processing
# Replaces Unicode characters with LaTeX commands that work in both contexts

bib_files = [
    joinpath(@__DIR__, "..", "_data", "short_author.bib"),
    joinpath(@__DIR__, "..", "_data", "sxs.bib"),
    joinpath(@__DIR__, "..", "_data", "lvk.bib"),
]

# Mapping of Unicode characters to LaTeX commands
unicode_to_latex = Dict(
    "⊙" => "\\odot",
    "–" => "--",  # en-dash
    "—" => "---", # em-dash
    "'" => "'",   # smart quote to regular quote
    "'" => "'",
    """ => "\"",
    """ => "\"",
    "…" => "...",
    "×" => "\\times",
    "°" => "\\degree",
    "±" => "\\pm",
    "≈" => "\\approx",
    "≤" => "\\leq",
    "≥" => "\\geq",
)

println("Sanitizing BibTeX files...")
for bib_file in bib_files
    println("Processing: $bib_file")
    
    # Read the file
    content = read(bib_file, String)
    original_content = content
    
    # Replace Unicode characters with LaTeX equivalents
    for (unicode_char, latex_cmd) in unicode_to_latex
        if occursin(unicode_char, content)
            println("  Replacing '$unicode_char' with '$latex_cmd'")
            content = replace(content, unicode_char => latex_cmd)
        end
    end
    
    # Only write back if changes were made
    if content != original_content
        # Create backup
        backup_file = bib_file * ".backup"
        write(backup_file, original_content)
        println("  Created backup: $backup_file")
        
        # Write sanitized content
        write(bib_file, content)
        println("  Updated: $bib_file")
    else
        println("  No changes needed")
    end
end

println("\nDone! BibTeX files are now sanitized for both LaTeX and HTML.")
println("Backups saved with .backup extension.")
