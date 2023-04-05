---
title: "Add soccer fixtures to org-agenda in Emacs"
date: 2023-04-05
tags: [Emacs, Emacs-Lisp, Soccer]
excerpt: "Adding soccer fixtures to org-agenda"
mathjax: "true"
---
The [soccer](https://github.com/md-arif-shaikh/soccer) package for [Emacs](https://www.gnu.org/software/emacs/) can be used to see fixtures, results, tables etc for major soccer leagues in Europe. Now one can easily add any of these fixtures to the `org-agenda`. This way one can integrate the upcoming fixtures in `org-agenda` along with other schedules.

All one need is to call `soccer-schedule` using `M-x` and then choose a league and a club for adding the upcoming fixtures for the next weeks. The number of weeks can be chosen in the same call. 

<div> <img src="/assets/posts/soccer/soccer-schedule.png"> </div>
