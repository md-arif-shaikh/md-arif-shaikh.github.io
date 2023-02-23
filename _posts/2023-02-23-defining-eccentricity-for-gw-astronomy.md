---
title: "New paper and package `gw_eccentricity`: Defining eccentricity for gravitational wave astronomy"
date: 2023-02-23
tags: [Publication, Black Holes, Gravitational Waves, Numerical Relativity, Eccentricity]
excerpt: "New paper on defining eccentricity for gravitational wave astronomy."
mathjax: "true"
---
A new [paper](https://arxiv.org/abs/2302.11257), in collaboration with the Numerical Relativity group at
[Albert Einstein Institute, Potsdam](https://www.aei.mpg.de/astro-cosmo-rel),
is now available on [arXiv](https://arxiv.org/). We also released a `Python` package
[`gw_eccentricity`](https://pypi.org/project/gw-eccentricity/)
to measure eccentricity from gravitational waveform using methods discussed in the paper.

#### Abstract
Eccentric compact binary mergers are significant scientific targets for current and future gravitational wave observatories.
To detect and analyze eccentric signals, there is an increasing effort to develop waveform models, numerical relativity simulations,
and parameter estimation frameworks for eccentric binaries. Unfortunately, current models and simulations adopt different internal
parameterisations of eccentricity in the absence of a unique natural definition of eccentricity in general relativity,
which can result in incompatible eccentricity measurements. In this paper, we present a standard definition of eccentricity
and mean anomaly based solely on waveform quantities. This definition is free of gauge ambiguities, has the correct Newtonian limit,
and can be applied as a postprocessing step when comparing eccentricity measurements from different models.
This standardization puts all models and simulations on the same footing and enables direct comparisons between eccentricity
estimates from gravitational wave observations and astrophysical predictions. We demonstrate the applicability of our definition
for waveforms of different origins, including post-Newtonian theory, effective one body, extreme mass ratio inspirals, and numerical
relativity simulations. We focus on binaries without spin-precession in this work, but possible generalizations to spin-precessing binaries
are discussed. We make our implementation publicly available through an easy-to-use Python package, gw_eccentricity. 

#### Link to Publication
<b>Defining eccentricity for gravitational wave astronomy</b><br>
  <u>Md Arif Shaikh</u>, Vijay Varma, Harald P. Pfeiffer, Antoni Ramos-Buades, Maarten van de Meent<br>
  **arXiv:2302.11257**, (2022) <a href="https://arxiv.org/pdf/2302.11257.pdf"><img class="svg-icon" src="/assets/pdf.svg"></a>
