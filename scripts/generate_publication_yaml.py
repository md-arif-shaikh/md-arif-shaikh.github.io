import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import author, convert_to_unicode
import yaml
import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument(
    "-f", "--format",
    type=str,
    default="html",
    help="Format the publication data according to the use case. Must be one of ['html', 'tex']"
)
parser.add_argument(
    "-p", "--publication",
    type=str,
    default="publications.bib",
    help="Bib file to extract the data from.")
parser.add_argument(
    "-d", "--data_dir",
    type=str,
    default="./",
    help="Directory to save the data.")

args = parser.parse_args()

def format_authors(list_of_authors, format_to_use="html"):
    authors = ""
    num_authors = len(list_of_authors)
    for idx, author in enumerate(list_of_authors):
        last, first = author.split(", ")
        initials = "".join([x[0] + ". " for x in first.split(" ")])
        if idx <= (num_authors - 3):
            joining_string = ", "
        elif idx == (num_authors - 2):
            joining_string = " \& " if format_to_use == "tex" else " & "
        else:
            joining_string = ""
        author_name = initials + last
        if author_name == "M. A. Shaikh":
            if format_to_use == "html":
                author_name = "<u>" + author_name + "</u>"
            elif format_to_use == "tex":
                author_name = r"\underline{" + author_name + "}"
            else:
                raise Exception(f"Unknown format to use {format_to_use}.")
        authors += author_name + joining_string
    return authors

def customizations(record):
    record = author(record)
    record = convert_to_unicode(record)
    return record

def format_entries(entries_dict, format_to_use="html"):
    for k in entries_dict.keys():
        if "collaboration" not in entries_dict[k]:
            entries_dict[k]["author"] = format_authors(
                entries_dict[k]["author"],
                format_to_use=format_to_use)

bib_file = open(args.publication, "r")
parser = BibTexParser()
parser.customization = customizations
bib_database = bibtexparser.load(bib_file, parser=parser)
bib_file.close()
entries_dict = bib_database.entries_dict
format_entries(entries_dict, args.format)
data_file_name = os.path.splitext(os.path.basename(args.publication))[0] + f"_{args.format}" + ".yaml"
yaml_file = open(f"{args.data_dir}/{data_file_name}", "w")
yaml.dump(entries_dict, yaml_file, sort_keys=False)
yaml_file.close()
