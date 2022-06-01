---
title: "Create an improved world clock with tzc package in Emacs"
date: 2022-01-26
tags: [emacs, tzc, world-clock, emacs-lisp]
excerpt: "Create an improved world clock with tzc package in Emacs"
mathjax: "true"
---

In this post I will show how to create an improved `world-clock` with [tzc](https://github.com/md-arif-shaikh/tzc) package for Emacs. Emacs has an in-built function
to display `world-clock` using an interactive function of the same name included in `time.el`. (Tips: To know about any function in Emacs use `C-h f function-name`.)
It displays the current time for different time zones specified by `world-clock-list`. However, we sometime need to see how a particular time that is not the current
time translates to time in other time zones. Here comes the interactive function `tzc-world-clock` from `tzc` that is similar to `world-clock` buffer but with extra
keys to see the next or previous hours. 
- Pressing `n` in the buffer would display the times for the next hour.
- Pressing `p` would display the times for previous hours. 
- You can press these multiple times. 
- To go back to current time at any point press `g`.

This is how it looks
<div><img src="/assets/posts/tzc/tzc-world-clock.gif" width="500px"></div>

Now let's see how we can customize this
### Customize the list of time zones
The list of time zones displayed in the `tzc-world-clock` comes from the variable `tzc-favourite-time-zones-alist` which is an `alist` with each element a list of
the `time-zone` and `label` for that `time-zone`, i. e., each element is of the form `("time-zone" "label")`. An example would be
```emacs-lisp
(setq tzc-favourite-time-zones-alist '(("Asia/Kolkata" "Kolkata") ("America/New_York" "New_York")))
```
The labels are displayed in the `tzc-world-clock` buffer.

### Customize what information to display
By default `tzc-world-clock` will display the time zone `label`, `time`, `date` (with day of the week, day number, month name and year) and offset to `UTC`.
You can customize whether to display the `date` or a relative information like `+1D` or `-1D` using `tzc-use-date-in-world-clock`. To display relative information, set it to `nil`
```emacs-lisp
(setq tzc-use-date-in-world-clock nil)
```
You can also hide the offsets by setting `tzc-use-offset-in-world-clock` to `nil`
```emacs-lisp
(setq tzc-use-offset-in-world-clock nil)
```

### Customize the faces
You can customize the faces, i.e., colors, thickness and other attributes of the info displayed in the buffer.
- `tzc-face-time-zone-label` for the `label` of `time-zone`
- `tzc-face-time-string` for the `time`
- `tzc-face-date-string` for the `date`
- `tzc-face-offset-string` for the `offsets`
