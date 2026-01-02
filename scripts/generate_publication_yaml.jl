# Generate yaml files for publications from bibtex files

using AcademicCV.BibTools: parse_bib_file
using AcademicCV.Formatting: build_author_abbr

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
                        # Remove all LaTeX commands and escape sequences
                        value = replace(value, r"\\[a-zA-Z]+\{[^}]*\}" => "")  # \command{arg}
                        value = replace(value, r"\\[a-zA-Z]+" => "")  # \command
                        value = replace(value, r"\\[\{\}\"]" => "")  # \{, \}, \"
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
                        # Remove curly braces from title
                        value = replace(value, r"[{}]" => "")
                        # Remove LaTeX commands from title
                        value = replace(value, r"\\textendash" => "–")  # en-dash
                        value = replace(value, r"\\odot" => "☉")  # sun symbol
                        value = replace(value, r"\$_\{([^}]+)\}\$" => s"_\1")  # Remove $ around subscripts
                        value = replace(value, r"\$([^\$]+)\$" => s"\1")  # Remove $ math delimiters
                        value = replace(value, r"\\[a-zA-Z]+\{[^}]*\}" => "")  # Other \command{arg}
                        value = replace(value, r"\\[a-zA-Z]+" => "")  # Other \command
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