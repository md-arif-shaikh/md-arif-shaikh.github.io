---
title: "Expenses: Emacs package to keeping track of expenses"
date: 2021-12-12
tags: [emacs, expenses, package, expense-tracker, emacs-lisp]
excerpt: "Keep record of expenses and view the expenses in a given period of time in one or more category"
mathjax: "true"
---

### About the package
`Expenses` is an [Emacs](https://www.gnu.org/software/emacs/) package for keeping track of expenses. It uses `org` files to save as well view and calculate
expenses for a given period of time in one or more categories. For each month, a separate `org` file is created with the month and date as prefix in the file name. 
Expense entries are saved in an `org-table` inside the `org` file. All the calculation of expenses are done using table formulas that comes with `org-mode`.

It comes with convenient interactive functions
 - `expenses-add-expense` to add an expnese entry with date, amount, category and details.
 - `expenses-view-expense` to	view expense file for a given month.
 - `expenses-calc-expense-for-day` to	calculate expenses for a given day.
 - `expenses-calc-expense-for-month` to	calculate expenses for a given month.
 - `expenses-calc-expense-for-months` to calculate expenses for a given range of months.
 - `expenses-calc-expense-for-year` to calculate expenses for a given year
 - `expenses-calc-expense-by-category` to	calculate expenses in one or more category for a given date or month.

###  Installation
`Expenses` is available on [MELPA](https://melpa.org/). One can also install from source using `straight` and `use-package`
```emacs-lisp
(use-package expenses
    :straight (expenses :type git :host github :repo "md-arif-shaikh/expenses"))
```

### Customization
 - Directory for saving the expense files using
 ```emacs-lisp
 (setq expenses-directory "/path/to/directory")
 ```
 - Category list
 ```emacs-lisp
 (setq expenses-category-list '("category-1" "category-2"))
 ```
 - Currency
 ```emacs-lisp
 (setq expenses-currency "$")
 ```
 
### source
[https://github.com/md-arif-shaikh/expenses](https://github.com/md-arif-shaikh/expenses)
