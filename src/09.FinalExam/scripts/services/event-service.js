const eventService = (() => {
    function loadEvents() {
        return kinvey.get('appdata', 'events', 'kinvey');
    }
    
    function organizeEvent(name, date, description, imageURL) {
        let event = {
            name,
            date,
            description,
            imageURL,
            organizer: sessionStorage.getItem('username'),
            interestedInPeople: 0
        };

        return kinvey.post('appdata', 'events', 'kinvey', event);
    }

    function editEvent(eventId, event, newName, newDesc, newDate, newImageURL) {
        event.name = newName;
        event.date = newDate;
        event.description = newDesc;
        event.imageURL = newImageURL;

        return kinvey.update('appdata', `events/${eventId}`, 'kinvey', event);
    }

    function deleteEvent(eventId) {
        return kinvey.remove('appdata', `events/${eventId}`, 'kinvey');
    }

    function joinEvent(eventId, event) {
        event.interestedInPeople++;
        return kinvey.update('appdata', `events/${eventId}`, 'kinvey', event);
    }

    return {
        loadEvents,
        organizeEvent,
        editEvent,
        deleteEvent,
        joinEvent
    }
})();