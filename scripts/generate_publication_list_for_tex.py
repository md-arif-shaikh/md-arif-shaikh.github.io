import yaml
import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument("-d",
                    type=str,
                    required=True,
                    help="yaml data file containg publication.")

args = parser.parse_args()
fl = open(args.d, "r")
data = yaml.load(fl, Loader=yaml.CLoader)
fl.close()
# create a publication list for tex
file_name = os.path.splitext(os.path.basename(args.d))[0] + ".tex"
fl = open(file_name, "w")
fl.write("\\begin{enumerate}\n")
for k in data.keys():
    d = data[k]
    if "collaboration" in d:
        d["author"] = d["collaboration"]
    p = "\\item "
    p += d["author"] + ", " + "``" + d["title"] + "\"" + ", "
    if "journal" in d:
        p += "\href{" + "https://doi.org/" + d["doi"] + "}{" + d["journal"] + "}" + ", "
        p += "{\\bfseries " + d["volume"] + "}" + ", " + d["pages"] + ", "
    p += "(" + d["year"] + "), "
    p += "\href{" + "https://arxiv.org/abs/" + d["eprint"] + "}{arXiv:" + d["eprint"] + " [" + d["primaryclass"] +"]}" + ", " if ("eprint" in d) else ""
    fl.write(p)
fl.write("\\end{enumerate}\n")
fl.close()

