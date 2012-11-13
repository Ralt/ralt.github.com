---
layout: post
title: Accéder à une propriété JavaScript - les 2 manières
description: Description des deux manières disponibles pour accéder à une
propriété en JavaScript
---

J'écris cet article car j'ai remarqué que beaucoup de personnes connaissaient
peu ou mal les deux manières disponibles pour accéder à une propriété en
JavaScript.

Imaginons que vous avez l'objet suivant :

{% highlight js %}
var obj = {
    foo: 'bar',
    baz: 'bad'
};
{% endhighlight %}

Voici les deux manières pour accéder à `'bar'`:

- La notation "point" (dot notation) : `obj.foo`
- La notation "crochet" (square brackets notation) : `obj['foo']`

Alors, pourquoi existe-t-il deux manières ? Et surtout, pourquoi utiliser l'une
ou l'autre ? Voyons les avantages que nous offrent chaque notation :

<table>
    <thead>
        <tr>
            <th></th>
            <th>Avantages</th>
            <th>Inconvénients</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dot notation</td>
            <td>
                <ul>
                    <li>Lisible</li>
                    <li>Concis</li>
                    <li>Et principalement lisible</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Non programmable (essayez de générer un identifier...)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Square brackets notation</td>
            <td>
                <ul>
                    <li><strong>Programmable !</strong></li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>Moins lisible que l'identifier</li>
                    <li>Plus long à écrire (ça compte !)</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

Comme vous le voyez, le seul avantage de la square brackets notation est
le fait qu'on puisse coder le nom de la propriété. Par exemple, pour l'objet
suivant :

{% highlight js %}
var obj = {
    p1: 'foo',
    p2: 'bar',
    p3: 'baz'
};
{% endhighlight %}

On peut écrire le code suivant qui va permettre d'accéder aux propriétés :

{% highlight js %}
for (var i = 1; i <= 3; i++) {
    obj['p' + i];
}
{% endhighlight %}

Essayez de faire de même avec la dot notation; vous ne pourrez pas !

En clair : utilisez la dot notation, sauf quand vous avez des propriétés
dynamiques.
