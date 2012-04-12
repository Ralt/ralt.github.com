---
layout: post
title: Comment connaître le type d'un objet en javascript?
description: Connaître le type d'un object en javascript peut se révéler error-prone. Voyons comment faire du mieux possible.
---

Un petit truc très utile. En javascript, pour connaître le type d'une variable, il y a à priori la méthode `typeof`. 

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

Le problème, c'est que les tableaux et même la valeur `null` sont des objets en javascript. Les fonctions aussi, mais elles sont un cas particulier car elles ont un [constructeur][2] particulier.

La solution à ce problème ? La voici :

{% highlight js %}
Object.prototype.toString.apply([]) // "object Array"
Object.prototype.toString.apply(null) // "object Null"
({}).toString.apply(function() {}) // "object Function"
{% endhighlight %}

Les deux méthodes fonctionnent, mais c'est un poil [plus rapide][1] en utilisant `Object.prototype`.

Si vous vous demandez pourquoi je rajoute des parenthèses autour de l'objet vide, c'est pour la raison citée [ici][3].

Si vous comptez l'utiliser plusieurs fois :

{% highlight js %}
function realTypeof(obj) {
    return Object.prototype.toString.apply(obj)
}
realTypeof([]) // "object Array"
{% endhighlight %}

Oh, et ça marche jusqu'à IE6.

Juste un petit truc que je voulais partager :-)

[1]: http://jsperf.com/object-prototype-vs-litteral-object
[2]: http://es5.github.com/#x15.3.4
[3]: http://stackoverflow.com/questions/10006332/why-doesnt-tostring-applyarray-work
