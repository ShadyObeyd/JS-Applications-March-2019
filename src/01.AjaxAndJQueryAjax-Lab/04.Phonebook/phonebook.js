function solve() {
    const baseUrl = 'https://phonebook-a1ad6.firebaseio.com/phonebook';
    $('#btnLoad').on('click', loadContacts);
    $('#btnCreate').on('click', createContact);

    function loadContacts() {
        $.ajax({
            url: baseUrl + '.json',
            method: 'GET',
            success: onContactsLoad
        });

        function onContactsLoad(data) {
            let phonebookElement = $('#phonebook');
            phonebookElement.empty();
            if(Array.isArray(data)){
                for (let contact of data) {
                    if(!contact){
                        continue;
                    }

                    let personName = contact.name;
                    let phoneNumber = contact.phone;

                    let delButton = $('<button>').text('Delete');
                    let li = $('<li>').text(`${personName}: ${phoneNumber}`).append(delButton);
                    phonebookElement.append(li);

                    let key = data.indexOf(contact);
                    delButton.on('click', () => {
                        $.ajax({
                            url: `${baseUrl}/${key}.json`,
                            method: 'DELETE'
                        });
                    });
                }
            }
            else{
                for (let key in data) {
                    if(!key){
                        continue;
                    }

                    let personName = data[key]['name'];
                    let phoneNumber = data[key]['phone'];

                    let delButton = $('<button>').text('Delete');
                    let li = $('<li>').text(`${personName}: ${phoneNumber}`).append(delButton);
                    phonebookElement.append(li);

                    delButton.on('click', () => {
                        $.ajax({
                            url: `${baseUrl}/${key}.json`,
                            method: 'DELETE'
                        });
                    });
                }
            }
        }
    }

    function createContact() {
        $.ajax({
            url: baseUrl + '.json',
            method: 'POST',
            data: JSON.stringify({
                name: $('#person').val(),
                phone: $('#phone').val()
            })
        });
    }
}

solve();