const clientId = 'da884e1ea7a146b98728e32226b29861';
const redirectUri = 'https://mbassara.github.io/jtm/';
const scope = 'user-read-private user-read-email user-library-read streaming';
const playlistId = '0NixjTMKJ0rDBFnkYJ2hqK';

let accessToken;
let deviceId;
let player;
let playlistTracks = [];
let playedTracks = [];
let selectedTrack;

function loginToSpotify() {
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token`;

    console.log("login to spotify", url);

    const spotifyAuthWindow = window.open(url, 'Spotify Auth', 'width=400,height=600');

    const pollTimer = setInterval(() => {
        try {
            if (spotifyAuthWindow.location.href.indexOf(redirectUri) !== -1) {
                clearInterval(pollTimer);
                spotifyAuthWindow.close();
                handleAccessToken(spotifyAuthWindow.location.hash);
            }
        } catch (error) {
            // Ignore cross-origin security errors
        }
    }, 100);
}

function handleAccessToken(hash) {
    const tokenRegex = /access_token=([^&]+)/;
    const match = hash.match(tokenRegex);

    if (match && match[1]) {
        accessToken = match[1];
        document.getElementById('login-panel').style.display = 'none';
        initializePlayer();
    } else {
        document.getElementById('status').innerText = 'Failed to retrieve access token.';
    }
}

function initializePlayer() {
    player = new Spotify.Player({
        name: 'Jaka To Melodia',
        getOAuthToken: cb => { cb(accessToken); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
        //updateCurrentSongInfo(state.track_window.current_track);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        deviceId = device_id;
        fetchPlaylistTracks();
        fetchPlaylistDetails();
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player
    player.connect();
}

function fetchPlaylistDetails() {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch playlist details. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        playlistName = data.name;
        document.getElementById('playlist-name').innerText = `${playlistName}`;
    })
    .catch(error => {
        console.error('Error fetching playlist details:', error);
    });
}

function fetchPlaylistTracks(offset = 0, limit = 100) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch playlist tracks. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        
        const newTracks = data.items;
        playlistTracks = [...playlistTracks, ...newTracks];

        if (data.total > offset + limit) {
            // If there are more tracks, fetch the next batch
            fetchPlaylistTracks(offset + limit, limit);
        } else {
            console.log('Fetched all playlist tracks:', playlistTracks);
            document.getElementById('playlist').style.display = 'block';
            selectNextRandomTrack();
        }
    })
    .catch(error => {
        console.error('Error fetching playlist tracks:', error);
    });
}

function selectNextRandomTrack() {
    hideCurrentSong();
    const remainingTracks = playlistTracks.filter(track => !playedTracks.includes(track.track.uri));

    if (remainingTracks.length === 0) {
        console.log('All tracks played. Resetting.');
        playedTracks = [];
    }

    selectedTrack = getRandomElement(remainingTracks);
    updateSongsLeft();
    updateCurrentSelectedSongInfo(selectedTrack.track);
    player.pause();
}

function playSelectedTrack(startTime = 0, duration = -1) {
    document.querySelectorAll('.media').forEach(elem=>{
        elem.style.visibility='visible';
    })
    if (selectedTrack && selectedTrack.track) {
        const uri = selectedTrack.track.uri;
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [uri],
                position_ms: startTime
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to play track via SDK');
            }
            console.log('Track started playing via SDK');

            if (duration > 0) {
                // Stop playback after the specified duration
                setTimeout(() => {
                    pausePlayback();
                }, duration);
            }
        })
        .catch(error => {
            console.error('Error playing track via SDK:', error);
        });

        

        playedTracks.push(uri);
        // selectedTrack = null;
        updateSongsLeft();
        updateCurrentSelectedSongInfo(selectedTrack.track);
    } else {
        console.error('No track selected.');
    }
}
function pausePlayback() {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to pause playback via SDK');
        }
        console.log('Playback paused via SDK');
    })
    .catch(error => {
        console.error('Error pausing playback via SDK:', error);
    });
}

function resumePlayback() {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to resume playback via SDK');
        }
        console.log('Playback resumed via SDK');
    })
    .catch(error => {
        console.error('Error resuming playback via SDK:', error);
    });
}

function showCurrentSong() {
    document.getElementById('currentSelectedSongInfo').style.visibility = 'visible';
    document.getElementById('showAnwsr').childNodes[0].src = 'icons/eye.svg';
    
    document.getElementById('showAnwsr').removeEventListener('click', showCurrentSong);
    document.getElementById('showAnwsr').addEventListener('click', hideCurrentSong);
    
    if (selectedTrack && selectedTrack.track) {
        updateCurrentSelectedSongInfo(selectedTrack.track);
    }
}
function hideCurrentSong() {
    document.getElementById('currentSelectedSongInfo').style.visibility = 'hidden';
    document.getElementById('showAnwsr').childNodes[0].src = 'icons/eye-off.svg';

    document.getElementById('showAnwsr').removeEventListener('click', hideCurrentSong);
    document.getElementById('showAnwsr').addEventListener('click', showCurrentSong);

    if (selectedTrack && selectedTrack.track) {
        updateCurrentSelectedSongInfo(selectedTrack.track);
    }
}

function updateCurrentSelectedSongInfo(track) {
    if (track) {
        document.getElementById('selectedSongName').innerText = `Song: ${track.name}`;
        document.getElementById('selectedArtistName').innerText = `Artist: ${track.artists.map(artist => artist.name).join(', ')}`;
    }
}

function updateSongsLeft() {
    const remainingTracks = playlistTracks.filter(track => !playedTracks.includes(track.track.uri));
    document.getElementById('songsLeft').innerText = `Songs Left: ${remainingTracks.length}`;
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function extractPlaylistId(link) {
    const regex = /playlist\/([a-zA-Z0-9]+)\b/;
    const match = link.match(regex);
    if (match && match.length > 1) {
        return match[1];
    } else {
        return "";
    }
}