import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import author, convert_to_unicode
import yaml

def format_authors(list_of_authors):
    authors = ""
    num_authors = len(list_of_authors)
    for idx, author in enumerate(list_of_authors):
        last, first = author.split(", ")
        initials = "".join([x[0] + ". " for x in first.split(" ")])
        if idx <= (num_authors - 3):
            joining_string = ", "
        elif idx == (num_authors - 2):
            joining_string = " & "
        else:
            joining_string = ""
        author_name = initials + last
        if author_name == "M. A. Shaikh":
            author_name = "<u>" + author_name + "</u>"
        authors += author_name + joining_string
    return authors

def customizations(record):
    record = author(record)
    record = convert_to_unicode(record)
    return record

def format_entries(entries_dict):
    for k in entries_dict.keys():
        entries_dict[k]["author"] = format_authors(entries_dict[k]["author"])

bib_file = open("publications.bib", "r")
parser = BibTexParser()
parser.customization = customizations
bib_database = bibtexparser.load(bib_file, parser=parser)
bib_file.close()
entries_dict = bib_database.entries_dict
format_entries(entries_dict)
yaml_file = open("../_data/publications.yaml", "w")
yaml.dump(entries_dict, yaml_file, sort_keys=False)
yaml_file.close()
