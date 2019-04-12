handlers.getAllSongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    songService.loadSongs().then(function (songs) {
        ctx.songs = songService.getSortedSongs(songs);

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            song: './templates/songs/song.hbs'
        }).then(function () {
            this.partial('./templates/songs/all.hbs');
        });
    }).catch(function () {
        notify.showError(`Error: ${err.responseJSON.description}`);
    });
};

handlers.getMySongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    songService.loadSongs().then(function (songs) {
        ctx.songs = songService.loadMySongs(songs);

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            song: './templates/songs/song.hbs'
        }).then(function () {
            this.partial('./templates/songs/mine.hbs');
        });
    }).catch(function () {
        notify.showError(`Error: ${err.responseJSON.description}`);
    });
};

handlers.getCreateSong = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/songs/create.hbs');
    }).catch(function (err) {
        notify.showError(`Error: ${err.responseJSON.description}`);
    });
};

handlers.createSong = function (ctx) {
    let title = ctx.params.title;
    let imageUrl = ctx.params.imageURL;
    let artist = ctx.params.artist;

    if(title.length < 6 || artist < 3){
        notify.showError(`Title or artist is too short!`);
        return;
    }
    if(!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')){
        notify.showError(`Invalid image URL!`);
        return;
    }
    let that = this;
    songService.addSong(title, artist, imageUrl).then(function (res) {
        notify.showInfo('Song created successfully.');
        that.redirect('#/allSongs');
    });
};

handlers.likeSong = function (ctx) {
    let id = ctx.params.id;

    songService.loadSongs().then(function (songs) {
        let song = songs.filter(s => s._id === id)[0];
        song.likes++;

        songService.likeSong(id, song).then(function () {
            notify.showInfo('Liked!');
            ctx.redirect('#/allSongs');
        })
    });
};

handlers.listenSong = function (ctx) {
    let id = ctx.params.id;

    songService.loadSongs().then(function (songs) {
        let song = songs.filter(s => s._id === id)[0];
        song.listened++;

        songService.listenSong(id, song).then(function () {
            notify.showInfo(`You just listened ${song.title}`);
            ctx.redirect('#/allSongs');
        })
    });
};

handlers.removeSong = function (ctx) {
  let id = ctx.params.id;

  songService.removeSong(id).then(function () {
      notify.showInfo('Song removed successfully!');
      ctx.redirect('#/allSongs');
  })
};