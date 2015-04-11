var myRouter = Backbone.Router.extend({
    
    
    login: null,
    signup: null,
    container:null,
    
    initialize: function() {
        this.container = new ContainerView({ el: $("#app-container")});
     },

    routes: {
        "": "loginRoute",
        "login": "loginRoute",
        "signup": "signupRoute",
        
    },

    loginRoute: function () {
        //debugger;
        if (this.login == null) {
            this.login = new LoginView();
        }

        this.container.myChildView = this.login;
        this.container.render();
    },

    signupRoute: function () {
        if (this.signup == null) {
            this.signup = new SignupView();
        }

        this.container.myChildView = this.signup;
        this.container.render();
    }

    
});


router = new myRouter();
Backbone.history.start();