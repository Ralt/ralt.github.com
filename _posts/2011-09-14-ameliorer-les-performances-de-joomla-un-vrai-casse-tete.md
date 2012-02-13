---
layout: post
title: Améliorer les performances de Joomla - un vrai casse-tête
description: Astuces pour améliorer les performances de Joomla.
---

Je travaille actuellement sur Joomla!, un des CMS libres les plus connus à l'heure actuelle. On ne rentrera pas dans le débat entre lui et Drupal, chacun a ses avantages et inconvénients, et ce n'est pas le sujet.

Une fois que j'ai mis le site en place, je me suis retrouvé face à un souci assez embêtant. Deux soucis, en fait. L'un imbriqué dans l'autre.
Pour que le site marche, il faut un bon référencement. Un des facteurs du référencement est le temps de chargement d'un site. Autrement dit, la performance du site. Et puis, si vous voulez que vos utilisateurs restent, il faut pas que le site mette trop longtemps à charger, aussi.

Je me suis donc retrouvé devant la vaste tâche d'améliorer les performances de notre site web Joomla!.

J'ai donc commencé par regarder quels outils je pouvais utiliser pour diagnostiquer ce manque de performance, et comment les améliorer.

Je suis tombé sur plein de sites web, dont [JoomlaPerformance](http://www.joomlaperformance.com/), mais ce qui m'a beaucoup séduit est l'extension [PageSpeed](http://code.google.com/intl/fr/speed/page-speed/docs/extension.html) pour Firefox/Firebug, de Google.

Je l'ai donc installée, et elle m'a permis de voir que beaucoup de choses n'allaient pas.

À l'aide de cet outil, j'ai donc commencé par m'occuper de tout ce qui était lié au cache et la compression. J'ai donc activé la [compression gzip](http://forum.joomla.org/viewtopic.php?f=428&t=544802&sid=2d776685531cc4718d2002bef3b11752) des images et l'extension "Cache" de Joomla!, qui est vraiment géniale. Pour améliorer le cache, j'ai également [personnalisé](http://www.google.com/#sclient=psy&hl=fr&q=cache+optimize+htaccess&aq=f&aqi=&aql=&oq=&gs_rfai=&pbx=1&fp=2e27c7a6f099229e) le .htaccess.

J'ai vu également que beaucoup d'images n'avaient pas de tag width et/ou height, ce qui a une influence sur la performance de rendu.

Je me suis donc retrouvé face à un souci assez embêtant : les extensions que j'utilisais étaient mal développées.

Que faire : changer d'extension, en espérant trouver une similaire, mais mieux codée? J'avais choisi les extensions en fonction de leur popularité (welcome to free world), je voyais donc mal comment changer ça. De plus, certaines extensions étaient uniques en leur genre.

J'ai donc décidé une chose :

soit l'extension n'est pas trop *mal* codée, et utilise le système MVC recommandé par Joomla!, dans ce cas, avec le [template override](http://docs.joomla.org/How_to_override_the_output_from_the_Joomla%21_core) de Joomla!, je pouvais corriger ces erreurs
soit l'extension n'utilise pas le modèle MVC, et j'ai été forcé de modifier le code directement dans l'extension. J'ai donc mis dans un fichier doc toutes les modifications que j'ai pu faire, au cas où il faudrait faire une mise à jour de cette extension, ces changements seraient effacés, donc à refaire.
Une fois cela fait, les performances augmentaient petit à petit, et ça se voyait (notamment quand j'ai activé le cache, ça a fait boom).

Toutefois, PageSpeed m'indiquait encore des améliorations possibles. Notamment, que je pouvais minifier et réduire le nombre de fichiers CSS/JavaScript (car un fichier CSS à télécharger = 1 HTTP request, plus il y a de fichiers, plus il y a de requests).

Autre problème : la plupart des fichiers CSS/JS étaient sortis par les extensions. Je ne pouvais donc pas empêcher les extensions de sortir leurs fichiers CSS/JS, parce que ça ne relève pas forcément du V (de MVC).

Je me suis donc penché vers des extensions qui pourraient me résoudre ce problème. Très vite, je me suis rendu compte que ce problème était courant, et donc que de nombreuses extensions étaient faites pour ça.

J'en ai essayé de nombreuses, dont [certaines très populaires](http://extensions.joomla.org/extensions/site-management/site-performance), mais aucun ne m'allait. En effet, chacun d'entre elles cassait quelque chose dans le template de mon site. Soit quelque chose qui ne marchait pas, soit quelque chose disparaissait, etc.

Et puis, je suis tombé sur [ça](http://farhadi.ir/works/smartoptimizer). J'ai tenté le coup, et ça marche à merveille! Ca m'optimisait également un peu plus le côté gzip/htaccess.

Bon, au niveau de l'amélioration de PageSpeed, ça allait à peu près. Pourtant, le site avait toujours des soucis de performance.

J'ai remarqué également que plusieurs extensions n'étaient pas du tout utilisées. D'après les conseils avisés de nombreux forums, j'ai préféré les supprimer. Ça a permis une petite amélioration. 

Après cela, étant donné qu'il n'y avait plus grand chose à faire du côté de Joomla!, j'ai pensé que c'était peut-être un souci au niveau du moteur PHP et/ou MySQL.

Après quelques recherches, c'est MySQL qui semble poser le plus souvent des soucis. Je décide donc de m'y atteler en premier.

J'ouvre sa configuration, et là : horreur. Aucun tampon utilisé, et le serveur était configuré pour une machine avec 128Mo de RAM. Sur un serveur à 4Go de RAM.
Bon, allez, on va optimiser tout ça, [à l'aide d'outils](http://mediakey.dk/~cc/optimize-mysql-performance-with-mysqltuner/), on [optimise les tables existantes](http://webdigity.wordpress.com/2006/06/09/automatically-optimize-all-tables-in-a-mysql-database/), et on se retrouve avec une nette amélioration de la vitesse du site.

Côté MySQL, on est bons. Voyons du côté de PHP, maintenant.

D'après ce que j'ai pu remarquer, il existe de nombreux optimizers pour PHP, dont les plus connus semblent être [Zend Optimizer](http://www.zend.com/en/products/guard/runtime-decoders) et [PHP-eAccelerator](http://eaccelerator.net/). J'ai choisi ZO pour sa notoriété. Mais le choix aurait pu être l'inverse.

Après tout ça, j'avais un site optimisé en terme de performance.

Il y a beaucoup d'installations d'extensions, programmes, outils, etc. Selon les serveurs, ce genre d'installation peut provoquer des effets inattendus. Car ces optimisations signifient que le CPU est utilisé beaucoup plus. Il faut donc faire en sorte de trouver l'équilibre...

