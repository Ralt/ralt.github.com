---
layout: post
title: jQuery.noConflict(), $ et IIFE
description: Comment utiliser $ avec jQuery.noConflict, et comment les IIFE marchent
---

Assez souvent, je vois des gens écrire ce genre de code :

{% highlight js %}
jQuery('some selector').click(function() {
  jQuery('other selector').hide();
});
{% endhighlight %}

Et ça, sur plein de lignes. Vous ne vous posez pas une question que n'importe
quel développeur devrait se poser ? Genre, comment écrire moins de texte que
nécessaire ? Qui plus est, tout le monde a appris `jQuery` en utilisant `$`,
pourquoi ça ne choque personne de voir autant de code ?

Bref, passons le sens philosophique de la chose qui est probablement lié au fait
que les gens considèrent javascript comme un toy language, il y a un moyen assez
simple de récupérer ce cher dollar perdu à cause d'un noconflict :

{% highlight js %}
(function($) {
  $('some selector').click(function() {
    $('other selector').hide();
  });
}(jQuery));
{% endhighlight %}

Woohoo ! C'est cool, ça marche super bien. Par contre, quand je montre ça à mes
collègues, ils voient que ça marche, mais ils comprennent pas du tout *comment*
ça marche. D'un autre côté, on est plutôt pressés en général (deadlines,
livraison pour hier, etc), donc pas trop le temps d'expliquer. Donc je vais le
faire ici.

Il faut savoir que cette notation s'appelle une expression de fonction. La
plupart du temps, vous voyez une définition de fonction,  mais là c'est pas
exactement pareil. Bref, toujours est-il que ça reste une fonction bête et
méchante. Et l'utilisation de cette expression de fonction est tellement
fréquente qu'une fonction anonyme de ce type a son propre acronyme: IIFE.
Immediately Invoked Function Expression.

Maintenant que la sémantique est posée,  on voit comment marche tout ça ? C'est
parti !

Rien de tel que décortiquer pour mieux comprendre, donc on va faire comme ça.

{% highlight js %}
function () {}
{% endhighlight %}

Jusque là, ça devrait aller: on déclare une fonction anonyme.

{% highlight js %}
(function () {})
{% endhighlight %}

Là, c'est un peu plus compliqué: on a une *expression de fonction*. Qu'est ce
que ça veut dire ? Que ce n'est plus simplement une déclaration. Quel est
l'avantage par rapport à une déclaration de fonction normale ? Aucune. Mais ça
nous permet de passer à l'étape suivante qui générerait une erreur de syntaxe.
Bref. Avec le code actuel, exécuter cette ligne ne change pas grand chose
puisque la fonction elle-même n'est pas exécutée. Faisons donc cela:

{% highlight js %}
(function () {}())
{% endhighlight %}

Maintenant, c'est déjà plus utile ! La fonction est exécutée. Comment ? Voyons
comment exécuter une fonction en JavaScript de manière générale:

    <référence de fonction>()

Il suffit donc d'une référence à une fonction et d'utiliser les parenthèses pour
l'exécuter. Si vous avez du mal avec le concept de référence de fonction, je
vous renvoie vers un article de ce blog [expliquant les références de
fonction][0] Une référence est donc utilisable en utilisant le nom de la
fonction, ou simplement la fonction elle-même. Les deux exemples sont donc
corrects :

{% highlight js %}
function f() {}
f(); // Appel de fonction

function () {}(); // Appel de fonction anonyme
{% endhighlight %}

Par contre, le deuxième exemple donne une erreur de syntaxe. Il faut donc
encapsuler la fonction et son appel dans une expression.

Quel est l'avantage d'une telle fonction ? Elle crée un nouveau contexte de
variable. On a donc plus à s'inquiéter d'overrider `$`, ça ne le fera que dans
notre fonction ! Donc ça ne cassera pas du code externe utilisant `$` pour autre
code que `jQuery` (ce qui est le but de `noConflict`, non ?).

Nous avons donc une IIFE déjà. Une expression de fonction qui s'exécute
immédiatement. L'avantage de créer un nouveau contexte est immédiatement
visible. Ce type de fonction est très fréquemment utilisé dans le simple but de
ne pas utiliser de variable globale, parce que nous savons tous que les
variables globales sont evil ! Pour utiliser `$`, on pourrait simplement
utiliser le code suivant:

{% highlight js %}
(function () {
    var $ = jQuery;
}());
{% endhighlight %}

Oui. On pourrait. Seulement, il y a une méthode un peu plus sympa, nous
permettant d'économiser une ligne. Pour comprendre cette méthode, prenons un
appel de fonction classique:

{% highlight js %}
function f ($) {}
f(jQuery);
{% endhighlight %}

On est bien d'accord que le dollar correspondra donc à `jQuery` dans la fonction
`f`, n'est-ce pas ? De la même manière, ce code fait la même chose:

{% highlight js %}
(function ($) {
}(jQuery));
{% endhighlight %}

Puisque la fonction est immédiatement exécutée, l'argument `jQuery` est passé à
`$` dans la fonction anonyme.

Voilà ! J'espère vous avoir appris quelque chose aujourd'hui. S'il y a quoique
ce soit que vous n'avez pas compris, les commentaires sont là pour ça :-)


   [0]: http://margaine.com/2012/08/31/passage-fonction-reference-javascript.html
