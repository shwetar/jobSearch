'use strict';

var SearchView = Backbone.View.extend({
  el: $('.header'),
  // template 
  template: _.template($("#header-template").html()),
  events: {
    'click .find-jobs': 'findJobs',
    'click .find-resumes': 'findResumes',
    'click .post-job': 'postJob',
  },
  findJobs: function(){
    $(".find-resumes-container").addClass("hidden");
    $(".find-jobs-container").removeClass("hidden");
  },
  findResumes: function(){
    $(".find-resumes-container").removeClass("hidden");
    $(".find-jobs-container").addClass("hidden");
  },
  postJob: function(){
    $(".find-resumes-container").addClass("hidden");
    $(".find-jobs-container").addClass("hidden");
  },
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template({}));
  }
});
new SearchView();