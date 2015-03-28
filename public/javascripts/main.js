'use strict';

var AppView = Backbone.View.extend({
  el: $('.container'),
  // template 
  template: _.template($("#search-template").html()),
  initialize: function(){
    this.render();
    var what = ["Software Engineer","Senior Software Engineer",
                    "Web Designer","web Developer","Architect","Java Expert"];
    var where = ["San jose,ca","Santa Clara,ca","Palo Alto ,ca",
                "Fremomt,ca","Fresno,ca","Sunnyvale,ca"];
    
    $("#what").typeahead({ source:what });
    $("#where").typeahead({ source:where });
  },
  render: function(){
    this.$el.html(this.template({}));
  }
});

var appView = new AppView();