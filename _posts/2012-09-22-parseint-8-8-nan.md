---
layout: post
title: parseInt( '8', 8 ) === NaN; // true
description: Pourquoi le 2ème argument de parseInt est important
---

Juste un petit article expliquant pourquoi le 2ème argument de `parseInt` est
important. Quelques petits exemples parlent mieux que mille mots :

    parseInt( '8', 8 ) === NaN;
    parseInt( '08' ) === 0; // WTF?!
    parseInt( '08', 10 ) === 8; // ouf...

JavaScript essaye de deviner dans quelle base vous voulez convertir votre
string, et il fait de son mieux. Mais pour `08`, il croit que vous êtes en base
8, où le chiffre 8 n'existe pas (en base 10, ça s'arrête au 9). Donc il
s'arrête directement après le 0.

**Toujours** préciser le 2ème paramètre !

Un autre petit résultat marrant pour la route :

    parseInt( 'o', 34 ) === 24; // huhu...

