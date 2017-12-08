var vows = require("vows"), assert = require('assert'), sys = require('sys');

var suite = vows.describe("mixin");

var mixin = require("../mixin");

function Base() {
  this.base_constructor = true;
  this.base_last = true;
}
Base.prototype = {
  base: true,
  pure_base: true,
}
Base.basef = function() {}

function Mixin() {
  this.mixin_constructor = true;
  this.pure_base = false;
  this.base_last = false;
}
Mixin.prototype = {
  mixed_in: true,
}
Object.defineProperty(Mixin.prototype, 'hidden', {
  enumerable: false,
  value: 'hidden'
});
Mixin.included = function(base) {
  base.prototype.pure_base = false;
}

suite.addBatch({
  'base constructor': {
    topic: function() {
      return mixin(Base, Mixin);
    },

    'retains base name' : function(base) {
      assert.equal(base.name, Base.name);
    },

    'retains base properties' : function(base) {
      assert.equal(base.basef, Base.basef);
      assert.equal(base.prototype.base, Base.prototype.base);
    },

    'adds mixin properties': function(base) {
      assert.equal(base.prototype.mixed_in, Mixin.prototype.mixed_in);
      assert.equal(base.included, Mixin.included);
    },

    'adds non-enumerable mixin properties': function(base) {
      assert.equal(base.prototype.hidden, Mixin.prototype.hidden);
    },

    'overrides base properties': function(base) {
      assert.isFalse(base.prototype.pure_base);
    },

    'remembers mixed in constructors': function(base) {
      assert.include(base.mixins, Base);
      assert.include(base.mixins, Mixin);
    },

    'when instantiated': {
      topic: function(base) {
        return new base();
      },

      'gets properties from base prototype': function(obj) {
        assert.equal(obj.base, Base.prototype.base);
      },

      'adds properties from mixin prototype': function(obj) {
        assert.equal(obj.mixed_in, Mixin.prototype.mixed_in);
      },

      'calls Base constructor': function(obj) {
        assert.isTrue(obj.base_constructor);
      },

      'calls Mixin constructor': function(obj) {
        assert.isTrue(obj.mixin_constructor);
      },

      'calls Base constructor last': function(obj) {
        assert.isTrue(obj.base_last);
      },

      'overrides pure_base': function(obj) {
        assert.isFalse(obj.pure_base);
      }
    },

    'when included twice': {
      topic: function(base) {
        return mixin(base, Mixin);
      },

      "doesn't include the second time": function(base) {
        assert.equal(this.context.topics[0], this.context.topics[1]);
      }
    }
  }
});

suite.export(module);