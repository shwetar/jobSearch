'use strict';

var ParentListView = Backbone.View.extend({
  el: '.parents-list',

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
    console.log($(e.target).data("child").name);
  },

  initialize: function(){
    this.render();
    $('.tree li.parent_li > span').on("click", this.expandCollapseChildren);
    $('.child').on("click", this.childClicked);
  },
  render: function(){
    var self = this;
    this.collection.each(function(model) {
      var parentView = new ParentView({model: model.toJSON()});
      self.$el.append(parentView.el);
    });
  }
});

var parentsList = new ParentList([
    new Parent({
        name: 'Oleg Polyakov',
        city: 'Mountain View',
        children: [{
          name: "Edward"
        },{
          name: "Maria"
        }]
    }),
    new Parent({
        name: 'Antonina Trachuk',
        city: 'Mountain View',
        children: [{
          name: "Edward"
        },{
          name: "Maria"
        }]
    })
]);
new ParentListView({collection: parentsList});