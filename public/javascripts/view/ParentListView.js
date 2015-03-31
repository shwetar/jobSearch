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
    var foundChild;
    var childId = $(e.target).data("child").id;
    _.each(this.collection.models, function(parent){
      var children = parent.get("children");
      _.each(children, function(child){
        if(child.id === childId){
          foundChild = child;
        }
      });
    });
    new ListContent({model: foundChild});
  },

  initialize: function(){
    var self = this;
    this.listenTo(this.collection, "add", this.render);
    this.render();
  },
  render: function(){
    var self = this;
    self.$el.empty();
    this.collection.each(function(model) {
      var parentView = new ParentView({model: model.toJSON()});
      self.$el.append(parentView.el);
    });
    $('.tree li.parent_li > span').on("click", this.expandCollapseChildren);
    $('.child').on("click", function(e){
      self.childClicked(e);
    });
  }
});