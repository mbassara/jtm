let songsTitles = [
    'Barbie Girl', 'Rick Roll', 'The Next Episode', 'AxelF',
    'Sandstorm', '...Baby One More Time', 'Bohema', 'Urke',
    'Chodź, Pomaluj Mój Świat', 'Co Ty Tutaj Robisz'
]
document.querySelectorAll('button').forEach(elem =>{
    elem.onclick= ()=>{
        console.log(songsTitles[parseInt(elem.innerText)-1],parseInt(elem.innerText))

    }
})
console.log("XD")