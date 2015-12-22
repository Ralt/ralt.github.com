---
layout: post
title: A debian package for every Quicklisp system - Thanks to packagecloud.io
description: Every quicklisp system deserves its debian package.
---

If you want to deploy a common lisp package using quicklisp libraries,
chances are your only option is to compile it with buildapp and deploy
the binary. This has several drawbacks:

- The generated binaries are huge. Minimum 15MB.
- You need a machine with the same processor architecture to compile.

However, quicklisp is really *the* place where all the Common Lisp
libraries are. But quicklisp is unfortunately not suitable to global
installations, since the `quicklisp` folder is per-user.

To fix this, I have generated a debian package for every quicklisp
system available. The project that generates the debian packages is
available here, if you want to do it yourself: [qldeb][0]. (It depends
on [deb-packager][1].)

Every package will dump the library's source code in
`/usr/share/common-lisp/source/`, which is loadable by asdf if you
have `common-lisp-controller` installed on debian.

Another issue that I had: hosting.

I host my personal debian repository for some custom packages, but
it's just not convenient for something that can see some real usage.

The people at [packagecloud.io][2] have been very kind to provide me
free hosting for this repository.

Thanks to their machinery, all you need to download Common Lisp
libraries is this:

```
# apt-get install -y debian-archive-keyring apt-transport-https
# cat > /etc/apt/sources.list.d/packagecloud-quicklisp.list <<EOF
deb https://packagecloud.io/quicklisp/quicklisp/debian/ jessie main
deb-src https://packagecloud.io/quicklisp/quicklisp/debian/ jessie main
EOF
# curl https://packagecloud.io/gpg.key | apt-key add -
# apt-get update
```

And then, you can simply run e.g. `apt-get install cl-alexandria` to
globally install `alexandria`.

Several notes:

- Every package is prefixed with `cl-`
- To respect quicklisp's idea of a distribution, all the package
  dependencies require the same quicklisp version.
- You can quickly find out the quicklisp version in the package's
  version.

And with this, hack and glory awaits!


  [0]: https://github.com/ralt/qldeb
  [1]: https://github.com/ralt/deb-packager
  [2]: https://packagecloud.io
