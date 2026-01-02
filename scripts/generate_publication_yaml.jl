# Generate yaml files for publications from bibtex files

using AcademicCV.BibTools: parse_bib_file
using AcademicCV.Formatting: build_author_abbr

# Function to convert LaTeX to HTML-safe text
function latex_to_html(text::AbstractString)
    result = string(text)
    
    # Convert common LaTeX commands to Unicode/HTML equivalents
    replacements = [
        (r"\\textendash" => "–"),           # en-dash
        (r"\\textemdash" => "—"),           # em-dash
        (r"\\odot" => "☉"),                 # sun symbol
        (r"\$_\{([^}]+)\}\$" => s"<sub>\1</sub>"),  # subscript $_{x}$
        (r"\$\^\{([^}]+)\}\$" => s"<sup>\1</sup>"), # superscript $^{x}$
        (r"\$_([a-zA-Z0-9☉]+)\$" => s"<sub>\1</sub>"),  # subscript $_x$
        (r"\$\^([a-zA-Z0-9]+)\$" => s"<sup>\1</sup>"),  # superscript $^x$
        (r"\$([^\$]+)\$" => s"\1"),         # remaining math mode
        (r"\\times" => "×"),                # multiplication
        (r"\\pm" => "±"),                   # plus-minus
        (r"\\degree" => "°"),               # degree
        (r"\\approx" => "≈"),               # approximately
        (r"\\leq" => "≤"),                  # less than or equal
        (r"\\geq" => "≥"),                  # greater than or equal
        (r"\\\{" => ""),                    # escaped braces
        (r"\\\}" => ""),
        (r"\\\"" => "\""),                  # escaped quotes
    ]
    
    for (pattern, replacement) in replacements
        result = replace(result, pattern => replacement)
    end
    
    # Remove remaining LaTeX commands
    result = replace(result, r"\\[a-zA-Z]+\{([^}]*)\}" => s"\1")  # \command{arg} -> arg
    result = replace(result, r"\\[a-zA-Z]+" => "")  # other \command
    
    return result
end

bib_files = [
    joinpath(@__DIR__, "..", "_data", "short_author.bib"),
    joinpath(@__DIR__, "..", "_data", "sxs.bib"),
    joinpath(@__DIR__, "..", "_data", "lvk.bib"),
]

println("Generating publication YAML files...")
for bib_file in bib_files
    println("Processing: $bib_file")
    # Read the bib file content and replace problematic Unicode characters
    bib_content = read(bib_file, String)
    bib_content = replace(bib_content, "⊙" => "\\odot")
    
    # Write to a temporary file for parsing
    temp_bib = tempname() * ".bib"
    write(temp_bib, bib_content)
    
    entries = parse_bib_file(temp_bib)
    rm(temp_bib)  # Clean up temp file
    yaml_output = replace(bib_file, r"\.bib$" => ".yaml")
    open(yaml_output, "w") do io
        for entry in entries
            println(io, "$(entry["citekey"]):")
            for (key, value) in entry
                if key != "citekey"
                    # For author field, abbreviate authors
                    if key == "author"
                        value = build_author_abbr(value; highlight="Shaikh, Md Arif")
                        # Replace LaTeX underline with HTML underline
                        value = replace(value, r"\\underline\{([^}]+)\}" => s"<u>\1</u>")
                        # Clean up LaTeX commands
                        value = latex_to_html(value)
                        # Replace last ", " with " and " 
                        # Find all matches for ", " before a word (not just an initial)
                        # Match ", " followed by capital letter and at least one lowercase letter
                        # or followed by "others"
                        matches = collect(eachmatch(r", (?=[A-Z][a-z]+|others)", value))
                        if length(matches) > 0
                            last_match = matches[end]
                            value = value[1:last_match.offset-1] * " and" * value[last_match.offset+1:end]
                        end
                    elseif key == "title"
                        # Remove curly braces and convert LaTeX to HTML
                        value = replace(value, r"[{}]" => "")
                        value = latex_to_html(value)
                    else
                        # For other fields, just do basic LaTeX cleanup
                        value = latex_to_html(value)
                    end
                    # Escape quotes for YAML
                    value = replace(value, "\"" => "\\\"")
                    println(io, "  $key: \"$value\"")
                end
            end
        end
    end
    println("Generated: $yaml_output")
end