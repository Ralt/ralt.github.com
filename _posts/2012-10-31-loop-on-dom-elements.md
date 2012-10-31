---
layout: post
title: How to loop on DOM elements
description: One of jQuery big advantages is looping over elements. How to do the same?
---

*Note: This post is a translation of [this one][0]. It deserved it.*

A tip if you want to set yourself free from jQuery. I showed earlier [this tip][1]
to loop over DOM elements, but it's kind of ugly:

{% highlight js %}
Array.prototype.forEach.call( document.querySelectorAll( selector ),
    function( el ) {
    el.textContent = Math.random();
});
{% endhighlight %}

That's a lot of text. Using a plain `for` might even be better. I just thought 
about a solution that a lot of people should like! It probably exists somewhere
else, but I haven't seen it :-)

{% highlight js %}
// Magic line!
NodeList.prototype.forEach = Array.prototype.forEach;

document.querySelectorAll( selector ).forEach( function( el ) {
    el.textContent = Math.random();
});
{% endhighlight %}

This works on Firefox, Chrome and IE9. I didn't try other browsers, but if it
works on IE...

Online demo [on jsfiddle][2].

   [0]: http://margaine.com/2012/10/31/boucler-sur-elements-dom.html
   [1]: http://margaine.com/2012/07/02/utiliser-methods-array-es5-nodelist.html
   [2]: http://jsfiddle.net/Ralt/ZfSnq/
