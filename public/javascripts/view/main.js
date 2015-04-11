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
    var foundParent;
    var childId = $(e.target).data("child").id;
    _.each(this.collection.models, function(parent){
      var children = parent.get("children");
      _.each(children, function(child){
        if(child.id === childId){
          foundChild = child;
          foundParent = parent;
        }
      });
    });
    appView.currentChild = foundChild;
    appView.currentParent = foundParent;
    new ListContent({model: foundChild});
    $(".child").removeClass("active");
    $(e.target).addClass("active");
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
      var activeParent = model.id === 1;
      model.set("activeParent",activeParent);
      var parentView = new ParentView({model: model.toJSON()});
      self.$el.append(parentView.el);
    });
    $('.tree li.parent_li > span').on("click", this.expandCollapseChildren);
    $('.child').on("click", function(e){
      self.childClicked(e);
    });
  }
});

'use strict';

var ParentList = Backbone.Collection.extend({
    model: Parent,
    initialize: function () {
    
        // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
            console.log('something got added');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
            console.log('something got removed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
            console.log('something got changed');
            localStorage.setItem("parents", JSON.stringify(this.toJSON()));
        });
    }
});



'use strict';

var ParentView = Backbone.View.extend({
    tagName:  'li',
    template: _.template($("#parents-list-template").html()),

    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({item: this.model}));
        return this;
    }
});

'use strict';

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click .add-link-button': 'addLink',
        'click .add-friend-button': 'addParent',
        'submit #add-link-form': 'addLink'
    },
    
    addLink: function(e){
      var self = this;
      e.preventDefault();
      var linkName = $(".link-name").val();
      if(this.validateUrl(linkName)){
        var links = this.currentChild.links.concat(linkName);
        this.currentChild.links = links;
        new ListContent({model: this.currentChild});
        _.each(this.currentParent.children, function(child){
          if(child.id === self.currentChild.id){
            self.currentChild.links = links;
          }
        });
        localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
        console.log("added link", linkName);
      }
      else{
        $(".alert-error").addClass('in').removeClass('out').removeClass('hidden');
      }
    },

    addParent: function(){
      console.log("added friend");
      
      var friend = new Parent({
          id: this.parentsList.length+1,
          name: $(".friend-name").val(),
          city: 'San Jose',
          children: []
      });
      this.parentsList.add(friend);
      $('#addParent').modal('hide');
      localStorage.setItem("parents", JSON.stringify(this.parentsList.toJSON()));
    },

    initialize: function() {
      this.render();
    },
    
    render: function() {
      var self = this;
      this.parentsList = new ParentList();
      var parents = localStorage.getItem("parents");
      if(_.isEmpty(parents)){
        $.get("/api/parents", function(parents){
          processData(parents);
        });
      }
      else{
        processData(JSON.parse(parents));
      }

      function processData(parents){
        _.each(parents, function(parent){
          if(!self.currentChild){
            self.currentChild = parent.children[0];
            self.currentParent = parent;
          }
          self.parentsList.push(new Parent(parent));
        });
        new ParentListView({collection: self.parentsList});
        new ListContent({model: self.currentChild});
        localStorage.setItem("parents", JSON.stringify(self.parentsList.toJSON()));
        return self;
      }
    },

    validateUrl: function(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    },
});


var appView = new AppView({});

'use strict';

var Parent = Backbone.Model.extend({
    //urlRoot: '/api/parents',
    defaults : {
        id: "",
        name : '',
        city: '',
        children: []
    },
    idAttribute: "id",
    initialize: function () {
        console.log('Parent has been intialized');

        // Lets hook up some event handers to listen to model change
        this.on('change', function () {
            if(this.hasChanged('children')){
                console.log('children has been changed');
            }
        });

        this.on("invalid", function (model, error) {
            console.log("Invalid Parent params passed: " + error);
        });
    },
    constructor: function (attributes, options) {
        console.log('Parent\'s constructor had been called');
        Backbone.Model.apply(this, arguments);
    },
    validate: function (attr) {
        if (attr.id <= 0) {
            return "Invalid value for ID supplied.";
        }
    }
});

