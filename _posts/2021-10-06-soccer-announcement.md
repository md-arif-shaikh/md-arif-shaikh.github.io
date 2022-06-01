---
title: "Soccer: Emacs package to get soccer (football) fixtures, results, standing table and etc"
date: 2021-10-06
tags: [emacs, soccer, package, football]
excerpt: "get soccer fixture, results, table in Emacs"
mathjax: "true"
---

### About the package
`Soccer` is an [Emacs](https://www.gnu.org/software/emacs/) package for getting fixtures, results, standing table for soccer (football) matches inside emacs. Currently it works for
  - Premier League (England)
  - La Liga (Spain)
  - Ligue 1 (France)

But could be easily extended to add other leagues around the world. All data are fetched from `scorespro` website.

###  Installation
Now available in [Melpa](https://melpa.org/). One can also install it using `straight` and `use-package`
```emacs-lisp
(use-package soccer
    :straight (soccer :type git :host github :repo "md-arif-shaikh/soccer"))
```

To get the time and match day converted to your local time configure the following
```emacs-lisp
(setq soccer-time-local-time-utc-offset "+0530")
```

### Common interactive functions
Call these using `M-x Function` where `Function` is any of the following functions

  | Functions                     | Actions                          |
  |-------------------------------|----------------------------------|
  | `soccer-fixtures-next`        | Fixture for the Next match       |
  | `soccer-fixtures-next-5`      | Fixtures of the Next 5 matches   |
  | `soccer-fixtures-full-in-org` | Full fixtures saved in org file  |
  | `soccer-results-last`         | Result of the last match         |
  | `soccer-results-last-5`       | Results of the last 5 matches    |
  | `soccer-results-full-in-org`  | Full list of results in org file |
  | `soccer-table`                | Full Ranking table               |
  | `soccer-table-top-4`          | Rank table with top 4 teams      |
  | `soccer-table-bottom-4`       | Rank table with bottom 4 teams   |
  
### Source
[soccer](https://github.com/md-arif-shaikh/soccer)
