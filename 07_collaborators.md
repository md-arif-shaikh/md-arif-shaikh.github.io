---
layout: page
title: "Collaborators"
permalink: /collaborators/
---
Here is a list of some of my collaborators
{% assign collaborators_array = "" | split: "" %}
{% for collaborator in site.data.collaborators %}
  {% assign collaborators_array = collaborators_array | push: collaborator[1] %}
{% endfor %}
{% assign sorted_collaborators = collaborators_array | sort: "name" %}
<ul>
{% for c in sorted_collaborators %}
  <li>
    <a href="{{ c.website | default: '#' }}">{{ c.name }}</a>,
    {{ c.position }},
    <a href="{{ c['institute-url'] | default: '#' }}">{{ c.institute }}</a>,
    {{ c.city }}, {{ c.country }}
  </li>
{% endfor %}
</ul>
