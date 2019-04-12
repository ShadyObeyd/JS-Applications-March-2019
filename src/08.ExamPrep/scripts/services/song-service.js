const songService = (() => {
    function addSong(title, artist, imageURL) {
        let songData = {
            title,
            artist,
            imageURL,
            listened: 0,
            likes: 0
        };
        return kinvey.post('appdata', 'songs', 'kinvey', songData);
    }

    function loadSongs() {
        return kinvey.get('appdata', 'songs', 'kinvey');
    }

    function getSortedSongs(songs) {
        let currentUserId = sessionStorage.getItem('id');
        let ownSongs = songs.filter(s => s._acl.creator === currentUserId).sort((a, b) => {
            return b.likes - a.likes || b.listened - a.listened;
        });
        setIsOwnSongProp(ownSongs, true);

        let otherSongs = songs.filter(s => s._acl.creator !== currentUserId).sort((a, b) => {
            return b.likes - a.likes;
        });
        setIsOwnSongProp(otherSongs, false);

        return otherSongs.concat(ownSongs);
    }

    function loadMySongs(songs) {
        let currentUserId = sessionStorage.getItem('id');
        let ownSongs = songs.filter(s => s._acl.creator === currentUserId).sort((a, b) => {
            return b.likes - a.likes || b.listened - a.listened;
        });
        setIsOwnSongProp(ownSongs, true);

        return ownSongs;
    }

    function setIsOwnSongProp(songs, value) {
        for (let song of songs) {
            song.isOwnSong = value;
        }
    }

    function likeSong(id, song) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', song);
    }

    function listenSong(id, song) {
        return kinvey.update('appdata', `songs/${id}`, 'kinvey', song);
    }

    function removeSong(id) {
        return kinvey.remove('appdata', `songs/${id}`, 'kinvey');
    }

    return {
        addSong,
        loadSongs,
        getSortedSongs,
        loadMySongs,
        likeSong,
        listenSong,
        removeSong
    };
})();