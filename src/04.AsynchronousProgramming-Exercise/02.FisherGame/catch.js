function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_BJtaOWZtV/biggestCatches';
    const username = 'guest';
    const password = 'guest';
    const base64Auth = btoa(username + ':' + password);
    const authHeaders =  {'Authorization': 'Basic ' + base64Auth};

    let loadBtn = $('.load');
    let addBtn = $('.add');

    loadBtn.on('click', loadCatches);
    addBtn.on('click', addCatch);

    function loadCatches() {
        $.ajax({
            method: 'GET',
            url: baseUrl,
            headers: authHeaders,
            success: displayCatches
        })
    }

    function displayCatches(res) {
        let catchesDiv = $('#catches');
        catchesDiv.empty();

        for (let _catch of res) {
            let catchDiv = $('<div>').addClass('catch').attr('data-id', _catch._id);

            catchDiv
                .append($('<label>').text("Angler"))
                .append($('<input>').attr("type", "text").addClass("angler").val(_catch.angler))
                .append($('<label>').text("Weight"))
                .append($('<input>').attr("type", "number").addClass("weight").val(_catch.weight))
                .append($('<label>').text("Species"))
                .append($('<input>').attr("type", "text").addClass("species").val(_catch.species))
                .append($('<label>').text("Location"))
                .append($('<input>').attr("type", "text").addClass("location").val(_catch.location))
                .append($('<label>').text("Bait"))
                .append($('<input>').attr("type", "text").addClass("bait").val(_catch.bait))
                .append($('<label>').text("Capture Time"))
                .append($('<input>').attr("type", "number").addClass("captureTime").val(_catch.captureTime))
                .append($('<button>').addClass("update").text("Update").click(updateCatch))
                .append($('<button>').addClass("delete").text("Delete").click(deleteCatch));


            catchesDiv.append(catchDiv);
        }
    }
    
    function addCatch() {
        let inputs = $(this).parent().find('input');

        $.ajax({
            url: baseUrl,
            method: "POST",
            headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
            data: JSON.stringify({
                angler: $(inputs[0]).val(),
                weight: Number($(inputs[1]).val()),
                species: $(inputs[2]).val(),
                location: $(inputs[3]).val(),
                bait: $(inputs[4]).val(),
                captureTime: Number($(inputs[5]).val())
            })
        });
    }

    function updateCatch() {
        let inputs = $(this).parent().find('input');
        let catchId = $(this).parent().attr('data-id');

        $.ajax({
            url: baseUrl + `/${catchId}`,
            method: "PUT",
            headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
            data: JSON.stringify({
                angler: $(inputs[0]).val(),
                weight: $(inputs[1]).val(),
                species: $(inputs[2]).val(),
                location: $(inputs[3]).val(),
                bait: $(inputs[4]).val(),
                captureTime: $(inputs[5]).val()
            })
        });
    }

    function deleteCatch() {
        let catchId = $(this).parent().attr('data-id');

        $.ajax({
            method: 'DELETE',
            url: baseUrl + `/${catchId}`,
            headers: authHeaders
        });
    }
}