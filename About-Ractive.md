# Ractive - Declarative, Model-driven Documents


## The Naive Approach

Too many javascript applications contain repetitive code.  First, you select a an element using its ID, `var myNode = $('#something-to-use')` then update its content `myNode.html('<p>add this content to the node.</p>')`; and repeat this until everything is up to date.

I love jQuery, but this is bad practice. Too many lines of code and searching by css selectors will slow down your code.

## The JS Framework approach

There are plenty of shiny new javascript frameworks to help you be organized and efficient while writing code:

[ToDoMVC - JS Frameworks listing](http://todomvc.com/)

These frameworks provide methods for ajax requests, templating, code-compiling, testing, data-binding, and much more.  

## The Ractive Approach

Ractive does one thing and it does one thing wonderfully.  Binding a JSON data object to an HTML model.  Take a quick look at this sample code.

#### HTML

    <script src='http://cdn.ractivejs.org/latest/ractive.min.js'></script>

    <script id='template' type='text/ractive'>
        <h1>{{title}}</h1>
        <p>{{x}} * {{y}} == {{ x * y }}!</p>
    </script>

    <div id='container'>Attempting to load template...</div>


#### Javascript

    ractive = new Ractive({
      el: 'container',
      template: '<p>{{greeting}}, {{recipient}}!</p>',
      data: { x: 5, y:6 , title: 'Multiplying Numbers'}
    });
