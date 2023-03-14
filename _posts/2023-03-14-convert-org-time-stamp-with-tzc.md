---
title: "Convert org time-stamp with tzc"
date: 2023-03-14
tags: [emacs, org-mode, package, time-zone, world-time, time-converter, emacs-lisp]
excerpt: "Convert org time-stamp between different time zones using tzc"
mathjax: "true"
---

[`org-mode`](https://orgmode.org/) is an amazing feature of
[Emacs](https://www.gnu.org/software/emacs/) that allows you not only to take
notes but also to keep track of tasks and make schedules. With
[`org-agenda`](https://orgmode.org/manual/Agenda-Views.html), it's easy to view
and manage to-do list. However, the current `time-stamp` format of
[`org-mode`](https://orgmode.org/) does not support `time-zone`
information. This can be inconvenient when trying to schedule meetings across
multiple time zones.

Until a built-in support arrives in `org-mode`, here is an easy way to convert
any `org-time-stamp` from one `time-zone` to another using
[`tzc`](https://github.com/md-arif-shaikh/tzc). [`tzc`](https://github.com/md-arif-shaikh/tzc)
provides two interactive functions to do this:

- `tzc-convert-org-time-stamp-at-mark`
- `tzc-convert-and-replace-org-time-stamp-at-mark`

The second function `tzc-convert-and-replace-org-time-stamp-at-mark` is
specially useful to select a `time-stamp` and replace it with the converted
`time-stamp`.

Here is a <a href="https://raw.githubusercontent.com/md-arif-shaikh/tzc/main/screenshots/convert-org-time-stamp.gif">demo</a>.
