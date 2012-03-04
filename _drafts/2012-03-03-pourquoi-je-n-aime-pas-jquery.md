---
layout: post
title: Pourquoi je n'aime pas jQuery
description: Article montrant rapidement pourquoi jQuery n'est pas toujours le meilleur choix
---

jQuery est lent
---

Sérieusement. [jQuery][4] est lent. Voici un exemple : [jQuery dumb hide][1]. Ok, c'est quelque chose d'assez complexe à réaliser, et le fait qu'il doive supporter l'enchainement des animations fait que ce n'est pas un bon exemple. Voici un exemple plus parlant : [gEBI vs Sizzle][2]. Quelque chose que vous avez tous fait. Vous voyez la différence ? `document.getElementById('test')` est **10 fois plus rapide** que `$('#test')`. **10 fois plus rapide**. Pour la chose la plus basique que tout le monde fait.

Et pourtant, `.getElementById` est supporté par *tous* les navigateurs. Vous pouvez [vérifier ici][3].

Une autre raison pour laquelle jQuery est lent est qu'il utilise ses propres fonctions à l'intérieur de sa librairie. Par exemple, dans sa fonction `.hide()` (voir jsPerf ci-haut), il utilise `display = jQuery.css(elem, "display")` au lieu de `display = elem.style.display`. Voici un [jsPerf][6] montrant la différence entre l'un et l'autre. La version en javascript pur est **au moins 10 fois plus rapide**.

Certains diront que cette méthode de développement est utilisée afin de respecter le principe [DRY][7]. Le principe DRY (Don't Repeat Yourself) amène à ne pas répéter de code. Soit. Mais au détriment d'une telle perte de performance ? Je ne suis pas d'accord. jQuery est la librairie javascript [la plus utilisée au monde][8], ils doivent contribuer à une performance optimale sur le web. Ce qu'ils ne font clairement pas.

jQuery crée du mauvais code
---




[1]: http://jsperf.com/jquery-dumb-hide/2
[2]: http://jsperf.com/gebi-vs-sizzle
[3]: http://www.quirksmode.org/dom/w3c_core.html#gettingelements
[4]: http://jquery.com
[6]: 
[7]: 
[8]: http://codeclimber.net.nz/archive/2008/05/12/The-most-used-Javascript-Library-is.-jQuery.aspx 
