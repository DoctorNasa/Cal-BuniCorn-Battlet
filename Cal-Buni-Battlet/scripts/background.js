chrome.extension.onMessage.addListener(
    function (request) {
        switch (request.type) {
            case 'add-song':
                addSong(data);
                break;
            case 'remove-song':
                break;
        }
    });

function addSong(data) {
    var songs = getSongs();
    songs.push(data);
    localStorage.songs = JSON.stringify(songs)
}

function getSongs() {
    if (!localStorage.songs) {
        localStorage.songs = JSON.stringify([]);
    }

    return JSON.parse(localStorage.songs);
}