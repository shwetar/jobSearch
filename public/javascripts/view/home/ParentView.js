'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({
    tagName:  'li',
    template: require('../../templates/parents-list.html'),

    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({item: this.model}));
        return this;
    }
});