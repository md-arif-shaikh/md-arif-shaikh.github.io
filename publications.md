---
title: "Publications"
permalink: /publications/
---
Below is a list of my short-authored publications. For a complete list of publications including publications from large collaborations, please visit my Google Scholar <a href="https://scholar.google.com/citations?user=EcFhopXwEb0C&hl=en&oi=sra"><img class="svg-icon" src="/assets/google_scholar_icon.svg"></a> or [INSPIRE](https://inspirehep.net/authors/1812025) profile.

<ol reversed>
{% for publication in site.data.publications %}
{% assign paper = publication[1] %}
  <li>
    <b>{{ paper.title }}</b><br>
		{{ paper.author }}<br>
	<a href="https://{{ paper.doi }}">
	{{ paper.journal }}, <b>{{ paper.volume }}</b>, {{ paper.pages }}, ({{ paper.year }})
	</a>
	<a href="https://arxiv.org/pdf/{{ paper.eprint }}.pdf"><img class="svg-icon" src="/assets/pdf.svg"></a>
  </li>
{% endfor %}
</ol>
