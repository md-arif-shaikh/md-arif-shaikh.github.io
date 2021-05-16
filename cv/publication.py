import bibtexparser

with open('publication.bib') as bibtex_file:
    bib_database = bibtexparser.load(bibtex_file)


paper_dict = bib_database.entries_dict

texfile = open('publication.tex', 'w')
orgfile = open('publication.org', 'w')
htmlfile = open('publication.html', 'w')
# texfile.write('\\begin{itemize}\n')
texfile.write('\\begin{etaremune}\n')
orgfile.write('#+TITLE: List of publications\n')
orgfile.write('#+Author: Md Arif Shaikh\n')
htmlfile.write('<ol reversed>\n')

for k in sorted(paper_dict, reverse=True):
    bib_record = paper_dict[k]
    bib_record_custom_author = bibtexparser.customization.author(bib_record)
    author = bib_record_custom_author['author']
    author_new = ''
    na = len(author)

    for i in range(na):
        auth = author[i]
        auth_split = auth.split()
        auth = auth_split[0]
        for a in range(1, len(auth_split)):
            auth += ' '
            auth += auth_split[a][0] + '.'
            
        # print(auth)
        if i == 0:
            author_new += auth
        elif i >= 1 and i < na - 1:
            author_new += ', '
            author_new += auth
        elif i == na - 1:
            author_new += ' \\& '
            author_new += auth

    author_new_uname = author_new.replace('Shaikh, M. A.',
                                          '\\underline{Shaikh, M. A.}')
    author_new_uname_org = author_new.replace('Shaikh, M. A.',
                                              '_Shaikh, M. A._')
    author_new_uname_org = author_new_uname_org.replace('\\&', '&')
    author_new_uname_html = author_new.replace('Shaikh, M. A.',
                                               '<u>Shaikh, M. A.</u>')
    author_new_uname_html = author_new_uname_html.replace('\\&', '&')
    title = bib_record['title']
    journal = bib_record['journal']
    volume = bib_record['volume']
    pages = bib_record['pages']
    year = bib_record['year']
    url = bib_record['url']
    texfile.write('\\item ')
    orgfile.write(' * ')
    htmlfile.write(' <li>')
    if pages == '' and volume == '':
        # texfile.write(fr"{{\itshape {title}}}\\" + "\n")
        # texfile.write(fr"{author_new_uname}\\" + "\n")
        # texfile.write(fr"\href{{{url}}}{{\sffamily {journal}}}, ({year})" + "\n")
        texfile.write('%s, {\\itshape %s}, \\href{%s}{{\\sffamily %s}}, (%s).\n'
                      % (author_new_uname, title, url, journal, year))
        orgfile.write('%s, /%s/, [[%s][%s]], (%s).\n'
                      % (author_new_uname_org, title, url, journal, year))
        htmlfile.write('%s, <i>%s</i>, <a href="%s">%s</a>, (%s).'
                       % (author_new_uname_html, title, url, journal, year))
    else:
        # texfile.write(fr"{{\itshape {title}}}\\" + "\n")
        # texfile.write(fr"{author_new_uname}\\" + "\n")
        # texfile.write(fr"\href{{{url}}}{{\sffamily {journal}}}, {{\bfseries {volume}}}, {pages} ({year})" + "\n")
        texfile.write('%s, {\\itshape %s}, \\href{%s}{{\\sffamily %s}}, {\\bfseries %s}, %s, (%s).\n'
                      % (author_new_uname, title, url, journal, volume, pages, year))
        orgfile.write('%s, /%s/, [[%s][%s]], *%s*, %s, (%s).\n'
                      % (author_new_uname_org, title, url, journal, volume, pages, year))
        htmlfile.write('%s, <i>%s</i>, <a href="%s">%s</a>, <b>%s</b>, %s, (%s).'
                       % (author_new_uname_html, title, url, journal, volume, pages, year))
    htmlfile.write('</li>\n')


# texfile.write('\\end{itemize}')
texfile.write('\\end{etaremune}\n')
htmlfile.write('</ol>')
orgfile.close()
texfile.close()
htmlfile.close()
