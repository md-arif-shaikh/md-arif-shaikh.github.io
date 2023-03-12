---
# layout: posts
title: "Research"
permalink: /research/
# header:
#  image: "/assets/images/nr_ecc.jpg"
---
My research explores several areas in gravitational physics. Here is a brief
overview of my research on some of these topics.
- [Defining eccentricity](#defining-eccentricity)
- [Early warning with higher modes](#early-warning-with-higher-modes)
- [Waveform modelling](#waveform-modelling)
- [Test of general relativity](#test-of-general-relativity)
- [Black hole accretion and analogue gravity](#black-hole-accretion-and-analogue-gravity)

## Defining eccentricity
<div> <img src="/assets/research/defining_eccentricity/definitions.png"></div>

The first three observation runs of the [LIGO](https://www.ligo.caltech.edu/)
and [Virgo](https://www.virgo-gw.eu/) detectors has resulted in the detection
of nearly 90 mergers of compact binaries. Among these, the majority of the
events were caused by the coalescences of binary black holes (BBH), while the
rest of the mergers originated from black hole-neutron star (BHNS) or neutron
star-neutron star (BNS) systems.

Gravitational wave data is analyzed using "matched filtering," which involves
searching for the gravitational wave signal buried deep within detector noise
by using templates of the gravitational wave. Therefore, the accuracy of
waveform models is critical for correctly inferring parameters such as the mass
and spins of the binary system from the gravitational wave data.

While current waveform models are highly accurate, they rely on certain
assumptions about the binaries emitting gravitational waves. For example, they
assume that the binary's orbit is almost circular by the time the gravitational
wave enters the detector's sensitive frequency band, which is valid for
binaries formed in galactic fields but not necessarily for those formed in
dynamic environments such as dense globular clusters. Consequently, it becomes
crucial to incorporate eccentricity in waveform models. To this end, several
research groups have been actively developing eccentric waveform models in
recent years.

The issue at hand is that there is no unique natural definition of eccentricity
in General Relativity. As a result, various waveform models utilize different
internal parameterisations of eccentricity, making the inference of
eccentricity from gravitational wave data model-dependent. To overcome this
challenge, a standard definition of eccentricity that is model-independent,
free of gauge choices, and has a correct Newtonian limit is needed to enable
accurate and consistent inference of eccentricity from gravitational wave data.

### Defining eccentricity for gravitational wave astronomy</h1>

In our paper titled [Defining eccentricity for gravitational wave
astronomy](https://arxiv.org/abs/2302.11257), we provide a standard definition
of eccentricity that meets all of the above criteria and enables an unambiguous
inference of eccentricity by applying our definition on the posterior of
eccentricity obtained using model-defined eccentricity. In this paper, we show
how this standard definition could be implemented and show it's robustness
using various tests.

Our standard definition of eccentricity is based in measuring it directly
from the gravitational waveform. We accomplish this by defining eccentricity in
terms of the frequency of the waveform at the pericenter and apocenter, which
eliminates model dependence. To ensure that our definition reduces to the
correct Newtonian definition when the binary separation is large, we apply an
additional transformation based on first order post-Newtonian calculation.

### A Python package to measure eccentricity from gravitational waveform </h1>

## Early warning with higher modes
## Waveform modelling
## Test of general relativity
## Black hole accretion and analogue gravity
