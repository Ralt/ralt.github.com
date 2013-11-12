---
layout: post
title: Comment faire des promesses
description: Une explication de comment les promises/deferred marchent
---

Introduction
---

Vous avez sûrement déjà entendu parler des "Promises". Elles vous permettent d'éviter de tomber dans ce qu'on appelle le "callback hell":

```javascript
function fetchData(id, cb) {
    getDataFromServer(id, function(err, result) {
        if (err) {
            cb(err, null);
        }
        else {
            transformData(result, function(err, transformedResult) {
                if (err) {
                    cb(err, null);
                }
                else {
                    saveToIndexDB(result, function(err, savedData) {
                        cb(err, savedData);
                    });
                }
            });
        }
    });
}

// Appel:

app.get('hello', function(req, res) {
    fetchData(1, function(err, data) {
        if (err) {
            // Handle error
            res.end(500, 'Error');
        }

        // Handle data
    });
});
```

A la place, les promises vous permettent d'utiliser la méthode `then()` au lieu de créer un nouveau callback à chaque fois.

Exemple d'utilisation :

```javascript
function fetchData(id) {
    getDataFromServer(id).then(function(result) {
        return transformData(result);
    }).then(function(transformedResult) {
        return saveToIndexDB(result);
    }).then(function(savedData) {
        return savedData;
    });
}

// Appel:

app.get('hello', function(req, res) {
    fetchData(1).then(function(data) {
        // Handle data
    }).error(function(err) {
        // Handle error
        res.end(500, 'Error');
    });
});
```

Ce qui est beaucoup plus sympa en terme d'indentation !

Bref, je ne suis pas là pour expliquer comment se servir des promises. Tout ce que je peux vous dire, c'est que je connais une excellente librairie pour ça : [bluebird][0].

Par ce ticket, je compte expliquer *comment* ça marche. C'est-à-dire, comment créer un objet `Promise` qui va faire ce qu'une librairie fait.

Je fais ce ticket parce que je trouvais les promises "mystifiantes", cela avait un peu l'air de la magie. Apres avoir regardé un petit peu, c'est en fait tout simple !

Création d'une promise
---

On va créer un objet tout simple : il va nous permettre d'utiliser `then()`, et c'est tout.

Pour simplifier la vie, on va utiliser `setTimeout` dès qu'on veut faire quelque chose de manière asynchrone.

On va essayer de faire fonctionner le code suivant :

```javascript
function fetchData(id) {
    var deferred = new Promise();

    setTimeout(function() {
        deferred.resolve({ name: 'toto' });
    }, 1);

    return deferred.promise();
}

fetchData(3).then(function(data) {
    console.log(data.name); // toto
});
```

Vous allez voir très rapidement le principe des promises :

```javascript
function Promise() {}

Promise.prototype = {
    constructor: Promise,

    promise: function() {
        var that = this;

        return {
            then: function(callback) {
                that.callback = callback;
            }
        };
    },

    resolve: function(data) {
        this.callback(data);
    }
};
```

Testez, ça marche !

Voilà donc le principe des promises : on stocke le callback ajouté via `then` dans l'objet, et lorsque la méthode `resolve` est appelée, on n'a plus qu'à appeler ce callback !

En réalité, les librairies vont beaucoup plus loin, puisqu'elles permettent de lancer ce type de code :

```javascript
var promise = new Deferred();

function fetchData(id) {
    var deferred = promise.defer();

    setTimeout(function() {
        deferred.resolve({ name: 'toto' });
    }, 1);

    return deferred.promise();
}

function transformData(data) {
    var deferred = promise.defer();

    setTimeout(function() {
        deferred.resolve({ name: 'tata' });
    }, 1);

    return deferred.promise();
}

fetchData(3).then(function(data) {
    console.log(data.name); // toto

    return transformData(data);;
}).then(function(data) {
    console.log(data.name); // tata
});
```

Je n'irai pas dans l'exercice de l'implementer : faites-le, ou utilisez une librairie existante :-). Globalement, il faut maintenir une synchronisation entre les callbacks ajoutes et les resolve.

Une autre chose que les librairies permettent de gérer : les erreurs.

En clair, n'essayez pas de réinventer la roue, utilisez une librairie de Promises comme bluebird.

Voila, j'espère simplement avoir démystifié les promises !


  [0]: https://github.com/petkaantonov/bluebird
