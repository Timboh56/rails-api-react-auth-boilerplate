# Mixin.js

Mixin is an easy way to repeatedly mix functionality into a prototypical
JavaScript class. It automatically takes care of the combination of overriding
prototype methods and invoking constructors. Moreover, it will notify a mixed
in constructor that is has been mixed into another class. This can be used to
construct dependent mixin hierarchies.

## Installation

Using npm:

    npm install mixin

## Usage:


    var mixin = require("mixin");

    function Foo() {
    }

    Foo.prototype = {
       t1: function() { return 't1'; }
    };

    Foo = mixin(Foo, EventEmitter);

this is the equivalent of:

    function Foo() {
        EventEmitter.call(this);
    }

    Foo.prototype = Object.create(EventEmitter.prototype);

except that I can define a full set of prototypes in the `Foo.prototype`
statement before I invoke the mixin.

# Usage

## mixin(base, mixed)

The call `mixin(base, mixed)` returns a new constructor that adds the
prototype for `mixed` at the back of the prototype chain for `base` and
invokes the constructors for both `base` and `mixed` in reverse order. If
`mixed` has function property `included`, then this function will be invoked
with `this = mixed` and the new constructor class as the single argument.

A constructor to be mixed in cannot have a prototype chain of its own
(i.e. it can't itself be the product of a mixin), however this functionality
can be achieved by calling mixin again inside the `included` callback.
Moreover, the same constructor can not be mixed in twice to the same
prototypical inheritance chain.

## ctor.included(base)

If `ctor` is mixed in to another constructor (e.g. by invoking `mixin(Base, ctor)`) then `ctor.included(base)` is called with the `this` set to the mixed in constructor (e.g. `ctor`) and is passed a single argument, the new constructor created by `mixin()`.  This is extremely useful for creating dependent chains of mixins (i.e. `Mixin1` requires `Mixin2`) since `mixin` itself can be invoked from within the `included` call.

If `included` returns a value, then it is used as the constructor for the call to `mixin` that invoked this function.  This behavior leads to the useful idiom:

    Foo.included = function(ctor) {
        return mixin(ctor, EventEmitter);
    }

to mix the functionality of EventEmitter into any constructor that mixes in `Foo`.

## mixin.alias(obj, name, suffix, fun)

Can be used to override a method already defined on `obj`. It assigns `fun` to
`obj[name+'_with_"+suffix]` and reassigns the current value of `obj[name]` to
`obj[name+'_without_'+suffix]`. Finally it sets `obj[name]` to `fun`.  This is
similar to Rails' 'alias_method_chain`.
