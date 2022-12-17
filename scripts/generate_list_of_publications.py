import os
import argparse
import yaml

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
parser.add_argument("-a", type=str,
                    required=False,
                    help="Author information."
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
if args.a:
    authfile = open(args.a, "r")
    authinfo = yaml.load(authfile, Loader=yaml.CLoader)
    authfile.close()
    tex_file.write(f"{{\\Large \\bfseries {authinfo['title']}}}\n\n")
else:
    tex_file.write("{\\Large \\bfseries List of Publications}\n\n")
tex_file.write("\\vspace{0.25cm}\n\n")

if args.a:
    tex_file.write(f"{{\\bfseries {authinfo['name']}}}, {authinfo['position']}\\\\\n")
    tex_file.write(f"\\href{{{authinfo['department-url']}}}{{{authinfo['department']}}}, \href{{{authinfo['institute-url']}}}{{{authinfo['institute']}}}\\\\\n")
    tex_file.write(f"{authinfo['institute-address']}\\\\\n")
    tex_file.write(f"Email: \href{{mailto:{authinfo['email']}}}{{{authinfo['email']}}}, Web page: \href{{{authinfo['website']}}}{{{authinfo['website']}}}\\\\\n")
tex_file.write("\\rule{\\textwidth}{1pt}\n")
tex_file.write("\\end{flushleft}\n")

# generate list of publication
for idx, bib_file in enumerate(args.b):
    # create yaml data file from the bib file
    yaml_data_file = os.path.splitext(os.path.basename(bib_file))[0] + f"_tex" + ".yaml"
    os.system(f"python generate_publication_yaml.py -f 'tex' -p {bib_file}")
    # get the number of publication
    pubfile = open(yaml_data_file, "r")
    pub = yaml.load(pubfile, Loader=yaml.CLoader)
    pubfile.close()
    num_pub = len(pub.keys())
    os.system(f"python generate_publication_list_for_tex.py -d {yaml_data_file}")
    tex_file_name = os.path.splitext(os.path.basename(yaml_data_file))[0] + ".tex"
    tex_file.write("\\subsection*{" + sections[idx] + " " + f"(Total = {num_pub})" + "}\n")
    tex_file.write(f"\\input{{{tex_file_name}}}\n")
    
tex_file.write("\\end{document}\n")
tex_file.close()

os.system("pdflatex -interaction=nonstopmode -halt-on-error pub.tex")
