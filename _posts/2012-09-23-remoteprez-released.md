---
layout: post
title: remoteprez, a Google Chrome extension is released!
description: remoteprez is a Google Chrome extension to remotely control an HTML5 presentation
---

Alright, this is what I've been working on during the last few weeks. I don't
have so much time unfortunately, so I could only work on it during some
weekends. But there it is!

[remoteprez][1] is now available on the Chrome Web Store. It allows you to
remotely control an HTML5 presentation based on reveal.js, impress.js,
html5slides or csss.

The official website of the extension is [right there][2].

For what it's worth, here is the technical architecture:

- The extension was written using [node-browserify][3].
- It's using a node.js server with socket.io to connect between the controller
and the presentation.
- It generates its own qrcode with a custom library. No external dependency.

The code is available [on GitHub][4].

Enjoy!

   [1]: https://chrome.google.com/webstore/detail/jihlhdedapddcnlfiihkgbbenejjbnak
   [2]: http://remoteprez.margaine.com
   [3]: https://github.com/substack/node-browserify
   [4]: https://github.com/Ralt/remoteprez

