handlers.getOrganizeEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/events/organize.hbs');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
};

handlers.organizeEvent = function (ctx) {
    let eventName = ctx.params.name;
    let eventDate = ctx.params.dateTime;
    let imageUrl = ctx.params.imageURL;
    let description = ctx.params.description;

    if(eventName.length < 6){
        notifications.showError('Event name must be at least');
    }

    if(typeof eventDate !== 'string'){
        notifications.showError('Invalid event date');
    }

    if(description.length < 10){
        notifications.showError('Event Description must be at least 10 characters.');
    }

    if(!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')){
        notifications.showError('Invalid image URL');
    }

    eventService.organizeEvent(eventName, eventDate, description, imageUrl).then(function () {
        notifications.showSuccess('Event created successfully.');

        ctx.redirect('#/home');
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};

handlers.getEventDetails = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let eventId = ctx.params.id;
    sessionStorage.setItem('eventId', eventId);
    eventService.loadEvents().then(function (events) {
        let event = events.filter(e => e._id === eventId)[0];

        ctx.imageURL = event.imageURL;
        ctx.name = event.name;
        ctx.description = event.description;
        ctx.date = event.date;
        ctx.interestedInPeople = event.interestedInPeople;
        ctx.organizer = event.organizer;
        ctx.isOwnEvent = sessionStorage.getItem('username') === event.organizer;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/events/details.hbs');
        });
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};

handlers.getEditEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/events/edit.hbs');
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};

handlers.editEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let eventId = sessionStorage.getItem('eventId');
    eventService.loadEvents().then(function (events) {
        let event = events.filter(e => e._id === eventId)[0];

        let eventName = ctx.params.name;
        let eventDate = ctx.params.dateTime;
        let imageUrl = ctx.params.imageURL;
        let description = ctx.params.description;

        eventService.editEvent(eventId, event, eventName, description, eventDate, imageUrl).then(function () {
            notifications.showSuccess('Event edited successfully.');
            ctx.redirect('#/home');
            sessionStorage.removeItem('eventId');
        });
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};

handlers.deleteEvent = function (ctx) {
    let eventId = sessionStorage.getItem('eventId');

    eventService.deleteEvent(eventId).then(function () {
        notifications.showSuccess('Event closed successfully');
        ctx.redirect('#/home');
        sessionStorage.removeItem('eventId');
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};

handlers.joinConcert = function (ctx) {
    let eventId = sessionStorage.getItem('eventId');

    eventService.loadEvents().then(function (events) {
        let event = events.filter(e => e._id === eventId)[0];

        eventService.joinEvent(eventId, event).then(function () {
            notifications.showSuccess('You join the event successfully.');
            sessionStorage.removeItem('eventId');
        });
    }).catch(function (e) {
        notifications.showError(e.responseJSON.description);
    });
};