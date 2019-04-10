function getToHome(that, route) {
    that.get(route, function () {
        this.loggedIn = !!sessionStorage.getItem('authtoken');
        this.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        });
    });
}

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        getToHome(this, '#/');
        getToHome(this, '#/home');

        this.get('#/about', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        this.get('#/login', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (context) {
            let that = this;
            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;

            auth.register(username, password, repeatPassword)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo('Register Successful.');
                    that.redirect('#/home');
                });
        });

        this.get('#/logout', function () {
            auth.logout();
            sessionStorage.clear();
            this.redirect('#/home');
        });

        this.post('#/login', function (context) {
            let that = this;
            let username = context.params.username;
            let password = context.params.password;

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo('Login successful.');
                    that.redirect('#/home');
                });
        });

        this.get('#/catalog', function () {
            let that = this;
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.hasNoTeam = !!sessionStorage.getItem('teamId');

            teamsService.loadTeams()
                .then(function (res) {
                    that.teams = res;
                    that.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                });
        });



        this.get('#/create', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (context) {
            let that = this;
            let teamName = context.params.name;
            let comment = context.params.comment;

            teamsService.createTeam(teamName, comment)
                .then(function (res) {
                    let teamId = res._id;
                    that.teamId = teamId;
                    teamsService.joinTeam(teamId);
                    auth.showInfo(`Successfully created team: ${teamName}`);
                    that.redirect('#/catalog');
                })
        });
    });

    app.run('#/');
});