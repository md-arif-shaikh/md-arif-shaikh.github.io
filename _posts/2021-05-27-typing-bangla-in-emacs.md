---
title: "Typing Bangla in emacs"
date: 2021-05-27
tags: [emacs, Bangla, input-methods]
excerpt: "Typing Bangla in emacs"
mathjax: "true"
---

### Select an input method
Most of us emacsians who live inside emacs love to do everything within emacs. If you are a bangali then you are already familiar with the famous avro phonetic for typing bangla on your computer. You can use it with emacs also (with some conflicts of keybindings) but you don't have to. There is an in-built method `input-method` which enables entering text in non-english languages. In any buffer you can use `M-x toggle-input-method` (bound to `C-\`) and select an `input-method`. You can look at all the available method using `M-x list-input-methods` For bangla I use `bengali-itrans`. If you are happy with an `input-method`, you can make it the default `input-method` you want to toggle to by using the following in your settings.

```
(setq default-input-method "bengali-itrans")
```

additionaly you may want to use a nice font for bangla text. For example to use `kalpurush` font (download from [here](https://www.omicronlab.com/bangla-fonts.html)) use the following
```
(set-fontset-font "fontset-default" 'bengali (font-spec :family "Kalpurush" :size 18))
```
### Getting suggestions for words (autocompletion)
Now of the best feature of avro phonetic is that as you type it suggests you possible words. In emacs this is possible using the package `company` for autocompletion. `company` needs a backend which would feed it the data to use for autocompletion. There exists such a backend called `company-wordfreq` (see the source page [here](https://github.com/johannes-mueller/company-wordfreq.el)).

We need to setup few things to use `company-wordfreq`. First let's install the package using `use-package` and `straight` (or whatever other method you prefer).

```
(use-package company-wordfreq
  :straight t)
```
Behind the scene the emacs `input-method` uses `quail` package. It has it's own autocompletion but it's not about suggesting words but rather few strings associated with the current keystroke. Ideally we only want the english-to-bangla transformation for any keystroke and then use the `company` for getting suggestions based on the current bangla string at point. Therefore we first turn of the `quail-completion` and make return only the current one using `quail-select-current`. For this we want to override the `quail-completion` using the following

```
(defun remove-quail-completion ()
    (quail-select-current))
(advice-add 'quail-completion :override #'remove-quail-completion)
```
We also don't want the echo in the buffer from `qual`, so we do the following

```
(defun remove-quil-show-guidance ()
  nil)
(advice-add 'quail-show-guidance :override #'remove-quail-show-guidance)
```

We then set the local dictionary for `ispell-local-dictionary`. You can download the dictionary for available languages using `M-x company-wordfreq-download-list` and choosing the language. The dictionary is downloaded in the `~/.emacs.d/wordfreq-dicts` as `<languag-name>.txt`. Then set the `ispell-local-dictionary`
using

```
(setq ispell-local-dictionary "bengali")
```
where the language name is `bengali`. you can also download the dictionary from any other source and put it in that directory. [Here](https://github.com/MinhasKamal/BengaliDictionary) is repo containg Bangla dictionary.

Lastly we need the to set the following for the current buffer
```
(setq-local company-backends '(company-wordfreq))
(setq-local company-transformers nil)
```

We can put all these inside an `interactive` function and call it using `M-x` so that these are locally set.

```
(defun remove-quil-show-guidance ()
  nil)
(defun remove-quail-completion ()
  (quail-select-current))
(defun bn-company-wordfreq ()
  (interactive)
  (advice-add 'quail-show-guidance :override #'remove-quail-show-guidance)
  (advice-add 'quail-completion :override #'remove-quail-completion)
  (setq ispell-local-dictionary "bengali_439")
  (setq-local company-backends '(company-wordfreq))
  (setq-local company-transformers nil))
```

