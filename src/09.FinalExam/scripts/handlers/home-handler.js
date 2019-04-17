handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    if(userService.isAuth()){
        eventService.loadEvents().then(function (events) {
            ctx.hasEvents = events.length > 0;
            ctx.events = events.sort((a, b) => {
                return b.interestedInPeople - a.interestedInPeople;
            });
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/events/event.hbs'
            }).then(function () {
                this.partial('./templates/home.hbs');
            });
        }).catch(function (e) {
            notifications.showError(e.responseJSON.description);
        });
    }
    else{
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/home.hbs');
        });
    }

};