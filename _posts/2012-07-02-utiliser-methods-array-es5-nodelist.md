---
layout: post
title: Utiliser les méthodes des Array d'ES5 sur des NodeList
description: Comment utiliser les nouvelles méthodes d'EcmaScript 5 sur les NodeList ou objets classiques
---

Petites méthodes sympathiques
---

Depuis EcmaScript 5, quelques méthodes bien sympathiques sur les tableaux sont arrivées. Je parle
bien entendu de :

- [forEach][1]
- [map][2]
- [filter][3]
- [every][4]
- [some][5]

Ces méthodes sont franchement géniales. Un petit exemple d'une fonction `diff` permettant de comparer
deux tableaux utilisant ces nouvelles méthodes:

{% highlight js %}
Array.prototype.diff = function( arr ) {
    return arr.map( function( v ) {
        if ( !~this.indexOf( v ) ) return v;
    }, this ).filter( Boolean );
};
{% endhighlight %}

Le `filter( Boolean )` permet simplement d'enlever les valeurs falsy (`undefined`, `false`, etc).

Bref, tout ça pour dire que ces nouvelles méthodes permettent d'écrire du code beaucoup plus joli.

Or, ces méthodes sont sur le prototype des tableaux (`Array.prototype`). C'est bien cool, mais du coup,
ça ne marche pas sur les `NodeList` ou `HTMLCollection`. Par exemple, ça ne marche pas:

{% highlight js %}
var a = document.links;
a.forEach( function( l ) {
    console.log( l ); // Ne marche pas :(
} );
{% endhighlight %}

Bien que les `NodeList` soient similaires à des tableaux, elles n'en sont pas.

L'astuce
---

Mais il existe une astuce : [`call`][6] !

En effet, le code suivant marche:

{% highlight js %}
var a = document.links;
[].forEach.call( a, function( l ) {
    console.log( l ); // Yay !
} );
{% endhighlight %}

Trop cool ! Un exemple pratique : comment vérifier que tous les champs d'un formulaire soient bien remplis ?

{% highlight js %}
var els = document.forms.formName.elements,
    allCheck = [].every.call( els, function( el ) {
        return el.checked;
    } );

// allCheck is true if all the elements are checked,
// otherwise, it's false.
{% endhighlight %}

L'exemple est simplifié, mais vous voyez l'idée :-)

Array.prototype vs []
---

Il est également possible d'utiliser `Array.prototype.forEach.call` au lieu de `[].forEach.call`, mais c'est
bien plus long à écrire ! Par contre, c'est plus performant, d'environ 10% (je ne retrouve plus le jsperf...).

Mais les deux s'exécutent tout de même plusieurs millions de fois par seconde. Donc à part si vous faites une librairie,
ça n'impacte pas vraiment.

Réutilisabilité
---

Le `[].forEach.call`, c'est quand même beaucoup de texte ! Donc voici une méthode qui va simplifier les choses:

{% highlight js %}
var forEach = Array.prototype.forEach.call.bind( Array.prototype.forEach );

// Utilisation:
forEach( els, function( el ) {
    // :-)
} );
{% endhighlight %}

Mot de la fin
---

Pour finir : je sais, jQuery fournit `map`, `each` et `filter` qu'on peut utiliser directement sur les élements.
Pensez à les utiliser si vous pouvez, c'est bien pratique !

Par contre, il m'est arrivé de manquer `every` et `some`.

Bref, tout ça pour dire que les méthodes d'itérations sont vraiment géniales ! :-)


   [1]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
   [2]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
   [3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
   [4]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
   [5]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
   [6]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/Call

