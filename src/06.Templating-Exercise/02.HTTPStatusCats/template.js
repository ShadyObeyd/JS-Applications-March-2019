$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const source = await $.get('./catList.hbs');
        const template = Handlebars.compile(source);
        const context = {cats};
        const html = template(context);

        let allCatsDiv = $('#allCats');
        allCatsDiv.html(html);

        Array.from(allCatsDiv.children()).forEach(div => {
            let clicks = -1;
            let button = $(div).find('button');
            button.on('click', () => {
                if(clicks % 2 === 0){
                    button.text('Show status code');
                }
                else{
                    button.text('Hide status code');
                }
                let id = $(div).find('div div').attr('id');

                $(`#${id}`).toggle();
                clicks++;
                console.log(clicks);
            });

        });
    }
});
