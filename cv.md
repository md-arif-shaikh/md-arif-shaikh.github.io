---
title: "CV"
permalink: /cv/
---
Find a PDF version of my CV [https://github.com/md-arif-shaikh/md-arif-shaikh.github.io/blob/pdflatex/cv/cv_arif.pdf](here).

# Positions
- **2022 - 2024** Postdoctoral Fellow, [Seoul National University](https://en.snu.ac.kr/), Seoul, South Korea.
- **2019 - 2022** Postdoctoral Fellow, [International Centre for Theoretical Sciences](https://www.icts.res.in/), Bengaluru, India
  
# Education

- **2014 - 2019** PhD in Physics, [Harish-Chandra Research Institute](http://www.hri.res.in/), Prayagraj (Allahabad), India
- **2012 - 2014** MSc in Physics, [Harish-Chandra Research Institute](http://www.hri.res.in/), Prayagraj (Allahabad), India
- **2009 - 2012** BSc in Physics, [Jadavpur University](http://www.jaduniv.edu.in/), Kolkata, India

# Visits
<ul>
{% for visit in site.data.visits %}
{% assign v = visit[1] %}
  <li>
	<b>
	{% if v.from-year == v.to-year %}
		{{- v.from-year -}},
	{% else %}
		{{- v.from-year -}} - {{- v.to-year -}},
	{% endif %}
	</b>
	{{- v.host -}},
	<a href="{{- v.department-url -}}">{{- v.department -}}</a>,
	<a href="{{- v.institute-url -}}">{{- v.institute -}}</a>,
	{{- v.city -}}, {{- v.country -}},
	{% if v.from-year == v.to-year %}
		{% if v.from-month == v.to-mont %}
			{{- v.from-month -}} {{- v.from-date -}} - {{- v.to-date -}}
		{% else %}
			{{- v.from-month -}} {{- v.from-date -}} - {{- v.to-month -}} {{- v.to-date -}},
		{% endif %}
		{{v.to-year }}
	{% else %}
		{{ v.from-month }} {{v.from-date}}, {{ v.from-year }} - {{ v.from-month }} {{v.to-date}}, {{- v.to-year -}}
	{% endif %}
  </li>
{% endfor %}
</ul>

# Awards, achievements and others

- **2022** Membership of [Korean Gravitational Wave Group](https://kgwg.nims.re.kr/home/index.html), July 2022.
- **2021** Membership of [SXS Collaboration](https://www.black-holes.org/), Feb 2021
- **2020-2022** Membership of [LIGO-India Scientific Collaboration](https://www.ligo-india.in/lisc/), Aug 2020 - July 2022.
- **2020** Membership of [LIGO Scientific Collaboration](https://www.ligo.org/), Aug 2020
- **2018** HRI–Infosys Prize for the year 2018 for distinction in research in Astrophysics, 2018
- **2017** Qualified National Eligibility Test for JRF (NET), Dec 2016 & Jun 2017
- **2017** Qualified Graduate Aptitude Test (GATE), Feb 2017
- **2012** Offer for PhD at [IUCAA](https://www.iucaa.in/), Pune starting in 2014 (declined), Jul 2012
- **2012** Offer for Integrated PhD at [NCRA-TIFR](http://www.ncra.tifr.res.in/ncra/main), Pune (declined), Jul 2012
- **2012** Offer for Integrated PhD at [IISc](https://www.iisc.ac.in/), Bangalore (declined), Jun 2012
- **2012** Offer for M.Sc at [IIT](http://www.iitb.ac.in/) Bombay (declined), May 2012
- **2012** Qualified Joint Entrance Screening Test (JEST), Feb 2012
- **2012** Qualified Joint Admission Test for M.Sc (JAM), Feb 2012
- **2009 - 2012**, INSPIRE Fellowship, DST, Govt. of India, 2009 - 2012
- **2009** Ranked withing top 20 in Higher Secondary (10+2) Exam, West Bengal Board, 2009
- **2007** First rank in Secondary (10) Exam, West Bengal Board, 2007
