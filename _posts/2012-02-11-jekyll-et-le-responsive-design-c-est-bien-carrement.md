---
layout: post
title: Jekyll et le responsive design, c'est bien ? Carrément !
---

Petite introduction
---

Il y a quelques jours de cela, j'ai migré mon site web vers Jekyll. Pourquoi ?

Mon ancien site sur Drupal était assez lent quand il n'y avait pas de cache. Or, vu le nombre de visiteurs assez limité sur mon site, il était lent tout le temps.

Ça, c'est la première raison. La deuxième raison, c'est que je suis tombé amoureux de [Vim][1] et [Markdown][2] ces derniers temps, et écrire mes articles dessus me tentait bien. Pourquoi je suis tombé amoureux ? Parce que ces deux outils me permettent d'écrire sans être dérangé par des barres d'outils, des broutilles ou autre, et de me concentrer uniquement sur le contenu que j'écris. Pour exemple, voici une capture d'écran de ce que j'écris (la barre du bas correspond à [tmux][3]) :

![Image de mon écran][4]

J'ai donc migré vers [Jekyll][5], générateur de sites statiques. Par chance, lors de mes recherches sur les templates, je suis tombé sur [ce dépôt][6] qui inclut du responsive design. Allez ! Je teste un peu tout ça :-)

Définitions
---

Avant de continuer, quelques définitions :

1. Jekyll : Générateur de sites statiques écrit en [Ruby][7]. Il prend un répertoire avec des templates, des articles, des fichiers HTML/CSS/JS/JPG/PNG/WHATEVER, et génère une foule de fichiers HTML. Voilà, votre site statique est généré à partir de templates imbriqués, de posts écrits en markdown, etc.
2. Responsive design : Selon la résolution du navigateur, le CSS va s'adapter. Par exemple, en-dessous de 500px de largeur, le site fait 90% de largeur. Au-dessus, il va faire 60% pour améliorer le confort de lecture. C'est du responsive design, les fichiers CSS s'adaptent à la largeur de votre écran.
3. Vim : Editeur de texte vieux de 15 ans, basé sur Vi (Vim signifie Vi iMproved), vieux de 30 ans. Pourquoi est-ce le préféré de beaucoup de développeurs ? Parce qu'il permet d'être extrêmement productif dans la manipulation de texte.
4. Markdown : Format de texte qui permet de se concentrer sur le contenu uniquement, et ce contenu est ensuite transformé en HTML (verbeux).

Jekyll
---

Jekyll est donc un générateur de site statique créé par le fondateur de [Github][8], Tom Preston-Werner. Il permet, à l'aide d'un fichier de configuration en YAML, quelques en-têtes YAML sur chaque page, et des extensions de fichiers, de générer un site statique à la perfection.

Est-ce que je regrette d'être passé de Drupal à Jekyll pour un site comme le mien ? Pas le moins du monde. Bien au contraire. Pourquoi ? Parce qu'il m'a fallu 5h pour tout finaliser. En comptant le templating. De A à Z. La simplicité est tout simplement déconcertante. Pour écrire un nouvel article ? Je crée un fichier dans le dossier \_posts en .md, j'écris, j'enregistre, et je push vers mon dépôt git de Github. Oh, oui, avoir son blog sur un serveur Git, ça veut dire la pérennité des données. Et tout ça... simplement.

Sincèrement, est-ce que je recommanderais Jekyll à des clients ? Ça dépend. S'ils sont assez technophiles, voire presque développeur, oui. Cela dit, ce genre de cas arrive très peu souvent. Donc la plupart du temps, ça sera du Wordpress ou du Drupal avec un filtre Markdown pour les écrivains. Les écrivains aiment bien écrire du contenu sans avoir de babiole (genre barre d'outils) qui les dérange. Markdown dans un éditeur de texte en plein écran est très bien pour ça.

Responsive design
---

Le boilerplate sur lequel j'ai basé mon blog implémentait du responsive design à l'aide de [320 and up][9]. Cela fait quelques mois que le buzz autour du responsive design existe, mais je n'avais pas encore eu l'occasion de tester réellement. Enfin l'occasion se présente !

Testez : si vous êtes sur un écran assez large (1024x768 de résolution minimum), réduisez la taille de la fenêtre du navigateur. Remarquez la bordure qui disparait ? La taille du site qui change ? C'est ça, le responsive design.

Comment ça marche ? 320 and up charge des fichiers CSS selon la taille de l'écran. Avec une petite résolution, seuls les fichiers correspondant sont chargés. Au fur et à mesure que la taille augmente, les fichiers CSS correspondant sont également chargés. Tout ça, à l'aide des [@media queries][10].

Prenons un exemple, mon site :

Dans le fichier CSS général (style.css), la taille du body correspond à 90%. Pour les petits écrans, c'est l'idéal. La plupart du contenu est affichée sans gâcher d'espace.

Toutefois, au-dessus de 1000px de large, le texte devient surtout éparpillée avec une largeur de 90%. Dans le fichier CSS 992.css (qui va donc agir au-delà de 992px de large), j'ai ajouté :

{% highlight css %}
body {
  width: 60%;
}
{% endhighlight %}

La taille du body passe donc à 60% au-delà de 1000px de large ! On gagne donc l'avantage d'être bien lisible sur les petits écrans (lisez : smartphones), et autant visible sur les grands écrans.

Mais bon, quand on a un grand écran, ça fait un peu vide du texte au milieu de nulle part... Allez, réglons ça !

{% highlight css %}
body {
  width: 60%;
  border: 1px solid #CCC;
  border-radius: 15px;
  margin: 1em auto;
  padding: 2em;
  box-shadow: 1px 5px 30px 5px #CCC;
}
{% endhighlight %}

Et voilà ! Pour information, le fichier 1382.css a simplement un "width: 50%;" pour réduire encore la taille, mais la bordure y est toujours.

Conclusion
---

Pour conclure tout ça, j'ai envie de dire :

> Du Jekyll, bouffez-en !
> Du responsive design, bouffez-en !
> Les deux ensemble, c'est que du bon !

Voilà :-) J'espère que cet article vous aura au moins convaincu de l'utilité de l'un ou l'autre.



[1](www.vim.org)
[2](http://daringfireball.net/projects/markdown/)
[3](http://tmux.sourceforge.net/)
[4](/img/blog/screenshot-vim-markdown.png)
[5](http://jekyllrb.com/)
[6](https://github.com/bobschi/HTML5-Boilerplate-Jekyll-Template)
[7](http://www.ruby-lang.org/fr/)
[8](https://github.com)
[9](http://stuffandnonsense.co.uk/projects/320andup/)
[10](http://www.alsacreations.com/article/lire/930-css3-media-queries.html)
