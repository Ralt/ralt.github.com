---
layout: post
title: Interagir avec la page dans une extension Google Chrome
description: Comment utiliser les méthodes disponibles dans la page à partir d'une extension Google Chrome
---

Depuis quelques jours, je développe une [une extension Google Chrome][1].

Dans cette extension, je dois exécuter des méthodes javascript disponibles
sur la page. Vous pouvez vouloir exécuter une méthode d'une librairie
disponible sur la page, comme par exemple un `.next()` sur un diaporama.

Si vous pouvez utiliser des `KeyboardEvent` ou autre, faites-le, cela vous
simplifiera la vie.

Le problème dans une extension, c'est qu'on n'a accès qu'au DOM (globalement),
donc si on veut exécuter du javascript fourni par une librairie, faire un
`lib.next()` vous donnera une erreur, puisque l'extension n'a pas accès à ces
fonctions.

En regardant sur Google, je n'ai pas trouvé de résultat concluant. La plupart
des résultats disent simplement que ce n'est pas possible, dû à des raisons
de sécurité, etc etc.

Voici une méthode qui vous permettra d'exécuter du code dans le contexte
de la page :

{% highlight js %}
function injectCode( code ) {
    // Create a script element
    var script = document.createElement( 'script' );

    // Add the code to this element
    script.textContent = code;

    // Injecting the script will execute the code in it!
    document.body.appendChild( script );

    // Once it's injected, the code will be executed, so we don't need
    // the element anymore
    script.parentNode.removeChild( script );
}
{% endhighlight %}

Et voilà ! Utiliser la fonction de cette manière pour exécuter `lib.next()`,
et ça marchera :

{% highlight js %}
injectCode( 'lib.next();' )
{% endhighlight %}

Cette méthode marche au top.

Après cela, j'ai eu un autre problème : je voulais exécuter plus qu'une simple
ligne de code, mais une fonction entière. Heureusement, j'ai rapidement trouvé
cette solution... élégante !

{% highlight js %}
function f() {
    // Some code to execute in the page context
    lib.next();
}

// This is the magic hack!
injectCode( f.toString() );
{% endhighlight %}

Utiliser la méthode `toString()` sur la fonction (et non pas *l'exécution* de
la fonction) renvoie un string avec le contenu de la fonction. Par exemple,
dans le cas de `f`, ça donnera ceci :

{% highlight js %}
f.toString(); // "function f() { lib.next(); }"
{% endhighlight %}

Et voilà ! De cette manière, on peut donc interagir avec la page à partir
d'une extension Google Chrome.

   [1]: https://github.com/Ralt/remoteprez

