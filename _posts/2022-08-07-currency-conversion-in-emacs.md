---
title: "forex: A minimal package to convert currency in Emacs"
date: 2022-08-07
tags: [Emacs, Emacs-Lisp]
excerpt: "Forex in Emacs"
mathjax: "true"
---
Recently moved to a new country and still getting used to the new currency. To get an idea of how much I am spending
on something, I need to convert the amount to the currency of my native country. I just google it
for that. But why not do it from Emacs? Of course, we want to do everything within Emacs without ever leaving
the comfort of using a simple `M-x do-it`.

Here comes a simple and very minimal package [forex](https://github.com/md-arif-shaikh/forex) just to get the
forex information, in particular the exchange rate and then convert whatever amount we want to convert.
The magic command to do this is `M-x forex-convert`.
