$(async () => {
    const source = await $.get('./monkeyList.hbs');
    const template = Handlebars.compile(source);
    const context = {monkeys};
    const html = template(context);

    let monkeyDiv = $('.monkeys');
    monkeyDiv.html(html);

    let monkeyDivs = Array.from(monkeyDiv.children());
    monkeyDivs.forEach(div => {
        let button = $(div).find('button');
        let paragraphId = $(div).find('p').attr('id');

        button.on('click', () => {
            $(`#${paragraphId}`).toggle();
        });
    });
});