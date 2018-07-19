/**
 * @license Longicorn v1.0.0
 * (c) 2016 Longicorn, Inc. http://longicorn.com
 * License: None
 */

 /**
 * Define start framework.
 */

 var db = null;

window.AppOfStart = angular.module('longi_start', ['ionic', 'ngCordova', 'longi_util']);

window.AppOfStart.controller('LoginCtrl', function($scope, $timeout, $http, $window, alertService, helperService) {

	$scope.Init = function() {
    	if (gDictVars.debugMode) console.log('window.AppOfStart >>> $scope.Init() >>> ');

		// Show progress bar.
		document.getElementById('spinner').style.visibility='visible';
	}

	// Declare scope variable(s).
	$scope.loginStatus = false;

	// Process login auth task.
	$scope.doLogin = function(sns_name) {
    switch(sns_name){
      case 'kakaotalk' :
          KakaoTalk.login(
              function (result) {
                console.log('Successful login!');
                location.href="main.html";
              },
              function (message) {
                console.log('Error logging in');
                console.log(message);
              }
          );
        break;
      case 'naver' :
        alertService.showAlert('네이버 로그인', "준비중입니다.");
        break;
      case 'facebook' :
        alertService.showAlert('페이스북 로그인', "준비중입니다.");
        break;
      case 'instagram' :
        alertService.showAlert('인스타그램 로그인', "준비중입니다.");
        break;
    }
		if (gDictVars.debugMode) console.log('$scope.doLogin >>> Login status >>> ' + sns_name);



		console.log('$scope.doLogin >>> Login end >>> ' + $scope.loginStatus);

  }   // $scope.doLogin = function(serial_no)

});

// Define ready
window.AppOfStart.run(function($ionicPlatform, $timeout, alertService, helperService) {

	var ver;

	var getVersionNumberFromApp = function(version){
		ver = version;
		helperService.getVersionNumberFromServer(getVersionNumberFromServer);
	}

	var getVersionNumberFromServer = function(version){
		if (gDictVars.debugMode) console.log('start.js >>> compare version >>> ' + ver + '___' + version);

		if ( (version != 'NA') && (version != ver) ){
			alertService.showAlertCallback('알림', '새로운 버전의 앱이 있습니다 <br> 업데이트 하세요.',
				function() {
					location.href = "main.html#/tab/swupdate";
				}
			);
		} else {
			// 자동로그인 선택
			if (gDictVars.debugMode) console.log('start.js >>> login_status >>> ' + localStorage.getItem('login_status'));

			if (localStorage.getItem('login_status') == '1'){
				if (localStorage.getItem('notice') == 'Y') { // 공지사항 표시
					location.href = "main.html#/tab/notice";
				} else {
					location.href="main.html";
				}
			}
		}
		// Hide progress bar.
		document.getElementById('spinner').style.visibility='hidden';
	}

	$ionicPlatform.ready(function() {

		if (gDictVars.debugMode) console.log('start.js >>> $ionicPlatform.ready(function() started ...');

		// Check version.
		//helperService.getVersionNumberFromApp(getVersionNumberFromApp);
		if (window.StatusBar) {
			StatusBar.hide();
		}
		if(window.cordova && window.cordova.plugins.Keyboard) {

			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

	});

});
