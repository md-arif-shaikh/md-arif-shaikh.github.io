---
title: "Building pdf-tools on Windows"
date: 2023-06-02
tags: [emacs, pdf-tools]
excerpt: "pdf-tools on emacs"
mathjax: "true"
---

[pdf-tools](https://github.com/vedang/pdf-tools) is a great package for viewing pdfs on
[Emacs](https://www.gnu.org/software/emacs/). Building it sometimes can be a
little challenging. Recently I built it for Emacs on Windows 11. Here I note
down the steps to successfully build pdf-tools for Emacs on Windows 11.

# Install MSYS2
On Windows, pdf-tools is built using `pacman`. We can install the necessary
tools using [MSYS2](https://www.msys2.org/). Follow the installation steps
there.

# Build pdf-tools
Go to the directory that contains the `autobuild` script. For example, it will
be located at `pdf-tools/build/server/`. Launch `MSYS2` terminal and run
`./autobuild`.

The `autobuild` script does not recognize `UCRT64` system. We need to change
the system variable `MSYSTEM` to `MINGW64`. To do that, open `Edit the system
environment variables` from control panel or just by searching on
Windows. Click on `environment variables` and add a new variable `MSYS2` with
value `MINGW64`. After this, `./autobuild` should run without error.
