'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
require("bootstrap-webpack");
var ListContent = require("./ListContent");
var Parent = require("../../model/Parent");
var ParentList = require("../../collections/ParentList");
var ParentListView = require('./ParentListView');

module.exports = Backbone.View.extend({
    template: require('../../templates/home.html'),

    events: {
        'click .add-link-button': 'addLink',
        'click .destroy': 'removeLink',
        'submit #add-link-form': 'addLink'
    },
    
    addChildModal: function(e){
      console.log("add child dialog");
      $("#addChild").modal('show');
      $(".add-child-button").click($.proxy(function(){
        this.addChild(e);
      }, this));
    },

    addChild: function(e){
      console.log("add child");
      var curParentChildren = this.currentParent.children;
      var childName = $(".child-name").val();
      var newChild = {
        id: curParentChildren.length + 1,
        links: [],
        name: childName,
        parent: this.currentParent.id,
        yourChild: true
      };
      curParentChildren.push(newChild);
      $("#addChild").modal('hide');
      this.parentList = new ParentListView({el: $(".parents-list"), collection: this.parentsList});
      $(".child-name").val("");
      localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
      $(".add-child-button").off("click");
      this.parentListEvents();
    },

    removeLink: function(e){
      e.preventDefault();
      var idx = $(e.target).data("child");
      console.log(this.currentChild.links.length);
      this.currentChild.links.splice(idx, 1);
      console.log(this.currentChild.links.length);
      this.listContent = new ListContent({el: $(".list-container"), model: this.currentChild});
      this.resetLinks(this.currentChild.links);
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
      var foundParent;
      var childId = $(e.target).data("child").id;
      var parentId = $(e.target).data("child").parent;
      _.each(this.parentsList.models, function(parent){
        var children = parent.get("children");
        _.each(children, function(child){
          if(child.id === childId && parentId === child.parent){
            foundChild = child;
            foundParent = parent;
          }
        });
      });
      this.currentChild = foundChild;
      //this.currentParent = foundParent.toJSON();
      new ListContent({el: $(".list-container"), model: foundChild});
      $(".child").removeClass("active");
      $(e.target).addClass("active");
    },

    resetLinks: function(links){
      var self = this;
      _.each(this.currentParent.children, function(child){
          if(child.id === self.currentChild.id){
            self.currentChild.links = links;
          }
      });
      localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
    },
    addLink: function(e){
      var self = this;
      e.preventDefault();
      var linkName = $(".link-name").val();
      if(this.validateUrl(linkName)){
        var links = this.currentChild.links.concat(linkName);
        this.currentChild.links = links;
        new ListContent({el: $(".list-container"), model: this.currentChild});
        this.resetLinks(links);
      }
      else{
        $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
      }
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      var self = this;
      this.$el.html(this.template({}));
      this.parentsList = new ParentList();
      var parents = localStorage.getItem("parents");
      if(_.isEmpty(parents)){
        $.get("/api/parents", function(parents){
          self.processData(parents);
        });
      }
      else{
        this.processData(JSON.parse(parents));
      }
    },

    parentListEvents: function(){
      var self = this;
      $('.tree li.parent_li > span').on("click", this.expandCollapseChildren);
      $('.child').on("click", function(e){
        self.childClicked(e);
      });
    },

    processData : function(parents){
      var self = this;
      _.each(parents, function(parent){
        if(!this.currentChild){
          this.currentChild = parent.children[0];
          this.currentParent = parent;
        }
        this.parentsList.push(new Parent(parent));
      }.bind(this));
      this.parentList = new ParentListView({el: $(".parents-list"), collection: this.parentsList});
      this.listContent = new ListContent({el: $(".list-container"), model: this.currentChild});
      localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
      this.parentListEvents();
      
      $(".add-child").on("click", function(e){this.addChildModal(e);}.bind(this));
    },

    validateUrl: function(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    },
});
