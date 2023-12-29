let songsTitles = [
    'Zawsze Tam Gdzie Ty', 'Barbie Girl', 'Rick Roll', 'The Next Episode', 'AxelF',
    'Sandstorm', '...Baby One More Time', 'Bohema', 'Urke',
    'Chodź, Pomaluj Mój Świat', 'Co Ty Tutaj Robisz'
]
document.querySelectorAll('button').forEach(elem =>{
    elem.onclick= ()=>{
        let num = 1
        console.log(songsTitles[parseInt(elem.innerText)-1],parseInt(elem.innerText))
        document.querySelector('.menuselection').innerHTML=`
        <button onclick="window.location.reload()">Powrót</button>
        <audio controls>
            <source id="src" src="songs/Zawsze%20Tam%20Gdzie%20Ty/1.mp3" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>
        <!-- Jak nie pisać kodu -->
        <button onclick="(parseInt(document.getElementById('src').src.substring(document.getElementById('src').src.lastIndexOf('/')+1))<3)?document.getElementById('src').src=document.getElementById('src').src.substring(document.getElementById('src').src.lastIndexOf('songs/'),document.getElementById('src').src.lastIndexOf('/')+1)+(parseInt(document.getElementById('src').src.substring(document.getElementById('src').src.lastIndexOf('/')+1,document.getElementById('src').src.lastIndexOf('.')))+1)+'.mp3':console.log('1')"> > </button>
        <div>
            <div onclick="this.textContent = '${songsTitles[parseInt(elem.innerText)-1]}'">Zgaduje</div>
        </div>
        `
    }
})
