'use strict';

describe('users-controller module', function() {

    beforeEach(module('users-controller'));

    describe('UsersController', function(){

        it('should be defined', inject(function($controller) {
            var controller = $controller('UsersController');
            expect(controller).toBeDefined();
        }));

    });
});