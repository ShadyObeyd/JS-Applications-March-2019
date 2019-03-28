function loadRepos() {
    $('#repos').empty();

    let username = $('#username').val();

    let url = `https://api.github.com/users/${username}/repos`;

    $.ajax(url, {
        method: 'GET',
        success: displayRepos,
        error: displayError
    });

    function displayRepos(repos) {
        for (let repo of repos) {
            let link = $('<a>').text(repo.full_name);
            link.attr('href', repo.html_url);

            let liEleemnt = $('<li>').append(link);
            $('#repos').append(liEleemnt);
        }
    }

    function displayError() {
        let li = $('<li>').text('Error');
        $('#repos').append(li);
    }
}