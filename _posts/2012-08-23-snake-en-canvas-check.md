---
layout: post
title: Snake en HTML5 canvas, check !
description: Un petit snake en HTML5 canvas, avec code disponible !
---

Depuis deux jours, j'ai découvert comment utiliser deux choses :

- [browserify][1]
- HTML5 Canvas

On ne présente plus le canvas d'HTML5 :-) Browserify, par contre, est plutôt pas mal !

Pour apprendre ces deux en même temps, j'ai créé un Snake en javascript, en utilisant
l'élément canvas ! La démo est accessible [en cliquant ici][2] (il y a quelques bugs,
mais j'ai passé l'étape "j'ai appris", donc je ne reviendrai plus dessus). Le code est
accessible [sur GitHub][3].

Browserify, quant à lui, est génial. Il permet d'écrire du code javascript comme dans
node.js, en utilisant `require` de manière synchrone, on peut même utiliser des modules
disponibles par défaut dans node.js (`events`, `assert`, `querystring`, etc, ce qui
ne font pas d'I/O) pour des modules disponibles sur npm (comme `domready`).

Vous pouvez voir le code de Snake ici: https://github.com/Ralt/Snake/tree/gh-pages/js

Ca commence dans le fichier `main.js`, et tout le reste suit.

Les plus gros avantages que j'ai trouvé par rapport à require.js, c'est une indentation
en moins. On dirait pas, mais ça améliore grandement les choses. Aussi, je peux simplement
mettre un `"use strict";` au début du fichier, et ça passe ! :-)

Browserify génère un fichier compatible navigateur à partir d'un fichier d'entrée qu'on
lui fournit.

Désormais, je peux dire que je sais faire un petit jeu en canvas, et je sais quoi utiliser
si je veux bien organiser mon code pour les navigateurs :-).

   [1]: https://github.com/substack/node-browserify
   [2]: http://margaine.com/Snake
   [3]: https://github.com/Ralt/Snake

