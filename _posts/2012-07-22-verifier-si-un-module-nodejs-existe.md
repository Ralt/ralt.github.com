---
layout: post
title: Vérifier si un module node.js existe
description: Astuce pour vérifier si un module existe sans quitter le programme
---

Aujourd'hui, je voulais vérifier si un module node.js était disponible.

Une chose que je ne voulais pas : arrêter le programme parce que le module n'est
pas trouvé. Je voulais m'occuper personnellement de l'erreur (le but étant de montrer
un message qui veuille dire quelque chose sans stack trace, histoire de garder le tout
"propre").

Voici la manière que j'ai trouvé :-)

{% highlight js %}
var mongodb;
try {
    mongodb = require( 'mongodb' );
}
catch( e ) {
    if ( e.code === 'MODULE_NOT_FOUND' ) {
        // Le module n'a pas été trouvé :-)
    }
}
{% endhighlight %}

