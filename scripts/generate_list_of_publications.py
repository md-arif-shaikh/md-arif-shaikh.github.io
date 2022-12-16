import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-b", type=str,
                    required=True,
                    nargs="+",
                    help="Bib files.")
parser.add_argument("-s", type=str,
                    required=False,
                    nargs="+",
                    help="Section titles for each bib file."
                    )
args = parser.parse_args()

if args.s is None:
    sections = []
    sections.append(os.path.splitext(os.path.basename(args.d))[0])
else:
    sections = args.s

tex_file = open("pub.tex", "w")
tex_file.write("\\documentclass[10pt]{article}\n")
tex_file.write("\\usepackage[margin=1in]{geometry}\n")
tex_file.write("\\usepackage[dvipsnames, usenames]{xcolor}\n")
tex_file.write("\\definecolor{linkcolor}{rgb}{0.0,0.3,0.5}\n")
tex_file.write("\\usepackage[colorlinks=true, linkcolor=linkcolor,citecolor=linkcolor,filecolor=linkcolor,urlcolor=linkcolor,pdfusetitle]{hyperref}\n")
# tex_file.write("\\usepackage{palatino}\n")
# tex_file.write("\\usepackage{fontspec}\n")
# tex_file.write("\\setmainfont{Avenir}\n")
tex_file.write("\\begin{document}\n")

tex_file.write("\\begin{flushleft}\n")
tex_file.write("{\\Large \\bfseries List of Publications}\n\n")
tex_file.write("\\vspace{0.25cm}\n\n")
tex_file.write("{\\bfseries Md Arif Shaikh}, Postdoctoral Fellow\\\\\n")
tex_file.write("\\href{https://physics.snu.ac.kr/en}{Department of Physics and Astronomy}, \href{https://en.snu.ac.kr}{Seoul National University}\\\\\n")
tex_file.write("1 Gwanak-ro, Gwanak-gu, Seoul 08826, Korea\\\\\n")
tex_file.write("Email: \href{mailto:arifshaikh.astro@gmail.com}{arifshaikh.astro@gmail.com}, Web page: \href{https://mdarifshaikh.com/}{https://mdarifshaikh.com/}\\\\\n")
tex_file.write("\\rule{\\textwidth}{1pt}\n")
tex_file.write("\\end{flushleft}\n")

for idx, bib_file in enumerate(args.b):
    yaml_data_file = data_file_name = os.path.splitext(os.path.basename(bib_file))[0] + f"_tex" + ".yaml"
    os.system(f"python generate_publication_yaml.py -f 'tex' -p {bib_file}")
    os.system(f"python generate_publication_list_for_tex.py -d {yaml_data_file}")
    tex_file_name = os.path.splitext(os.path.basename(yaml_data_file))[0] + ".tex"
    tex_file.write("\\subsection*{" + sections[idx] + "}\n")
    tex_file.write(f"\\input{{{tex_file_name}}}\n")
    
tex_file.write("\\end{document}\n")
tex_file.close()

os.system("pdflatex -interaction=nonstopmode -halt-on-error pub.tex")
