function attachEvents() {
    let towns = [];
    $('#btnLoadTowns').on('click', async () => {
        let inputTokens = $('#towns').val().split(', ').forEach(t => {
            let town = {
                name: t
            };

            towns.push(town);
        });

        const source = await $.get('./towns-list.hbs');
        const template = Handlebars.compile(source);
        const context = {towns};
        const html = template(context);

        $('#root').html(html);
    });
}