'use strict';

var FindResumes = Backbone.View.extend({
  el: $('.find-resumes-container'),
  // template 
  template: _.template($("#find-resumes-template").html()),
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

new FindResumes();