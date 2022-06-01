---
title: "Typing Bangla in emacs"
date: 2021-05-27
tags: [emacs, Bangla, input-methods]
excerpt: "Typing Bangla in emacs"
mathjax: "true"
---

### Select an input method
Most of us emacsians who live inside emacs love to do everything within emacs. If you are a Bangali then you are already familiar with the famous Avro phonetic for typing Bangla on your computer. You can use it with emacs also (with some conflicts of keybindings) but you don't have to. There is an in-built method `input-method` which enables entering text in non-English languages. In any buffer, you can use `M-x toggle-input-method` (bound to `C-\`) and select an `input-method`. You can look at all the available method using `M-x list-input-methods` For bangla I use `bengali-itrans`. If you are happy with an `input-method`, you can make it the default `input-method` you want to toggle to by using the following in your settings.

```emacs-lisp
(setq default-input-method "bengali-itrans")
```

additionally you may want to use a nice font for Bangla text. For example to use `kalpurush` font (download from [here](https://www.omicronlab.com/bangla-fonts.html)) use the following

```emacs-lisp
(set-fontset-font "fontset-default" 'bengali (font-spec :family "Kalpurush" :size 18))
```

### Getting suggestions for words (autocompletion)
Now, one of the best features of Avro phonetic is that as you type it suggests you possible words. In emacs this is possible using the package `company` for autocompletion. `company` needs a backend that would feed it the data to use for autocompletion. There exists such a backend called `company-wordfreq` (see the source page [here](https://github.com/johannes-mueller/company-wordfreq.el)).

We need to set up few things to use `company-wordfreq`. First, let's install the package using `use-package` and `straight` (or whatever other method you prefer).

```emacs-lisp
(use-package company-wordfreq
  :straight t)
```

Behind the scene, the emacs `input-method` uses `quail` package. It has its own auto-completion but it's not about suggesting words but rather few strings associated with the current keystroke. Ideally, we only want the English-to-Bangla transformation for any keystroke and then use the `company` for getting suggestions based on the current Bangla string at the point. Therefore we first turn off the `quail-completion` and make return only the current one using `quail-select-current`. For this, we want to override the `quail-completion` using the following

```emacs-lisp
(defun remove-quail-completion ()
    (quail-select-current))
(advice-add 'quail-completion :override #'remove-quail-completion)
```

We also don't want the echo in the buffer from `qual`, so we do the following

```emacs-lisp
(defun remove-quail-show-guidance ()
  nil)
(advice-add 'quail-show-guidance :override #'remove-quail-show-guidance)
```

We then set the local dictionary for `ispell-local-dictionary`. You can download the dictionary for available languages using `M-x company-wordfreq-download-list` and choosing the language. The dictionary is downloaded in the `~/.emacs.d/wordfreq-dicts` as `<languag-name>.txt`. Then set the `ispell-local-dictionary`
using

```emacs-lisp
(setq ispell-local-dictionary "bengali")
```

where the language name is `bengali`. You can also download the dictionary from any other source and put it in that directory. [Here](https://github.com/MinhasKamal/BengaliDictionary) is a repo containing Bangla dictionary.

Lastly, we need to set the following for the current buffer

```emacs-lisp
(setq-local company-backends '(company-wordfreq))
(setq-local company-transformers nil)
```

We can put all these inside an `interactive` function and call it using `M-x`.

```emacs-lisp
(defun remove-quail-show-guidance ()
  nil)
(defun remove-quail-completion ()
  (quail-select-current))
(defun bn-company-wordfreq ()
  (interactive)
  (advice-add 'quail-show-guidance :override #'remove-quail-show-guidance)
  (advice-add 'quail-completion :override #'remove-quail-completion)
  (setq ispell-local-dictionary "bengali")
  (setq-local company-backends '(company-wordfreq))
  (setq-local company-transformers nil))
```

### Workflow
- Change the `input-method` using `C-\`
- Enable `company-wordfreq` and other changes for a nice experience using `M-x bn-company-wordfreq`
- `TAB` to get suggestions.
- `ARROW` to select one.

### Screencast
![typing-bangla-in-emacs](/assets/bangla-typing-in-emacs.gif)
