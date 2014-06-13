---
layout: post
title: IE8 et les boutons radio
description: Comment faire en sorte qu'IE8 comprenne les boutons radio correctement
---

Ayant juste passé quelques jours sur des bugs liés sur IE8, je fais ce petit article pour ne plus jamais retomber sur ce problème. Et j'imagine que passer la connaissance ne ferait pas de mal.

Si vous essayez de travailler sur IE8 avec les boutons radio et les labels, et l'évènement `change`, et rien ne marche, vous etes bien tombés.

Voici les problèmes avec IE8 :

- IE8 ne supporte pas l'évènement `change` sur les boutons radio.
- Cliquer sur un label ne check pas le bouton radio correspondant (via l'attribut `for`).

Heureusement, il existe des solutions :

- IE8 supporte l'évènement `propertychange`.
- On peut ajouter un handler `click` sur tous les labels.

En code, ça donne ça (avec jQuery, parce que si vous faites du IE8 sans jQuery, je n'aide pas) :

```
$('input:radio').on('change propertychange', function() {
    // Handle event
});
```

Mais si vous cliquez sur le label, lié à l'input par un `for`, ça ne marchera pas :-)

```
$('label').on('click', function() {
    var forId = $(this).attr('for');
    if (forId !== '') {
        $('#' + forId).click();
    }
});
```

Et voilà ! Tout marche beaucoup mieux après ça.
