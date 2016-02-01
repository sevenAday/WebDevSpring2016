(function() {
    sayHello();
    function sayHello() {
        alert("Hello!");
    }
    var sm = function sayMessage(mesg) {
        alert(mesg);
    }
    function sayInput(inputId) {
        alert(document.getElementById(inputId).value);
    }
})();
