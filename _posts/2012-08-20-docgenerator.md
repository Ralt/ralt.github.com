---
layout: post
title: docgenerator, un générateur de documentation
description: Présentation d'un générateur de documentation à partir de fichiers Markdown
---

Je viens tout juste de mettre un nouveau module sur npm, j'ai nommé : [docgenerator][1].

Pourquoi ?
---

Quand on doit écrire de la documentation, il est toujours utile de séparer correctement
les différentes parties que l'on documente. Mais il est aussi utile d'avoir un fichier
complet généré. Heureusement, [htmldoc][2] fait exactement ça : il prend plusieurs
fichiers HTML et en génère un seul avec la table des matières, etc. C'est une solution
testée depuis de nombreuses années qui marche.

Le problème, c'est qu'il ne lit que le HTML en format d'entrée. Or, je préfère écrire
ma documentation en markdown plutôt qu'en HTML. Beaucoup plus clair, concis, etc.

Le module docgenerator est donc le pont entre les deux : il prend des fichiers markdown
et en crée un seul à la fin : la documentation complète générée par htmldoc.

Usage
---

Premièrement, pensez à `npm install docgenerator` :-).

Ensuite, j'ai mis [l'exemple suivant][3] en ligne:

{% highlight javascript %}
var generator = require( 'docgenerator' ),
    fs = require( 'fs' );

// Get all the markdown files
var files = fs.readdirSync( '.' );

files = files.filter( function( file ) {
    // Only keep the markdown files
    return file.substr( -3 ) === '.md';
});

generator
    .set( 'format', 'book' )
    .set( 'output', 'documentation.html' )
    .set( 'input', files )
    .generate();
{% endhighlight %}

Comme vous pouvez le voir, l'API est assez simple, et chainable en petit bonus :-)

   [1]: https://npmjs.org/package/docgenerator
   [2]: http://www.htmldoc.org
   [3]: https://github.com/Ralt/docgenerator/tree/master/example

