function attachEvents() {
    let sendBtn = $('#submit');
    let refreshBtn = $('#refresh');
    let textArea = $('#messages');
    const baseUrl = `https://messenger-60f11.firebaseio.com/`;

    sendBtn.on('click', () => {
        let author = $('#author').val();
        let message = $('#content').val();

        $.ajax({
            method: 'POST',
            url: baseUrl + '.json',
            data: JSON.stringify({
                author: author,
                content: message,
                timestamp: Date.now()
            })
        });
    });

    refreshBtn.on('click', () => {
        $.ajax({
            method: 'GET',
            url: baseUrl + '.json',
            success: logResponse
        });
    });

    function logResponse(res) {
        for (let resKey in res) {
            textArea.append(`${res[resKey]['author']}: ${res[resKey]['content']}\n`);
        }
    }
}