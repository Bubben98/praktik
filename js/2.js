console.log('running 2.js')

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
// här kan du också skriva CQL frågor (item="sten yxa" AND place=gotland)
 (sochSearch('huddinge').then(data => {
     console.log(people)
    // loopa igenom snygg fin JavaScript array med listade object
     for (i=0;i<data.length; i++){
        var record = data[i];
        // logga objekt
        console.log(record);
        // skriv ut specifikt element ur objektet
        // console.log(record['pres:dataQuality']);
        // skriv ut specifikt element till HTML
        // document.querySelector('.elementId1').innerText = record['pres:itemLabel'];
        people.push({title: record['pres:itemLabel'], description: record['pres:description']});
        // document.querySelector('.elementId2').src = record['pres:image']['pres:src'][0]['content'];
        // document.querySelector('.elementId2').value = record['pres:image']['pres:src'][0]['type'];
        // document.querySelector('.elementId3').href = record['pres:representations']['pres:representation'][0]['content'];
        // document.querySelector('.elementId4').innerText = record['pres:description'];
        
    }}));
// }).catch(reason => {
//     // nätverksfel av någon typ
//     console.error(reason.message);
//     });