---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<div class="columns">
<div class="column-left">
	<img src="/assets/home.jpg">
</div>
<div class="column-right"> 
	{{site.data.authinfo.name}}<br>
	{{site.data.authinfo.position}}<br>
	<a href="{{site.data.authinfo. department-website}}">{{site.data.authinfo.department}}</a><br>
	<a href="{{site.data.authinfo. institute-website}}">{{site.data.authinfo.institute}}</a><br>
	{{site.data.authinfo.institute-address}}<br>
	<a href = "mailto: {{site.data.authinfo.email}}">{{site.data.authinfo.email}}</a>
</div>
</div>
