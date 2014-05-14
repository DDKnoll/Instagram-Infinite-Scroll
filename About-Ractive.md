# Ractive - Declarative, Model-driven Documents


## The Naive Approach

Too many javascript applications contain repetitive code.  First, you select a an element using its ID, `var myNode = $('#something-to-use')` then update its content `myNode.html('<p>add this content to the node.</p>')`; and repeat this until everything is up to date.

I love jQuery, but this is bad practice. Too many lines of code and searching by css selectors will slow down your code.

## The JS MVC approach

There are plenty of shiny new javascript frameworks to help you be organized and efficient while writing code:

[ToDoMVC - JS Frameworks listing](http://todomvc.com/)

Most of these applications enforce an MVC model to seperate dependencies, updating, and flow-control. These frameworks provide methods for ajax requests, templating, code-compiling, testing, data-binding, and much more.  

## The Ractive Approach

Ractive does one thing and it does one thing wonderfully.  Binding a JSON data object to an HTML view.  Take a quick look at this sample code.

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


That was easy, right?  Alright, now you have a ractive javascript object and an html template rendered.  Try checking the data model using `ractive.get()`.

Now you can update the HTML at any time by using ractive.set().  Lets try for example, `ractive.set('x', 10);`.  As you can see, the 


### Ractive is deterministic 

Having all of your data bound into one data structure is actually pretty incredible.  You have a Single Source of Truth (SSOT) data object and your HTML template is deterministic.  By deterministic, I mean there is one state that your HTML will be in for a specific data structure (unless some other javascript messed with the template).