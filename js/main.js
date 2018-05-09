// Geolocation funktion, behandlar plats ko-ordinater
function getLocation() {
    
   geocoder = new google.maps.Geocoder();

       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
       }
       function successFunction(position) {
           var lat = position.coords.latitude;
           var lng = position.coords.longitude;
           codeLatLng(lat, lng)
       }

       function errorFunction() {
           alert("Geocoder failed! Type location in the searchfield.");
       }

       function initialize() {
           geocoder = new google.maps.Geocoder();
       }

       function codeLatLng(lat, lng) {

           var latlng = new google.maps.LatLng(lat, lng);
           geocoder.geocode({ 'latLng': latlng }, function (results, status) {
               if (status == google.maps.GeocoderStatus.OK) {
                   //console.log(results);
                   if (results[1]) {
                       var indice = 0;
                       for (var j = 0; j < results.length; j++) {
                           if (results[j].types[0] == 'locality') {
                               indice = j;
                               break;
                           }
                       }
                       console.log(results[j]);
                       for (var i = 0; i < results[j].address_components.length; i++) {
                           if (results[j].address_components[i].types[0] == "locality") {
                               city = results[j].address_components[i];
                           }
                       }
                       document.getElementById("searchName").innerHTML = city.long_name;
                       document.getElementById("name").innerHTML = city.long_name;
                       Cookies.set('_username', city.long_name);
                       location.reload();

                   } else {
                       alert("No results found");
                   }
               } else {
                   alert("Geocoder failed due to: " + status);
               }
           });
       }
       
       const apiKey = 'pppt4';
       const fetchSoch = async (url) => await (await fetch(url, { headers: new Headers({ 'Accept': 'application/json' }) })).json();
       // funktion för att göra en enkel sökning
       const sochSearch = async (query) => {
           const json = await fetchSoch(`http://kulturarvsdata.se/ksamsok/api?x-api=${apiKey}&method=search&query=${query}&recordSchema=presentation`);
           return json.result.records.record.map(r => r['pres:item']);
       };
       // Hämta ett object via en URI (JSON-LD)
       fetchSoch('http://kulturarvsdata.se/raa/bbrp/21620000011565').then(data => {
           // console.log(data);
       }).catch(reason => {
           console.error(reason.message);
       });
       // här behandlas söktermen
        (sochSearch(name).then(data => {
            console.log(people)
           // loopa igenom snygg fin JavaScript array med listade object
            for (i=0;i<data.length; i++){
               var record = data[i];

               people.push({title: record['pres:itemLabel'], description: record['pres:description'], image: record['pres:image']['pres:src'][0]['content'],
               link: record['pres:representations']['pres:representation'][0]['content']});
               
           }}));
}

// Ger en sökterm som användaren skrivit in
$(document).ready(function () {
    var name = Cookies.get('_username');
    if (name) {
        $('#name').val(name);
    }
    $('#name').keyup(function () {
        var inputName = $('#name').val();
        Cookies.set('_username', inputName);
    })
   
    var searchName = name;
    document.getElementById('searchName').innerHTML = searchName;

const apiKey = 'pppt4';
const fetchSoch = async (url) => await (await fetch(url, { headers: new Headers({ 'Accept': 'application/json' }) })).json();
// funktion för att göra en enkel sökning
const sochSearch = async (query) => {
    const json = await fetchSoch(`http://kulturarvsdata.se/ksamsok/api?x-api=${apiKey}&method=search&query=${query}&recordSchema=presentation`);
    return json.result.records.record.map(r => r['pres:item']);
};
// Hämta ett object via en URI (JSON-LD)
fetchSoch('http://kulturarvsdata.se/raa/bbrp/21620000011565').then(data => {
    // console.log(data);
}).catch(reason => {
    console.error(reason.message);
});
// här behandlas söktermen
 (sochSearch(name).then(data => {
     console.log(people)
    // loopa igenom snygg fin JavaScript array med listade object
     for (i=0;i<data.length; i++){
        var record = data[i];
        
        people.push({title: record['pres:itemLabel'], description: record['pres:description'], image: record['pres:image']['pres:src'][0]['content'],
        link: record['pres:representations']['pres:representation'][0]['content']});
        
    }}));
});