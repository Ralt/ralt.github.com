Une question assez intéressante, c'est de savoir comment jQuery fait
pour récupérer le texte d'un élément de manière cross browser. Si vous
avez une idée, vous pensez peut-etre qu'il utilise soit `innerText`, ou
`textContent` s'il existe. Eh bien... comme vous, j'ai été surpris
d'apprendre que non. Pourquoi ?! C'est si simple ! Oui, mais ces deux
propriétés n'ont pas le même comportement. Même sur les mêmes
navigateurs. Par exemple, Chrome implémente les deux, mais leur
comportement est différent. Pour information, `innerText` est une
propriété non standard créée par IE tandis que `textContent` est la
propriété standard. Chrome implémente les deux pour des raisons de
compatibilité.

Les différences de comportement, c'est notamment au niveau des espaces
trimmés (ou non), et aussi parce que l'un retourne le contenu des tags
`script`, par exemple.

Bon, maintenant, quelle est la propriété la plus cross browser possible
qui agisse de la même manière partout ? `nodeValue`. La propriété standard
étant `data`. Elle récupère la valeur d'un `textNode` (et non pas d'un
élément ou autre). jQuery utilise donc cette propriété pour récupérer de
manière sûre le texte d'un élément. Attendez, j'ai dit que c'était la
valeur un `textNode`, pas d'un élément !

Heureusement, une autre propriété cross browser est `childNodes`. Elle
permet de récupérer tous les enfants directs d'un élément. Donc on peut
boucler sur les enfants d'un élément et récupérer chaque `nodeValue`.

Mais attendez ! Si un des enfants est un élément ou un tag `script`, on ne
veut pas récupérer la `nodeValue`, ça ne marchera pas ! `nodeType` à la
rescousse ! Encore une autre propriété cross browser qui permet de
connaître le type d'un node (élément, `textNode`, etc).

La fonction qu'on va écrire doit donc récupérer tous les enfants d'un
élément, boucler dessus, récupérer la `nodeValue` si c'est un `textNode`; si
c'est un élément, il faut à nouveau récupérer les enfants, revérifier le
`nodeType`... une fonction récursive semble idéale. Trêve de bavardages,
voici le code !

{% highlight js %}
function getText(elements) {
    var ret = '';

    for (var i = 0; i < elements.length; i++) {

        if (el.nodeType === 3) { // textNode is 3
            ret += el.nodeValue;
        }
        else if (el.nodeType === 1) { // element is 1
            ret += getText(el.childNodes);
        }

    }

    return ret;
}
{% endhighlight %}

Voici donc l'idée basique de comment jQuery récupère de manière
cross-browser le texte :-).

Je dis "basique" puisqu'en réalité, on ne s'occupe pas uniquement des
`textNodes` et des élements, mais tous les `nodeTypes` doivent être pris en
compte.

De plus, depuis la 1.7, le code a changé. Premièrement, ils utilisent
désormais `textContent` ou `innerText` (en fixant `innerText` avec un
`replace`). Deuxièmement, ils utilisent une technique plus rapide que de
traverser les `childNodes`. Mais l'idée générale reste la même.

Voilà ! J'espère vous avoir appris quelque chose aujourd'hui :-)
