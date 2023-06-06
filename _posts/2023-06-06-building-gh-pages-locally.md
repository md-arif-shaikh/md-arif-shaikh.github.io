---
title: "Building github-pages locally"
date: 2023-06-06
tags: [jekyll, github-pages, ruby, rbenv]
excerpt: "locally building github-pages using jekyll"
mathjax: "true"
---
# Install rbenv
To build `jekyll` site, we need a ruby environment. To manage a ruby
environment for our github-pages project, we can do the following:
- Clone the `rbenv` repo: `git clone https://github.com/rbenv/rbenv.git ~/.rbenv/`
- Add to `fish` shell: `echo 'status --is-interactive; and ~/.rbenv/bin/rbenv init - fish | source' >> ~/.config/fish/config.fish`
- Install `ruby-build`: `git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build`
- Find latest stable ruby version: `rbenv install -l`
- Install a ruby version: `rbenv install 3.2.2`

# Activate a local ruby version
Now we can go to our project repository and activate a particular version of
ruby `rbenv local 3.x.x`

# Build Jekyll site
- First we install `bundler` and `jekyll`
 `gem install bundler jekyll`
- Install missing gems
 `bundle install`
 **Note** if you have `Gemfile.lock`, then move it out of the repository and
 try again.
- Now to build the site and serve run
 `bundle exec jekyll serve`
 Open the link in the output to view the website on your browser.
 In my case there was an error saying `webrick` is missing. This can be
 installed using
 `bundle add webrick`


