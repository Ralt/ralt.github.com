---
layout: post
title: Utiliser des mots réservés dans les objets JavaScript
description: Comment utiliser des mots réservés comme propriétés des objets JavaScript ?
---

Une petite astuce qu'il peut être utile de savoir.

Des fois, il est utile d'avoir un [mot réservé][1] comme propriété d'un objet en JS.

Par exemple, un mot qu'on a souvent envie d'utiliser dès qu'on travaille avec des groupes de données, c'est le mot clé `delete`. Or, c'est un mot réservé (il permet de supprimer une propriété d'un objet), donc si on fait ça :

{% highlight js %}
var obj = {
    delete: function() {}
};
{% endhighlight %}

JavaScript va nous sortir une erreur de syntaxe.

Oh chance ! Il existe une astuce :

{% highlight js %}
var obj = {
    'delete': function() {}
};
{% endhighlight %}

Et oui :-) Le simple fait de le mettre entre apostrophes, ou entre guillemets, ça marche !

Vous pouvez ensuite utiliser la propriété d'une manière tout à fait classique :

{% highlight js %}
obj.delete();
{% endhighlight %}

Voilà ! C'était la petite astuce du jour :-)

   [1]: http://es5.github.com/#x7.6.1

