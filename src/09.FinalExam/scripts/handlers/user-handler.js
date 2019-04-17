handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs'
  }).then(function () {
    this.partial('./templates/register.hbs');
  }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
  });
};

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs'
  }).then(function () {
    this.partial('./templates/login.hbs');
  }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
  });
};

handlers.registerUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPassword = ctx.params.rePassword;

    if(username.length < 3){
        notifications.showError('Username must be at least 3 symbols long!');
        return;
    }

    if(password.length < 6){
        notifications.showError('Password must be at least 6 symbols long!');
        return;
    }

    if (repeatPassword !== password) {
        notifications.showError('Passwords must match');
        return;
    }

    userService.register(username, password).then((res) => {
      userService.saveSession(res);
      notifications.showSuccess('User registration successful.');
      ctx.redirect('#/home');
    }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
    });
};

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showSuccess('Logout successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
      notifications.showError(err.responseJSON.description);
  });
};

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showSuccess('User logged in successfully');
    ctx.redirect('#/home');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
};

handlers.getProfile = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    eventService.loadEvents().then(function (events) {
        let userEvents = events.filter(e => e.organizer === sessionStorage.getItem('username'));
        ctx.eventsCount = userEvents.length;
        ctx.events = userEvents;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/profile.hbs');
        });
    });
};