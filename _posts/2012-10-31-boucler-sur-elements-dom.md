---
layout: post
title: Comment boucler sur des éléments du DOM
description: Un des gros avantages de jQuery, c'est de boucler sur les éléments. Comment faire la même?
---

Une astuce si vous souhaitez vous affranchir de jQuery. Je vous ai montré [cette
astuce](http://margaine.com/2012/07/02/utiliser-methods-array-es5-nodelist.html)
pour boucler sur les éléments d'un sélecteur. Mais c'est quand même assez moche :

{% highlight js %}
Array.prototype.forEach.call( document.querySelectorAll( selector ),
    function( el ) {
    el.textContent = Math.random();
});
{% endhighlight %}

Ça en fait du texte. Utiliser un simple `for` pourrait même être mieux. Je viens
de penser à une solution qui devrait ravir du monde ! Elle existe sûrement
ailleurs, mais je ne l'ai jamais vue :-)

{% highlight js %}
// Magic line!
NodeList.prototype.forEach = Array.prototype.forEach;

document.querySelectorAll( selector ).forEach( function( el ) {
    el.textContent = Math.random();
});
{% endhighlight %}

Ça marche sur Firefox, Chrome et IE9. Je n'ai pas testé sur d'autres navigateurs,
mais si ça marche sur IE9...

Démo en ligne [sur jsfiddle](http://jsfiddle.net/Ralt/ZfSnq/).

Cette méthode ouvre plein de possibilités. Par exemple, le code suivant marche
pour valider que tous les `input` sont bien remplis:

{% highlight html %}
<input type="text">
<input type="text">
<input type="text">
<input type="submit" id="submit" value="Check!">
{% endhiglight %}

{% highlight js %}
NodeList.prototype.every = Array.prototype.every;

document.getElementById('submit').addEventListener('click', function() {
    // Check whether all the input are selected
    var all = document.querySelectorAll('input').every(function(el) {
        return el.value !== '';
    });

    if (all) {
        console.log('All checked!');
    }
    else {
        console.log('Some are not checked.');
    }
}, false);
{% endhighlight %}

[Démo en ligne](http://jsfiddle.net/Ralt/TX2G9/).

Imaginez ! Quelle nouvelle manière pouvez-vous trouver ?
