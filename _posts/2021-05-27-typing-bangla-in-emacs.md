---
title: "Typing Bangla in emacs"
date: 2021-05-27
tags: [emacs, Bangla, input-methods]
excerpt: "Typing Bangla in emacs"
mathjax: "true"
---

### Select an input method
Most of us emacsians who live inside emacs loves to do everything within emacs. If you are a bangali then you are already familiar with the famous avro phonetic for typing bangla on your computer. You can use it with emacs also (with some conflicts of keybindings) but you don't have to. There is an in-built method `input-method` which enables entering text in non-english languages. In any buffer you can use `M-x toggle-input-method` (bound to `C-\`) and select an `input-method`. You can look at all the available method using `M-x list-input-methods` For bangla I use `bengali-itrans`. If you are happy with an `input-method`, you can make it the default `input-method` you want to toggle to by using the following in your settings.

```
(setq default-input-method "bengali-itrans")
```

additionaly you may want to use a nice font for bangla text. For example to use `kalpurush` font (download from [here](https://www.omicronlab.com/bangla-fonts.html)) use the following
```
(set-fontset-font "fontset-default" 'bengali (font-spec :family "Kalpurush" :size 18))
```
