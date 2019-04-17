const handlers = {};

$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');
    // home page routes
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // user routes
    this.get('#/register', handlers.getRegister);
    this.get('#/login', handlers.getLogin);

    this.post('#/register', handlers.registerUser);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);
    this.get('#/profile', handlers.getProfile);

    // ADD YOUR ROUTES HERE
    this.get('#/organize', handlers.getOrganizeEvent);

    this.post('#/organize', handlers.organizeEvent);

    this.get('#/details/:id', handlers.getEventDetails);

    this.get('#/edit', handlers.getEditEvent);

    this.post('#/edit', handlers.editEvent);

    this.get('#/close', handlers.deleteEvent);

    this.get('#/join', handlers.joinConcert);
  });
  app.run();
});