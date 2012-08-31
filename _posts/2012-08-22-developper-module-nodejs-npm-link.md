---
layout: post
title: Développer un module node.js, penser à npm link !
description: Pourquoi utiliser npm link vous rend la tâche plus facile pour développer un module node.js
---

Expérience récente : si vous développez un module node.js que vous comptez
publier sur npm (ou pas, mais au moins l'utiliser dans le genre `var mod = require( 'mod' );`),
il existe quelque chose de peu documenté, mais qui marche du feu de dieu : utiliser `npm link`.

Qu'est-ce que ça fait ? Un lien global vers votre module. Exemple.

Je développe un module dans le dossier `/home/dev/tartempion`. Dans ce dossier, je tape
la commande suivante :

    sudo npm link

Un lien vers le module (spécifié dans la propriété `main` du package.json) est créé
dans le dossier `/usr/local/lib/node_modules/tartempion`, qui pointe vers le dossier
`/home/dev/tartempion`. Un lien du même type est fait si vous avez un binaire (champ
`bin` du package.json). C'est un peu la même chose que de faire :

    ln -s /home/dev/tartempion/ /usr/local/lib/node_modules/

npm fait d'autres trucs comme installer les dépendances, mais l'idée est là.

Déjà, si vous avez un binaire, vous pouvez le tester directement. Si vous modifiez
le fichier exécutable dans `/home/dev/tartempion`, les changements sont *immédiatement*
effectués. En effet, l'exécutable global n'est qu'en fait un lien vers le fichier
que vous venez de changer.

Si vous souhaitez installer localement le module dans un projet, c'est possible.

De la même manière que vous feriez `npm install someModule`, vous devez simplement faire :

    npm link moduleName

Et voilà ! Pareil que pour l'exécutable global, ce ne sont que des liens vers le dossier
de développement, donc tous les changements sont en temps réel.

**Update** J'ai créé un module qtout simple qui devrait expliquer tout cela correctement
avec un exemple : https://github.com/Ralt/mymodule

