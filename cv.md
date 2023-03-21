---
title: "CV"
permalink: /cv/
---
Find a PDF version of my CV [<img class="svg-icon" src="/assets/pdf.svg">](https://raw.githubusercontent.com/md-arif-shaikh/md-arif-shaikh.github.io/pdflatex/_data/arif/cv_arif.pdf)

# Positions
<ul reversed>
{% assign positions = site.data.cv.positions %}
{% for position in positions %}
{% assign pos = position[1] %}
{% assign country = pos.institute-address | split: "," | last %}
<li> <b>{{ pos.position }}</b>, <a href={{ pos.institute-website }}>{{ pos.institute }}</a>, {{ country }}, {{ pos.from-year }}-{{ pos.to-year }}</li>
{% endfor %}
</ul>
  
# Education
<ul reversed>
{% assign education = site.data.cv.education %}
{% for degree in education %}
{% assign ed = degree[1] %}
{% assign country = ed.institute-address | split: "," | last %}
<li> <b>{{ ed.degree }}</b>, <a href={{ ed.institute-website }}>{{ ed.institute }}</a>, {{ country }}, {{ ed.from-year }}-{{ ed.to-year }}</li>
{% endfor %}
</ul>

# Visits
{% include visits.html %}

# Awards, achievements and others
<ul reversed>
{% for achievement in site.data.achievements %}
{% assign ach = achievement[1] %}
<li> {{ ach.description }}, <a href={{ ach.organization-website }}>{{ ach.organization }}</a>, {{ ach.year | replace: "--", "-" }}</li>
{% endfor %}
</ul>
