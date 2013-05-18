---
layout: post
title: Utilisez Browserify dès aujourd'hui en production
description: Organisez votre code JavaScript avec Browserify et profitez du système de modules côté client.
---

Vous en avez marre de voir du code JavaScript super mal organisé ?
Tout se retrouve toujours dans un fichier scripts.js ? Le système de
modules de node.js vous fait rêver ?

Voici du code client que j'ai écrit pour un site web récemment :
[code JS côté client][0]. Jaloux ? Lisez la suite.

Browserify
---

J'ai déjà parlé de browserify dans un [article précédent][1], mais je
vais le représenter. Il s'agit d'un logiciel qui permet d'écrire son
code en suivant le système CommonJS (le `require` de node.js), et le
transforme en code compatible avec les navigateurs. Quels sont les
avantages ?

- On peut séparer son code en modules dans plusieurs fichiers et les
  inclure facilement
- Chaque fichier a son propre namespace<sup>1</sup>, ce qui nous
  permet d'écrire directement `'use strict';` en première ligne de son
  fichier
- Lié au point précédent, on n'a pas à se soucier de créer des
  [IIFE][2] puisque chaque fichier a son propre namespace
- On peut utiliser les modules disponibles sur [npm][3]
- Le code mort est automatiquement enlevé lors de la compilation
- Le code est automatiquement vérifié par [JSHint][4] lors de la compilation

Séparation des fichiers
---

Après cette explication brève, place au code !

Voici un exemple de comment j'ai organisé mon code JS à l'aide de
browserify :

- Un fichier `main.js` qui comprend simplement une liste de scripts à
  exécuter.

    // fichier main.js

    // Charge le fichier menu.js dans le meme dossier
    require('./menu');

    // Charge le fichier home.js dans dossier apps/
    require('./apps/home');

Les fichiers étant `require`d vont être exécutés au chargement. Dans
chaque fichier, je peux donc faire ma petite histoire, lié au menu ou
à la homepage de mon site, par exemple.

    // fichier menu.js

    // J'active le plugin superfish ou autre

Bon. Pour l'instant, le principe des modules est assez sympa, mais
est-ce qu'il vaut vraiment le coup ? La prochaine phase vous fera dire oui.

Les modules npm
---

Je l'ai evoqué plus tôt, un des gros avantages de browserify est qu'il
permet d'utiliser des modules disponibles sur npm. Qu'est-ce que ça
veut dire ? Que si vous voulez jQuery, vous faites un `npm install
jquery`, et vous utilisez la ligne suivante dans votre code :

    var $ = require('jquery');

Et vous pouvez définir toutes les dépendances que vous voulez dans le
`package.json` à la base de votre projet, de cette manière :

    {
        "dependencies": {
            "jquery": "1.9.x"
        }
    }

Lorsque vous ferez un `npm install`, npm va lire le package.json et
télécharger toutes les dépendances dans le dossier `node_modules/`.

Encore mieux : vous pouvez créer vos propres modules ! Si par exemple,
vous voulez créer le module "carrousel" qui activera un carrousel,
vous n'aurez qu'à utiliser la ligne suivante dans le code de votre
application :

    var carrousel = require('carrousel');

    carrousel.run('some-id');

Grace a [npm link][5], vous pourrez facilement développer des modules
dans tous les sens.

Outils
---

Tout ça, c'est bien beau, mais je vous entends déjà : "oui mais il
faut lancer la commande `browserify main.js > bundle.js` à chaque fois
! Et en plus il faut minifier le code ! Et pour debugger c'est
horrible ! Et..."

Stop.

Je vais fournir un petit Makefile qui va résoudre tous vos soucis :

    all:
        browserify src/main.js | uglifyjs -mc > bundle.js

    debug:
        browserify -d src/main.js > bundle.js

Vous devez avoir installé node.js et lancé `npm install -g browserify
uglify-js` pour que ce Makefile marche.

L'option `-d` de browserify permet de passer en mode "source
maps". Qu'est-ce que ça veut dire ? Que le fichier fournit des
indications au navigateur pour pouvoir afficher le code original dans
les Developer Tools.

Voici un exemple de comment je debugge mon code apres avoir lance
`make debug` :

![Debug avec source map][6]

Lancer simplement un `make` vous donne un fichier JS minifié avec une
très bonne compression, du même niveau que ce que Google Closure
Compiler peut donner.

En plus de ce Makefile, je vous laisse chercher un watcher. Dès que
vos fichiers changent, il va relancer la commande `make
debug`. Personnellement, je n'en utilise pas, par choix.

Conclusion
---

Réutilisation du code ? Séparation du code ? Organisation du code ?
Browserify fournit tout ça bien plus simplement qu'aucune méthode
n'a pu le faire auparavant pour moi.



<sub>1: En réalite, chaque fichier a sa propre IIFE, mais le mot
"namespace" porte moins a confusion, je pense.</sub>



  [0]: https://github.com/Ralt/gettingstartedwithcommonlisp/tree/gh-pages/assets/js/src
  [1]: /2012/08/23/snake-en-canvas-check.html
  [2]: /2012/11/23/jquery-noconflict-dollar-and-iife.html
  [3]: https://npmjs.org/
  [4]: http://www.jshint.com/
  [5]: /2012/08/22/developper-module-nodejs-npm-link.html
  [6]: http://i.imgur.com/s7kCNby.png
