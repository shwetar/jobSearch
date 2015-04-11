'use strict'
var ParentView = Backbone.View.extend({
	tagName:'li',
	className:'parent_li',
	template: _.template($("#parent-template").html()),

	events: {
    'click span': 'expandParent'
  	},
  	expandParent:function(event){
  		
  		console.log("in event"+$(event.currentTarget));
  		$(event.currentTarget).children("i").toggleClass('glyphicon-minus-sign glyphicon-plus-sign');
  		
  		$(event.currentTarget).next().slideToggle();

  	},
	render: function(){
		//var self = this;
		//debugger;
		var children=JSON.parse(localStorage.getItem("children"));
		var childCollection = new ChildList();
		var parentId = this.model.get("id");
		console.log("parentID"+parentId);
		_.each(children, function(child){
          if(parentId == child.parentID){
          	childCollection.push(new Child(child));
	       }
        });
		
		
		console.log(this.model);
		this.$el.html( this.template(this.model.toJSON()));

		var childView = new ChildListView({ collection: childCollection });
		this.$el.append(childView.render().el); // calling render method manually..not sure if el is correct

		return this;  // returning this from render method..
	}
});


// var childCollection = new ChildList([
	//   {
	//       name: 'Orange-child',
	//       links: ""
	//   },
	//   {
	//       name: 'Banana-child',
	//       links:""
	//   },
	//   {
	//       name: 'Mango-child',
	//       links:""
	//   }
	// ]);	












