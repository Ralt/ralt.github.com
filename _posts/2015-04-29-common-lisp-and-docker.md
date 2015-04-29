---
layout: post
title: Common Lisp and Docker
description: How to use docker to handle your Common Lisp applications
---

<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. The end goal</a></li>
<li><a href="#sec-2">2. The required Lisp code</a></li>
<li><a href="#sec-3">3. The containers</a>
<ul>
<li><a href="#sec-3-1">3.1. The <code>db</code> container</a></li>
<li><a href="#sec-3-2">3.2. The <code>web</code> container</a></li>
</ul>
</li>
<li><a href="#sec-4">4. Conclusion</a></li>
</ul>
</div>
</div>

This post is a reminder for either myself or other people wanting to
use Common Lisp applications in Docker containers.

# The end goal<a id="sec-1" name="sec-1"></a>

At the end of this post, there will be:

-   2 Docker containers: web and postgres
-   The `db` container will run a postgresql instance
-   The `web` container will run a Hunchentoot web server
-   The `web` container will run a swank server

The 2 last points mean that:

-   Going to <http://localhost:4242> will hit Hunchentoot
-   Running `M-x slime-connect 127.0.0.1 5555` will connect to the
    container's swank server

# The required Lisp code<a id="sec-2" name="sec-2"></a>

To have a Hunchentoot instance as well as a swank server, the
following Lisp code is needed, somewhere in the application:

    (defun main (&rest args)
      (declare (ignore args))
      (hunchentoot:start
        (make-instance 'hunchentoot:easy-acceptor
                       :port 4242
                       :address "localhost"))
      (setf swank::*loopback-interface* "0.0.0.0")
      (swank-loader:init)
      (swank:create-server :port 4005
                           :style swank:*communication-style*
                           :dont-close t))

Note that the swank server's loopback interface must be
`0.0.0.0`. This is required so that the host can connect to the
container. `127.0.0.1` wouldn't work and building an ssh tunnel is
more complicated than it's worth. This is **not** a security issue,
since the container will be on a network shared between the host and
the container only.

This code can be compiled to a binary using something similar to this:

    $ buildapp --load-system foo --entry foo::main

# The containers<a id="sec-3" name="sec-3"></a>

Since 2 containers will be needed, their specification is needed.

-   The `db` container will just be the official `postgres` image
    with a persistent folder. (So that the data in the databases are
    persisted between each container's restart.)
-   The `web` container will be based on a custom Docker image.

## The `db` container<a id="sec-3-1" name="sec-3-1"></a>

Here is the command to **create** the `db` container:

    $ sudo docker run \
        --volume=/var/lib/postgresql/data \
        --env="POSTGRES_PASSWORD=password" \
        --name=db postgres

This will create a container named `db`, based on the `postgres`
image. The image will be downloaded from dockerhub if you don't have
it locally. The `POSTGRES_PASSWORD` environment variable allows you to
define the password for the `postgres` database, usable by the
`postgres` user in the container.

To start and stop the container later on, the following commands can
be used:

    $ sudo docker start db
    $ sudo docker stop db

As simple as that!

## The `web` container<a id="sec-3-2" name="sec-3-2"></a>

This container needs a special image. For that, a `Dockerfile` is
needed. Before this, a simple `Makefile` should be used to simplify
life.

Here is a sample `Makefile` (let's assume the project name is `foo`):

    all:
            buildapp --load-system foo --entry foo::main --output foo.bin

With this done, here is a sample `Dockerfile`:

    # This image is available on dockerhub, automatically downloaded
    FROM dparnell/sbcl-1.2.5

    # 4242 is for hunchentoot, 4005 is for swank
    EXPOSE 4242 4005

    # Going to this folder means ASDF automatically picks up the project
    WORKDIR /root/common-lisp/foo

    # The command to run every time the container is started
    CMD make && ./foo.bin

To build this custom image:

    $ sudo docker build -t my/foo .

Now that the custom image (named `my/foo`) is ready, let's create a
container:

    $ sudo docker run \
        --volume="$PWD:/root/common-lisp/foo
        --link="db:dbhost"
        --publish="4242:4242"
        --publish="5555:4005"
        --name="web"
        my/foo

Here is what each argument means:

-   The `--volume` argument defines a folder mapping between the host
    and the container.
-   The `--link` argument adds a link between 2 containers. Here, the
    `db` container's IP will be added to the `web` container's
    `/etc/hosts`, under the name `dbhost`. This will let you connect to
    the database using the following parameters:
    -   username: `postgres`
    -   password: `password`
    -   database: `postgres`
    -   host: `dbhost`
-   The `--publish` argument defines a port forwarding between the host
    and the container. In this case, `host:4242` forwards to
    `container:4242`, and `host:5555` forwards to `container:4005`.
-   The `--name` argument gives a name to the container.
-   The last argument is the image that the container is based on.

Same as earlier, to start/stop the container:

    $ sudo docker start web
    $ sudo docker stop web

# Conclusion<a id="sec-4" name="sec-4"></a>

So, there it is. There now is 2 containers, and they:

-   Run a postgresql instance
-   Run a hunchentoot instance
-   Run a swank-server instance

Which means:

-   You can go on <http://localhost:4242>
-   You can `M-x slime-connect` on `127.0.0.1:5555`
