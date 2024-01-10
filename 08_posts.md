---
title: "Posts"
permalink: /posts/
---
{%- if site.posts.size > 0 -%}
<ul class="post-list">
{%- for post in site.posts -%}
<li>
 {%- assign date_format = site.minima.date_format | default: "%d/%m/%y" -%}
 <span class="post-meta">{{ post.date | date: date_format | append: " &raquo;"}}</span>
 <a href="{{ post.url | relative_url }}"> <span lang={{ page.lang }}>{{ post.title }}</span></a>
 <!-- <span class="post-meta">{{ read_time }}</span> -->
</li>
{%- endfor -%}
</ul>
{%- endif -%}
