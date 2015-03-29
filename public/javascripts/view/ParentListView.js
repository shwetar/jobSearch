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
    new ListContent({collection: $(e.target).data("child")});
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

var child1 = new Child({
  id: 1,
  name: "Edward Polyakov",
  parents: [1, 2],
  links: ["http://www.friv.com"]
});

var child2 = new Child({
  id: 2,
  name: "Maria Polyakov",
  parent: 1,
  links: ["http://www.stmath.com", "http://www.sumdog.com"]
});

var child3 = new Child({
  id: 3,
  name: "Joseph",
  parent: 2,
  links: ["http://www.linkedin.com"]
});

var child4 = new Child({
  id: 4,
  name: "Veronika",
  parent: 2,
  links: ["http://www.yahoo.com", "http://www.google.com"]
});

var parentsList = new ParentList([
    new Parent({
      id: 1,
      name: 'Oleg Polyakov/Antonina Trachuk',
      city: 'Mountain View',
      children: [child1, child2]
    }),
    new Parent({
      id: 2,
      name: 'John Smith',
      city: 'San Jose',
      children: [child3, child4]
    })
]);
new ParentListView({collection: parentsList});