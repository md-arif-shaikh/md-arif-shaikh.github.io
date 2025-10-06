import bibtexparser
import bibtexparser.middlewares as m
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

def format_author_list(authors, format="html"):
    authors_list = []
    for author in authors:
        first = author.first
        last = author.last
        first = [x[0] + "." for x in first]
        first = " ".join(first)
        new_author = first + " " + last[0]
        if format == "html" and r"{\"u}" in new_author:
            new_author = new_author.replace(r"{\"u}", "&uuml;")
            print(new_author)
        if new_author == "M. A. Shaikh":
            if format == "html":
                new_author = "<u>" + new_author + "</u>"
            if format == "tex":
                new_author = r"\underline{" + new_author + "}"
        authors_list.append(new_author)
    if len(authors_list) == 1:
        return authors_list[0]
    elif len(authors_list) == 2:
        return " and ".join(authors_list)
    else:
        return ", ".join(authors_list[:-1]) + " and " + authors_list[-1]

layers = [
    #m.MonthIntMiddleware(), # Months should be represented as int (0-12)
    m.SeparateCoAuthors(), # Co-authors should be separated as list of strings
    m.SplitNameParts() # Individual Names should be split into first, von, last, jr parts
]

library= bibtexparser.parse_file(args.publication, append_middleware=layers)
entries_list = library.entries
# list to dict
entries_dict = {}
for entry in entries_list:
    # each entry is bib entry. We want to convert it to a dict as well
    entry_dict = {}
    for key in entry.fields_dict:
        if key == "title":
            entry_dict.update({key: entry.fields_dict[key].value[1:-1]})
        elif key == "author":
            authors = entry.fields_dict[key]
            entry_dict.update({key: format_author_list(authors.value)})
        else:
            entry_dict.update({key: entry.fields_dict[key].value})
    entries_dict.update({entry.key: entry_dict})

data_file_name = os.path.splitext(os.path.basename(args.publication))[0] + f"_{args.format}" + ".yaml"
yaml_file = open(f"{args.data_dir}/{data_file_name}", "w")
yaml.dump(entries_dict, yaml_file, sort_keys=False)
yaml_file.close()
