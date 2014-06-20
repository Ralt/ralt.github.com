---
title: Return ASAP, ou comment éviter les if imbriqués
layout: post
description: Astuce de programmation pour éviter les if imbriqués
---

Une façon de programmer que je vois assez souvent, c'est de récupérer une valeur, et si cette valeur existe, alors on travaille avec. Si elle n'existe pas, une erreur est lancée.

Pour donner un exemple de code :

```javascript
var user = getUser();
if (user) {
    var group = getGroup(user);
    if (group) {
        var admin = getAdmin(group);
        if (admin) {
            // do something
        }
        else {
            throw new Error('No admin found');
        }
    }
    else {
        throw new Error('No group found');
    }
}
else {
    throw new Error('No user found');
}
```

Cette manière de faire les choses est bonne : il faut vérifier afin de ne pas avoir d'erreur.

Le problème, c'est qu'on se retrouve très rapidement avec des indentations trop élevées, et le code n'est plus très lisible à cause de cela.

Pour remédier à ceci, il existe un moyen très simple que j'appelle la technique "return ASAP" (s'il existe un nom plus officiel, je suis pret à le prendre).

Quoi de mieux que du code pour montrer l'exemple ? :-)

```javascript
var user = getUser();
if (!user) {
    throw new Error('No user found');
}

var group = getGroup(user);
if (!group) {
   throw new Error('No group found');
}

var admin = getAdmin(group);
if (!admin) {
   throw new Error('No admin found');
}

// do something
```

Le code devient tout de suite beaucoup plus clair.

De plus, on gère dès que possible les cas d'erreurs, et on n'a plus à s'en soucier, ce qui fait de la cognitivité (c'est un mot ?) en moins à prendre en compte.

Voilà ! C'était la petite astuce du jour :-)