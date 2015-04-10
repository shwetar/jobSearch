var Child = Backbone.Model.extend({
    defaults: {
      id:0,
      name : '',
      parentID:'',
      parent:[],
      friends:[],
      links:[]
    }
  });