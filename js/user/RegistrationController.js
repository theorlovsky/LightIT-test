registerCtrl.$inject = ['$scope', 'User', 'userService'];

angular.module('user')
       .controller('registerCtrl', registerCtrl);

function registerCtrl($scope, User, userService) {
	$scope.register = function (form) {
		var username = $scope.user.username,
			password = $scope.user.password;

		if (username && password) {
			User.register(username, password).then(function (data) {
				if (data.success) {
					/* TODO: вынести в директиву */
					$.fancybox.close();
					$.fancybox.open({src: '#regSuccess'}, {
						touch: false,
						keyboard: false,
						focus: false,
						onComplete: function () {
							setTimeout(function () {$.fancybox.close();}, 3000);
						}
					});
				} else {
					$scope.errorMessage = data.message;
				}
				$scope.user = userService.reset(form);
			});
		}
	};

	$scope.onInput = function () {
		$scope.errorMessage = false;
	};
}