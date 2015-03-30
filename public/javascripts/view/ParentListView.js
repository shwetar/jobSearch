'use strict';

var ParentListView = Backbone.View.extend({
  el: '.parents-list',
  model: ParentList,

  //Templated events not getting fired for some reason???
  events: {
    'click .tree li.parent_li > span': 'expandCollapseChildren'
  },

  expandCollapseChildren: function(e){
    var children = $(this).parent('li.parent_li').find(' > ul > li');
    if (children.is(":visible")) {
        children.hide('fast');
        $(this).attr('title', 'Show Children')
              .find(' > i')
              .addClass('glyphicon-plus-sign')
              .removeClass('glyphicon-minus-sign');
    } else {
        children.show('fast');
        $(this).attr('title', 'Hide Children')
              .find(' > i')
              .addClass('glyphicon-minus-sign')
              .removeClass('glyphicon-plus-sign');
    }
    e.stopPropagation();
  },
  
  childClicked: function(e){
    new ListContent({collection: $(e.target).data("child")});
    console.log($(e.target).data("child").name);
  },

  initialize: function(){
    this.listenTo(this.collection, "add", this.render);
    this.render();
    $('.tree li.parent_li > span').on("click", this.expandCollapseChildren);
    $('.child').on("click", this.childClicked);
  },
  render: function(){
    var self = this;
    self.$el.empty();
    this.collection.each(function(model) {
      var parentView = new ParentView({model: model.toJSON()});
      self.$el.append(parentView.el);
    });
  }
});