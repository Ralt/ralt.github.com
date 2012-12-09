---
layout: post
title: La magie des closures
description: Explication sur les nébuleuses closures.
---

Si vous avez fait du javascript pendant assez longtemps, vous avez sûrement entendu parler des closures à un moment donné. Par exemple, sur stackoverflow, quelqu'un vous a dit que c'était la solution à votre problème, ou vous avez lu quelque part que ça permettait de garder un état, etc etc. Ou vous n'en avez jamais entendu parler. Dans tous les cas, si vous ne comprenez pas ou ne savez pas ce que ça signifie, je vais tenter d'expliquer ce concept. Personnellement, je sais que c'est un concept que j'ai eu du mal à intégrer. Après de multiples tentatives à essayer de comprendre, j'ai eu le moment "Aha! C'est tellement simple en fait...". Je vais essayer de vous faire avoir ce moment :-).

Le lexical scope
---

Avant de comprendre ce qu'est une closure, il faut d'abord expliquer ce qu'est le **contexte lexical**, que je vais appeler *lexical scope* par la suite. Juste pour la petite info, le lexical scope est un concept récupéré de Scheme, et c'est en partie la raison pour laquelle on dit que Javascript est basé sur Scheme.

Il faut d'abord savoir que les scopes de javascript sont déterminés par les fonctions. Si vous déclarez une variables dans une fonction, elle est disponible dans toute cette fonction, et uniquement dans la fonction. Petit exemple :

{% highlight js %}
function f() {
    var s = 0;
}

console.log(s); // ReferenceError: s is undefined
{% endhighlight %}

Le lexical scope, ça veut dire qu'une variable déclarée à un moment donné est disponible dans toute la fonction. Y compris dans les sous-scopes de cette fonction. C'est-à-dire que si vous déclarez une fonction dans une fonction, les variables déclarées dans la top fonction sont disponibles dans la sous fonction. Exemple :

{% highlight js %}
function f() {
    var s = 0;

    function g() {
        return s;
    }

    g();
}

console.log(f()); // 0

// Another example
(function () {
    var s = 0;

    function f() {
        return s;
    }

    console.log(f()); // 0
}());
{% endhighlight %}

Notez que la fonction `g` n'est disponible que dans `f` puisqu'elle est déclarée dedans.

Si vous n'avez pas tout compris dans le deuxième exemple, je vous renvoie à cet article [expliquant les IIFE][0].

Un cas particulier : le scope global. Lorsque vous n'êtes dans aucune fonction, vous êtes dans le contexte global. Ce qui veut dire :

{% highlight js %}
var s = 0;

function f() {
    return s;
}

console.log(f()); // 0
{% endhighlight %}

Par contre, étant donné qu'on est dans le contexte global, cela signifie que **toutes les fonctions** auront cette variable disponible. Ce qui est une mauvaise chose, car deux fonctions pourraient travailler en même temps avec la même variable et faire des modifications ensemble.

Bref ! Je pense que le concept de lexical scope est compris maintenant. Pour résumer, je dirais simplement que le lexical scope, c'est le fait que les variables soient disponibles dans tous les sous-niveaux de là où elle a été déclarée.

Les closures
---

Ce qui nous amène au sujet de départ : les closures. Une closure, c'est une fonction qui récupère les variables du scope où elle était (close over). Et oui, toutes les fonctions sont des closures ! Avec le lexical scope de javascript, toutes les fonctions ont ce principe là :-).

Mais alors, pourquoi on en parle comme quelque chose de très particulier et difficile à comprendre ? Parce qu'en général, quand on parle de closure, on parle d'une utilisation particulière du lexical scope. Voici un exemple de closure que je vais expliquer juste après :

{% highlight js %}
function f() {
    var i = 0;
    return function() {
        return i++;
    }
}
var g = f();

console.log(g()); // 0
console.log(g()); // 1
console.log(g()); // 2
{% endhighlight %}

N'ayez pas peur ! J'explique tout de suite ce que je fais :-).

Un autre concept que j'aurais dû expliquer, c'est le concept de fonctions de première classe (autre concept piqué de Scheme). Cela signifie simplement qu'on peut passer une fonction en argument, ou qu'on peut simplement retourner une nouvelle fonction qu'il faudra exécuter. Exactement ce que je viens de faire. La fonction `f` retourne une nouvelle fonction, que je stocke dans la variable `g`. Je peux donc exécuter `g`, et c'est la fonction retournée par `f` qui est exécutée.

Dans mon exemple, la fonction `g` est typiquement ce qu'on appelle une closure. Pourquoi ? Parce qu'elle renferme des informations de la fonction `f` (la variable `i`). Je pense que le meilleur moyen d'expliquer ceci est de voir pas à pas comment javascript exécute la chose :

    Appel de f()
    Je rentre dans f(), je déclare i = 0
    Je retourne une nouvelle fonction anonyme à g
    Dans cette fonction anonyme, grâce au lexical scope, la variable i est disponible, et elle vaut 0
    Représentation de g :

    g :
       variables disponibles : i = 0
       fonction : function() {
            return i++;
       }

    Si j'appelle g, voici ce qu'elle devient :

    g :
        variables disponibles : i = 0
        fonction : function() {
            return 0++; // Je retourne 0 et j'incrémente i
        }

    Si je rappelle g :

    g :
        variables disponibles : i = 1
        fonction : function() {
            return 1++; // Je retourne 1 et j'incrémente i
        }

Etc etc. La variable `i` est donc renfermée avec `g`, qui peut l'utiliser à souhait. Le gros avantage de ceci, c'est que si vous rappelez `f`, une **nouvelle instance** est créée. C'est-à-dire qu'en mémoire, tout ce qui est dans `g` sera complètement différent de ce qui est retourné par un nouvel appel à `f`. Exemple :

{% highlight js %}
function f() {
    var i = 0;

    return function() {
        return i++;
    }
}

var g = f();
console.log(g()); // 0
console.log(g()); // 1

var h = f();
console.log(h()); // 0, not 2
{% endhighlight %}

En d'autres termes, `f` renvoie à chaque fois une nouvelle référence de fonction. Et cette nouvelle référence de fonction contient une nouvelle référence de variable `i` qui lui est propre. Si vous avez du mal avec le concept de référence de fonction, je vous renvoie [à cet article expliquant tout][1].

Voilà ! La magie des closures, c'est pas si magique que ça au final :-). Si vous n'avez pas tout compris, je vous invite à relire. Si vous n'avez toujours pas compris certains détails, les commentaires sont là pour ça ;).


   [0]: http://margaine.com/2012/11/23/jquery-noconflict-dollar-and-iife.html
   [1]: http://margaine.com/2012/08/31/passage-fonction-reference-javascript.html
