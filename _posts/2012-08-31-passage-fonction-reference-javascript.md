---
layout: post
title: Passage d'une fonction par référence en JavaScript
description: Explication du passage par référence d'unune fonction en JavaScript
---

En javascript, il est possible de passer une fonction en argument d'une autre fonction. Et
ce passage se fait *par référence*.

Lorsque j'ai expliqué à plusieurs personnes débutantes ce concept, elles avaient du mal
à comprendre le truc tout de suite. Me voilà donc avec un article expliquant en détail
ce que tout cela veut dire.

Pour commencer, voici un petit exemple d'appel à une fonction `f` :

{% highlight js %}
1. f( function( data ) {
2.     console.log( data );
3. });
{% endhighlight %}

Le but de cet article est de faire comprendre comment implémenter cette fonction.

Pour les curieux, voici la solution :

{% highlight js %}
4. function f( callback ) {
5.     callback( true );
6. }
{% endhighlight %}

Si vous ne comprenez pas comment ça marche, lisez la suite :-).

En javascript, les fonctions sont des objets comme les autres. Et tous les objets en
javascript sont passés par référence. Qu'est-ce que cela veut dire ? Si vous connaissez
le princpe des pointeurs en C/C++, c'est exactement ça. En réalité, quand on *passe par
référence*, on ne copie pas la valeur de la fonction, mais on copie la *fonction elle-même*.

Quelle est la différence ? Explication en tableau, avec l'exemple de la fonction `f` donné
ci-dessus.

Lorsque l'on définit la fonction anonyme, voici ce qui se passe en mémoire :

<table>
    <thead>
        <tr>
            <th>Référence</th>
            <th>Valeur</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>fonction anonyme #1</td>
            <td>`function( data ) { console.log( data ); }`</td>
        </tr>
    </tbody>
</table>

Puis, lorsque nous atteignons l'intérieur de la fonction `f`, où la fonction est passée en argument
*par référence*, voici ce que nous avons en mémoire :

<table>
    <thead>
        <tr>
            <th>Référence</th>
            <th>Valeur</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.1. fonction anonyme #1</td>
            <td>1.2. `function( data ) { console.log( data ); }`</td>
        </tr>
        <tr>
            <td>2.1. callback</td>
            <td>2.2. Lien vers la cellule 1.2.</td>
        </tr>
    </tbody>
</table>

Comme vous pouvez le voir, *il n'y a qu'une seule fonction* en mémoire, il y a simplement
plusieurs variables qui pointent dessus. Il n'y a pas eu de copie, mais *un passage par référence*.

Ce qui veut dire qu'on peut appeler `callback()` dans la fonction `f`, et ça va appeler la fonction
anonyme que nous avons passée en argument.

Voilà ! La dernière chose à savoir, c'est que tous les objets en javascript sont passés de cette
manière, donc le code suivant marchera également :

{% highlight js %}
var o = {};
f( o );
o.length; // 0 // ça marche! l'objet lui-même est modifié

function f( obj ) {
    obj.length = 0;
}
{% endhighlight %}

