---
layout: post
title: Web framework for node.js&#58; tartempion is released!
description: A new web framework for node.js has been released.
---

I've been working on a web framework for node.js these last few weeks. I've named
this project:

[`tartempion`: The web framework for people who like to eat some pie.][0]

Today, it's been released onto npm!

Now onto some explanation on why I made this framework, and why I think you
should use it, right now! :-)

Some explanation
---

Firstly, there are some good web frameworks out there, so why release another
one, heh? Well, the frameworks weren't good enough for me.

[express][1], the best I've tried (personal opinion) is really great. It handles
a lot of stuff for you, like middlewares, sessions, templates, cookies, etc. The problem when
you develop on it though, is that you have to pass the `app` object around in arguments
if you're using several files. And everybody uses several files.

Besides, express doesn't dictate you an architecture. This is great since it leaves
you a lot of flexibility, but it's not the fastest way to create new projects. Time is money.

Another great project I came across to is [ncore][2]. This module allows you to have
a dependency injection handler. This is kind of really needed when you start having a lot
of files in your project. This way, you don't have to pass the essential objects around
in arguments. And we all know that global variables are evil :-).

This is why I've made `tartempion`. A module allowing you to develop websites while
just caring about the business logic. You don't have to care about passing some objects
in arguments, or how to create the session handler etc etc. Just set your routes, controllers
and models, and you're good to go. Seriously.

The concept
---

`tartempion` has a unique concept: a pie.

A pie is an entity. It is similar to apps in Django for those familiar with it. It has
some routes, it has a controller, and it has a model.

This concept allows you to reuse those pies across different projects. For example, if you
made a user management pie for some project, you could just copy paste this pie onto your
new project, and it will work!

And now
---

There is still a lot of work to be done! The release is an alpha release, it is there
so that people can test it right now and find out if they like it.

The full roadmap is available [there][3], and there is already some kind of documentation.
Although it's not really up-to-date, it can already help you get started. There is also
[this blog][4] written with `tartempion` so that you can have a real example. (And see
how easy it is!)

If you have any feedback, I'd really appreciate it! `tartempion` is at its very early stage,
and I plan on spending a lot of time on it.


   [0]: https://github.com/Ralt/tartempion
   [1]: http://expressjs.com
   [2]: https://github.com/Raynos/ncore
   [3]: https://github.com/Ralt/tartempion#roadmap
   [4]: https://github.com/Ralt/tartempion-blog

