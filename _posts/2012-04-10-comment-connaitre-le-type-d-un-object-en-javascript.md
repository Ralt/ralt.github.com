---
layout: post
title: Comment connaître le type d'un object en javascript?
description: Connaître le type d'un object en javascript peut se révéler libre à l'erreur. Voyons comment faire du mieux possible.
---

Un petit truc très utile. En javascript, pour connaître le type d'un objet, il y a à priori la méthode `typeof`. 

Voyons un peu si ça marche correctement :

{% highlight js %}
typeof {} // "object" -> good!
typeof function() {} // "function" -> good!
typeof "" // "string" -> good!
typeof undefined // "undefined" -> good!

// Maintenant, on va un peu plus loin...
typeof null // "object" -> no good :(
typeof [] // "object" -> no good either :(
{% endhighlight %}

Le problème, c'est que tout est objet en javascript. Et certains le sont plus que d'autres.

La solution à ce problème ? La voici :

{% highlight js %}
({}).toString.apply([]) // "object Array"
({}).toString.apply(null) // "object Null"
({}).toString.apply(function() {}) // "object Function"
{% endhighlight %}

Juste un petit truc que je voulais partager :-)

