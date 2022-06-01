---
title: "Update on expenses package for Emacs"
date: 2022-01-12
tags: [emacs, expenses, package, expense-tracker, emacs-lisp]
excerpt: "Keep record of expenses and view the expenses in a given period of time in one or more category"
mathjax: "true"
---

This is an update on the [expenses](https://github.com/md-arif-shaikh/expenses) 
package for [Emacs](https://www.gnu.org/software/emacs/) for keeping track of expenses. 
Since the last [post](https://md-arif-shaikh.github.io/2021/12/12/expenses-package-for-emacs.html) 
on this package there have been a few new features added to the package which might make it
more useful for some users.

### Importing bank statements
A major feature that is added is the ability to import bank statements from CSV file using
`expenses-import-expense`. This interactive function asks for few values so that it can correctly
import the dates, amount, category and details to the expense file. These values are
- column no for amount/debit
- column no for dates
- format of dates
- column no for details/narrative (optional)
- column no for category (optional)

Column no starts at 0. If there is no details or category column then use a negative number. In this case
it will ask for providing details and category.

There is also an option to turn on auto-assign feature for category. It will then automatically try to assign
a category based on the details of an entry.
```emacs-lisp
(setq expenses-utils-auto-assign-categories-on-import t)
```
The auto assigning of category works by looking for known `keywords` and `phrases` in the details/narratives.
One can create an alist of phrases or a hash table of keywords to make this auto assign work better.
```emacs-lisp
(setq expenses-utils-phrases-alist '(("THE FIRST PHRASE" . "Category1") ("THE SECOND PHRASE" . "Category2") ("ANOTHER PHRASE" . "Category3")))
```
```emacs-lisp
(require ht)
(setq expenses-utils-keyword-category-ht (ht ("KEYWORD1" "Category1")
                                             ("KEYWORD2" "Category2"))
```

Importing bank statements could be made even easier by setting a profile for each of your account.
In this profile you describe how to assign different columns while importing. For example
```emacs-lisp
(setq expenses-bank-profiles (("EXAMPLE-BANK" "," 1 3 "dd/mm/yyyy" 2 -1) ("ANOTHER-BANK" "\t" 1 4 "yyyy/mm/dd" 2 3)))
```
The variable `expenses-bank-profiles` is a list where each element is of the form `(bank-name sep date-col debit-col date-format narrative-col category-col)`
. One can then use `expenses-import-expense-with-bank-profile` and choose a bank name from the above list to import the statement.

### Filtering expenses by categories
One can now filter the expenses for a whole year by one or more categories. Also the expenses filtered by categories are now listed from most expenses to least expenses.
