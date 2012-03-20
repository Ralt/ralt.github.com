---
layout: post
title: XPM.js, la librairie javsScript pour supporter le X PixMap en javascript :-)
description: Annonce de la création de la librairie XPM.JS supportant du pseudo-XPM en javascript.
---

Il y a 3 jours, je suis tombé sur la page [wikipedia][1] concernant le format XPM (utilisé pour les icônes de Gnome, par exemple).

Le principe étant assez plaisant, j'ai donc eu l'idée de créer une version en javascript d'un parser de format pseudo-XPM.

Tadaaa ! [XPM.js][2] est né !

Pour l'utiliser, voici un exemple d'utilisation :

{% highlight js %}
    <div id="cvs"></div>

    var xpmImage = XPM.create(
        '24 24 2 1',
        '  c #AAA',
        'x c #000',
        '      xxxxxxxxxxxx      ',
        '     xxxxxxxxxxxxxx     ',
        '    xxxxxxxxxxxxxxxx    ',
        '   xxxxxxxxxxxxxxxxxx   ',
        '  xxxxxxxxxxxxxxxxxxxx  ',
        ' xxxxxxxxxxxxxxxxxxxxxx ',
        '  xxxxxxxxxxxxxxxxxxxx  ',
        '   xxxxxxxxxxxxxxxxxx   ',
        '    xxxxxxxxxxxxxxxx    ',
        '     xxxxxxxxxxxxxx     ',
        '      xxxxxxxxxxxx      ',
        '       xxxxxxxxxx       ',
        '        xxxxxxxx        ',
        '         xxxxxx         ',
        '          xxxx          ',
        '           xx           ',
        '          xxxx          ',
        '         xxxxxx         ',
        '        xxxxxxxx        ',
        '       xxxxxxxxxx       ',
        '      xxxxxxxxxxxx      ',
        '     xxxxxxxxxxxxxx     ',
        '    xxxxxxxxxxxxxxxx    ',
        '   xxxxxxxxxxxxxxxxxx'
    )
    document.getElementById('cvs').appendChild(xpmImage)
{% endhighlight %}

Et ça affiche le canvas suivant : ![canvas](/img/blog/xpmjs.png)

Vous pouvez revoir ou forker mon code, c'est pour ça qu'il est sur [GitHub][3] !

[1]: http://fr.wikipedia.org/wiki/X_PixMap
[2]: https://github.com/Ralt/xpmjs
[3]: https://github.com
