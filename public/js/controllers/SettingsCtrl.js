angular.module('SettingsCtrl', []).controller('SettingsController', function($scope, $rootScope, SettingsSrv) {

	 // --------------------------- APPLY USER'S VALUES --------------------------- //
	 // Retrieve user data
   applyUserInterfaceStyle($rootScope.userData);

	 $scope.customize = {
		  backgroundcolor:$rootScope.userData.apparences[0].backgroundcolor,
		  actionbarcolor:$rootScope.userData.apparences[0].actionbarcolor,
	   	edgeofpictures:$rootScope.userData.apparences[0].edgeofpictures
	 };

   $scope.privacy = capitalizeFirstLetter($rootScope.userData.settings[0].privacy);
   var switchPrivacy = document.getElementById('switch-privacy');
   switch($scope.privacy) {
      case 'Public':
        if (hasClass(switchPrivacy, 'is-checked'))
            switchPrivacy.classList.remove('is-checked');
            break;
      case 'Private':
        if (!hasClass(switchPrivacy, 'is-checked'))
            switchPrivacy.classList.add('is-checked');
            break;
   }

	 // --------------------------- FUNCTIONS --------------------------- // 
	 $scope.saveChanges = function() {
    	console.log('form values : ' + $scope.customize.backgroundcolor);
    	console.log('form values : ' + $scope.customize.actionbarcolor);
    	console.log('form values : ' + $scope.customize.edgeofpictures);
  	}

  	$scope.applyDefaultValues = function() {
  		console.log('apply default values.');
  	}

  	$scope.updateBackgroundColor = function() {
  		var color = $scope.customize.backgroundcolor;
  		if (isHexaColor(color)) {
  			// Apply background color if it's a valid hexa color
  			document.getElementById('mainView').style.background = color;
  		} else {
  			console.log('hexa color is not valid.');
  		}
  	}

    $scope.switchPrivacy = function() {
      // Change switch value
      var switchPrivacy = document.getElementById('switch-privacy');
      if (hasClass(switchPrivacy, 'is-checked'))
        switchPrivacy.classList.remove('is-checked');
      else
        switchPrivacy.classList.add('is-checked');

      // Change label value
      $scope.privacy = $scope.privacy == 'Private' ? 'Public' : 'Private';
    }
});