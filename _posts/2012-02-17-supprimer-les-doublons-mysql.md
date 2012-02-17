---
layout: post
title: Supprimer les doublons sur plusieurs colonnes dans MySQL - une méthode simple !
description: Post décrivant la marche à suivre pour supprimer les doublons sur plusieurs colonnes dans MySQL.
---

Hier, j'ai eu besoin de supprimer tous les doublons d'une table. Attention, ces doublons étaient sur plusieurs colonnes. C'est-à-dire, par exemple, j'ai les colonnes "name, email, passwd". Si "name" existe plusieurs fois, ce n'est pas un doublon. Si la combinaison de "name" et "email" existe plusieurs fois, c'est un doublon.

Après pas mal de recherches, la plupart des résultats Google (que ce soit sur les forums [commentcamarche][1] (pas une super référence, je vous l'accorde) ou les sites de Q&A comme [stackoverflow][2]), tous recommandaient à peu près la même manière pour faire ça : une requête de 10 lignes avec des `join` sur la même table, une sous-requête... bref, vraiment pas simple.

Et puis, je suis tombé sur [ce lien][3]. Il explique, en une ligne, comment supprimer les doublons sur plusieurs colonnes, dans MySQL.

Voici la ligne magique :

{% highlight sql %}
ALTER IGNORE nom_de_la_table ADD UNIQUE INDEX(colonne1, colonne2);
{% endhighlight %}

Commande magique. J'ai eu mes 1000+ doublons supprimés en une seconde (sur une table de 10000 entrées, à peu près).

Attention toutefois, ça ajoute un index à votre table, donc faites gaffe au niveau des performance, n'hésitez pas à supprimer l'index si ça vous pose souci par la suite.

[1]: http://www.commentcamarche.net/forum/affich-5038607-comment-dans-une-table-enlevee-les-doublons
[2]: http://stackoverflow.com/questions/3383898/remove-duplicates-using-only-a-mysql-query
[3]: http://mediakey.dk/~cc/mysql-remove-duplicate-entries/
