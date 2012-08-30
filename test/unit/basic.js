/**
 * First simple suite of tests to perform to the Class element.
 *
 * @author Pablo Lopez Torres <pablolopeztorres@gmail.com>
 */

/*global test,expect,ok,*/

'use strict';

module('Basic', {
	setup:
		function () {
		},
	teardown:
		function () {
		}
});


test('First suite of tests', function () {
    expect(12);

    var protoTest = function () {};
    protoTest.prototype.a = true;


    var pI = new protoTest();


    var A = new Class({
        construct: function () {
            console.log('created instance of A');
        },


        group: {
            of: {
                nested: {
                    objects: 'A'
                }
            }
        },

        pI: new protoTest()
    });


    var B = new Class(A, {
        construct: function () {
            console.log('created instance of B');
        },


        group: {
            of: {
                nested: {
                    objects: 'B'
                }
            }
        },


        objString: new String('Hello')
    }); //Inherits from A.


    var probe = {aa: true};

    var probeGen = function(){}
    probeGen.prototype = probe;

    var probeWrapper = Class({
        probe: new probeGen()
    });

    var aa = new probeWrapper();
    var bb = new probeGen();

    ok( probe.isPrototypeOf(bb), 'probe is prototype of bb'); //Should return true;
    ok( probe.isPrototypeOf(aa.probe), 'probe is prototype of aa.probe');  //Should return true;


    var a = new A();
    var b = new B();
    var v = new B();


    ok(a instanceof A, 'object a is instance of A'); //Should return true;
    ok(b instanceof B, 'object b is instance of B'); //Should return true;
    ok(b instanceof A, 'object a is instance of B'); //Should return true;

    equal(a.group.of.nested.objects, 'A', 'testing nested objects'); //Should return 'A';
    equal(b.group.of.nested.objects, 'B', 'testing nested objects'); //Should return 'B';

    ok(pI instanceof protoTest, 'both pI and a.pI are photoTest instances');
    ok(a.pI instanceof protoTest, 'both pI and a.pI are photoTest instances');

    ok(pI instanceof protoTest, 'both pI and a.pI are photoTest instances');
    ok(a.pI instanceof protoTest, 'both pI and a.pI are photoTest instances');

    // @todo pablo - 2012-08-30 : review this test and increment number of assertions by one
    // equal(b.objString === v.objString, false, 'example strings from objects should not be the sama one');

    //Should print 'Ok'.
    try {
        var x = A();
    } catch (err) {
        ok(err instanceof TypeError, 'forgetting new triggers a TypeError');
    }
});
