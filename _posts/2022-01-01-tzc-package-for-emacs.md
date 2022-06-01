---
title: "tzc: Emacs package to convert time between zones"
date: 2022-01-01
tags: [emacs, expenses, package, time-zone, world-time, time-converter, emacs-lisp]
excerpt: "Convert time between different time zones as in tzdatabase"
mathjax: "true"
---

### About the package
`tzc` (short for `time zone converter`) is an [Emacs](https://www.gnu.org/software/emacs/) package for converting a time from one `time-zone` to another.
- It supports tzdata database, e.g., `America/New_York` specifies the time zone and daylight saving time history for locations near New York City. For more details, see the time zone rules as described in the Emacs manual [here](https://www.gnu.org/software/emacs/manual/html_node/elisp/Time-Zone-Rules.html).
- A list of all available zones in your system (MacOS (`darwin`) or Linux (`gnu/linux`)) is presented for autocompletion. So you can pick one easily.
- In the unlikely case where a zone is not available in completion, you can add it to the list `tzc-favourite-time-zones`.

###  Installation
`tzc` can be installed from source using `straight` and `use-package`
```emacs-lisp
(use-package expenses
    :straight (tzc :type git :host github :repo "md-arif-shaikh/tzc"))
```

### Customization
 - Favourite `time-zones`
 ```emacs-lisp
 (setq tzc-favourite-time-zones '("Asia/Kolkata" "America/New_York"))
 ```
 
### Screencasts
- Convert a time between time zones
<div> <img src="/assets/convert-time.gif"></div>
 
### source
[https://github.com/md-arif-shaikh/tzc](https://github.com/md-arif-shaikh/tzc)
