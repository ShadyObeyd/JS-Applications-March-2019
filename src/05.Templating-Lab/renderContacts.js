$(async () => {
    const source = await $.get('card-list.hbs');
    const template = Handlebars.compile(source);
    const context = {contacts};
    const html = template(context);
    $('.contacts').html(html);
});

function showDetails(id) {
    $(`#${id}`).toggle();
}