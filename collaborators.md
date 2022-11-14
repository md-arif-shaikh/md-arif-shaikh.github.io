---
# layout: posts
title: "Collaborators"
permalink: /collaborators/
---
In no particular order
<ul>
{% for collaborator in site.data.collaborators %}
{% assign c = collaborator[1] %}
  <li> <a href={{ c.website }}> {{ c.name }}</a>, {{ c.position }}, <a href={{ c.institute-url }}> {{ c.institute }}</a>, {{ c.city }}, {{ c.country }}
  </li>
{% endfor %}
</ul>
