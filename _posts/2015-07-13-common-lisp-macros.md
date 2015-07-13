---
layout: post
title: Les macros en Common Lisp
description: Un petit aperçu du pouvoir des macros en Common Lisp
---

Depuis maintenant un bout de temps, je m'intéresse beaucoup au langage
Common Lisp. C'est un langage très intéressant pour plein de raisons,
mais grosso modo : toutes les fonctionnalités que vous voyez dans les
autres langages existent déjà en Lisp ;-)

# Petite introduction<a id="sec-1" name="sec-1"></a>

Lambdas, closures, destructuring, classes, &#x2026; existent tous dans le
standard de Common Lisp, édité dans les années 80. La syntaxe est
pourtant une des plus simples. Aucun mot clé réservé, aucun ordre
d'évaluation à retenir, aucun piège où les retours à la ligne
comptent, aucune accolade.

La seule syntaxe disponible est sous forme de liste. Comme ça :

    (nom-de-fonction arg1 arg2)

La fonction `nom-de-fonction` sera appelée avec les arguments `arg1`
et `arg2`.

C'est un peu bizarre, mais cela a plein d'avantages. L'avantage
principal, c'est qu'on fonctionne directement avec un arbre. Vous
savez, la plupart des langages transforment le code source en arbre
(aussi appelé [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)), puis travaillent à partir de cet arbre. Cette
étape est ignorée, puisqu'on a déjà l'arbre.

L'avantage unique de cette syntaxe permet d'offrir ce qu'aucun autre
langage ne fournit : les macros.

Attention, je ne parle pas des macros comme celles qu'on utilise en C
ou les templates C++. Les macros de Common Lisp sont différentes.

Les macros sont des fonctions tout à fait normales. Elles peuvent
utiliser d'autres fonctions, peuvent avoir des variables, etc. La
seule différence avec les autres fonctions, c'est qu'elles sont
lancées au moment de la compilation.

C'est comme si vous aviez la main sur le compilateur de Common
Lisp. En fait, c'est exactement ça.

En soit, ça peut paraître anodin, mais ça donne **énormément** de
possibilités. Cela permet de très facilement créer une nouvelle
syntaxe adaptée au problème en cours. Cela s'appelle une [DSL](https://en.wikipedia.org/wiki/Domain-specific_language).

Que ce soit bien clair : utiliser des macros quand des fonctions font
l'affaire est généralement déconseillé.

Toute cette explictation peut paraître un peu abstrait. Pour enlever
cette abstraction et mettre les mains dans le cambouis, un petit
exemple.

# Petit exemple<a id="sec-2" name="sec-2"></a>

Pour illustrer l'utilité des macros, un petit exemple utilisé
fréquemment. Disons que je veux déclarer une liste d'actions. Je
stocke toutes ces actions dans la variable `*actions*`.

    (defvar *actions* nil)

Je vais donc maintenant ajouter une action, et une fonction anonyme
(lambda) correspondante :

    (push
      #'(lambda (x) (do-something-with x)
      *actions*))

Un peu répétitif si je veux faire ça à chaque action. Utilisons une
fonction :

    (defun add-action (fn)
      (push fn *actions*))

    (add-action
      #'(lambda (x)
          (do-something-with x)))

Déjà mieux. Et maintenant, comme dans n'importe quel autre langage, on
est limité par la syntaxe un peu laborieuse pour définir une nouvelle
fonction.

C'est là que l'on peut définir une macro. La syntaxe pour définir une
action étant laborieuse, on fait appel au pouvoir des macros ! :-)

    (defmacro define-action (vars &body body)
      `(push #'(lambda ,vars
                 ,@body)
             *actions*))

    (define-action (x)
      (do-something-with x))

Je vous passe l'explication des symboles bizarres que j'ai utilisé
dans le "defmacro". L'important est la partie "define-action".

Maintenant, la syntaxe est parfaitement adaptée ! Si on montre
l'expansion du code "define-action" (Ctrl+c Ctrl+m sur emacs), cela
nous montre que ce code est généré au moment de la compilation :

    (PUSH #'(LAMBDA (X) (DO-SOMETHING-WITH X)) *ACTIONS*)

Ce qui est exactement ce que l'on veut.

J'espère que cet exemple montre l'utilité d'avoir ce type d'outil, où
on peut définir des nouvelles fonctions exécutées lors de la
compilation.

Ce qu'il faut bien comprendre, c'est que l'on traite le code comme un
tableau classique dans du code. Par exemple, on a 2 arguments dans
notre macro : `vars` et `body`. Si vous regardez l'appel à
`define-action`, ce sont les 2 arguments que nous lui
passons. Ensuite, `define-action` va simplement renvoyer une autre
liste, qui sera le code lancé au final. Code is data.

Ce petit exemple est ce qui est utilisé dans 50% des cas. En général,
avec quelques variations, on utilise ce genre de macros pour scratcher
ce petit bout de syntaxe en trop qui ne sert à rien. Cela permet
d'avoir des APIs plus propres, de manière générale.

Un autre exemple est les macros de type `with-`. Par exemple,
`with-open-file` permet de récupérer un file descriptor, et le ferme
automatiquement quand on sort du bloc. C'est utilisé lorsque des
ressources spéciales sont utilisées, comme les fichiers, connexions à
base de données, threads, etc.

# Conclusion<a id="sec-3" name="sec-3"></a>

Après avoir écrit [lxc-wrapper](https://github.com/ralt/lxc-wrapper), [aergia](https://github.com/ralt/aergia), [restful](https://github.com/ralt/restful), ou encore [deb-packager](https://github.com/ralt/deb-packager)
en Lisp, je suis de plus en plus fan du langage. Je voulais faire
partager une des raisons pour lesquelles j'en suis fan :-)
