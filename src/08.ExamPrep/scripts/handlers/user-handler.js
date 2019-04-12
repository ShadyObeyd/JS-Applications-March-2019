handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs'
  }).then(function () {
    this.partial('./templates/register.hbs');
  }).catch(function (err) {
      notify.showError(`Error: ${err.responseJSON.description}`);
  });
};

handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs'
  }).then(function () {
    this.partial('./templates/login.hbs');
  }).catch(function (err) {
      notify.showError(`Error: ${err.responseJSON.description}`);
  });
};

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;

  if(username.length < 3 || password.length < 6){
      notify.showError(`Password or username is too short!`);
      return;
  }

    userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notify.showInfo('User registration successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
      notify.showError(`Error: ${err.responseJSON.description}`);
  });
};

handlers.logoutUser = function (ctx) {
    userService.logout().then(() => {
    sessionStorage.clear();
    notify.showInfo('Logout successful.');
    ctx.redirect('#/login');
  }).catch(function (err) {
      notify.showError(`Error: ${err.responseJSON.description}`);
  })
};

handlers.loginUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    userService.login(username, password).then((res) => {
    userService.saveSession(res);
      notify.showInfo('Login successful.');
    ctx.redirect('#/home');
  }).catch(function (err) {
      notify.showError(`Error: ${err.responseJSON.description}`);
  });
};