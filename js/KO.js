

<script type="text/html" id="person-template">
   <h3 data-bind="text: name"></h3>
   <p>Credits: <span data-bind="text: credits"></span></p>
   
</script>

    function MyViewModel() {
    this.people = [
        { name: 'Franklin', credits: 250 },
        { name: 'Mario', credits: 5800 }
    ]
}
ko.applyBindings(new MyViewModel());
