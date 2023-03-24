---
title: "Publications"
permalink: /publications/
---
Below is a list of my short-authored publications. For a complete list of publications including publications from large collaborations, please visit my Google Scholar <a href="https://scholar.google.com/citations?user=EcFhopXwEb0C&hl=en&oi=sra"><img class="svg-icon" src="/assets/google_scholar_icon.svg"></a> or [INSPIRE](https://inspirehep.net/literature?sort=mostrecent&size=50&page=1&q=M.A.Shaikh.1&arxiv_categories=astro-ph.HE) profile.

<ol reversed>
{% for publication in site.data.publications %}
  {% assign paper = publication[1] %}
  {% if paper.volume == '' %}
    {% assign volsep = "" %}
  {% else %}
    {% assign volsep = ", " %}
  {% endif %}
  {% if paper.pages == '' %}
    {% assign pagessep = "" %}
  {% else %}
    {% assign pagessep = ", " %}
  {% endif %}
  <li>
    <b>{{ paper.title }}</b><br>
		{{ paper.author }}<br>
		<a href="https://doi.org/{{ paper.doi }}">{{ paper.journal }}, </a><b>{{ paper.volume | append: volsep}}</b>{{ paper.pages | replace: "--", "-" | append: pagessep }}({{ paper.year }})
	<a href="https://arxiv.org/pdf/{{ paper.eprint }}.pdf"><img class="svg-icon" src="/assets/pdf.svg"></a>
  </li>
{% endfor %}
</ol>
