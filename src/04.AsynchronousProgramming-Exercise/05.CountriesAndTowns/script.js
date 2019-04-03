const countriesUrl = 'https://baas.kinvey.com/appdata/kid_SJ4HqVfKN/countries';
const townsUrl = 'https://baas.kinvey.com/appdata/kid_SJ4HqVfKN/towns';

const username = 'guest';
const password = 'guest';
const base64Auth = btoa(username + ':' + password);
const authHeaders =  {'Authorization': 'Basic ' + base64Auth};
let table = $('#results');

function listCountries() {
    $('#results tr:gt(0)').remove();
    $.ajax({
        url: countriesUrl,
        method: 'GET',
        headers: authHeaders,
        success: getCountries
    }).catch(e => console.log(e.responseText));
}

function getCountries(countries) {
    countries.forEach(c => {
        let row = $('<tr>');
        let countryTd = $('<td>').text(c.name);

        let editLabel = $('<label>').attr('for', 'newName');
        let editInputField = $('<input>')
            .attr('id', 'newName')
            .attr('placeholder', 'new name...')
            .css('width', '60px');

        let editBtn = $('<button>').text('Edit');
        let delBtn = $('<button>').text('Delete');

        let actionsTd = $('<td>').append(editLabel).append(editInputField).append(editBtn).append(delBtn);

        editBtn.on('click', () => {
            $.ajax({
                url: countriesUrl + `/${c._id}`,
                method: 'PUT',
                headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
                data: JSON.stringify({
                    name: $('#newName').val()
                })
            }).catch(e => console.log(e.responseText));
        });
        delBtn.on('click', () => {
            $.ajax({
                url: countriesUrl + `/${c._id}`,
                method: 'DELETE',
                headers: authHeaders
            }).catch(e => console.log(e.responseText));
        });

        row.append(countryTd);
        row.append(actionsTd);

        table.append(row);
    });
}

function listTowns() {
    $('#results tr:gt(0)').remove();
    $.ajax({
        url: townsUrl,
        method: 'GET',
        headers: authHeaders,
        success: getTowns
    }).catch(e => console.log(e.responseText));
}

function getTowns(towns) {
    towns.forEach(t => {
        let row = $('<tr>');
        let countryTd = $('<td>').text('');

        let countryActionsTd = $('<td>').text('');

        row.append(countryTd);
        row.append(countryActionsTd);

        let townTd = $('<td>').text(t.name);

        let editLabel = $('<label>').attr('for', 'newName');
        let editInputField = $('<input>')
            .attr('id', 'newName')
            .attr('placeholder', 'new name...')
            .css('width', '60px');

        let editBtn = $('<button>').text('Edit');
        let delBtn = $('<button>').text('Delete');

        editBtn.on('click', () => {
            $.ajax({
                url: townsUrl + `/${t._id}`,
                method: 'PUT',
                headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
                data: JSON.stringify({
                    name: $('#newName').val(),
                    country: t.country
                })
            }).catch(e => console.log(e.responseText));
        });
        delBtn.on('click', () => {
            $.ajax({
                url: townsUrl + `/${t._id}`,
                method: 'DELETE',
                headers: authHeaders,
            }).catch(e => console.log(e.responseText));
        });

        let actionsTd = $('<td>').append(editLabel).append(editInputField).append(editBtn).append(delBtn);

        row.append(townTd);
        row.append(actionsTd);
        table.append(row);
    });
}

function listTownsByCountry() {
    $('#results tr:gt(0)').remove();
    $.ajax({
        url: townsUrl,
        method: 'GET',
        headers: authHeaders,
        success: getTownsByCountry
    }).catch(e => console.log(e.responseText));
}

function getTownsByCountry(towns) {
    let country = $('#country-sort').val();
    let filteredTowns = towns.filter(t => t.country === country);
    getTowns(filteredTowns);
}

function addCountry() {
    $.ajax({
        url: countriesUrl,
        method: 'POST',
        headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
        data: JSON.stringify({
            name: $('#country').val()
        })
    }).catch(e => console.log(e.responseText));
    setTimeout(listCountries, 50);
}

function addTown() {
    $.ajax({
        url: townsUrl,
        method: 'POST',
        headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
        data: JSON.stringify({
            name: $('#town').val(),
            country: $('#town-country').val()
        })
    }).catch(e => console.log(e.responseText));

    setTimeout(listTowns, 50);
}

