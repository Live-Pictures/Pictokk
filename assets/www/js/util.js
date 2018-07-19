/**
 * @license Longicorn v1.0.0
 * (c) 2016 Longicorn, Inc. http://longicorn.com
 * License: None
 */

 /**
 * Define utility function(s).
 */

(function() {

	// Create module.
	window.AppOfUtil = angular.module('longi_util', ['ionic', 'ngCordova']);

	// Register alert service.
	window.AppOfUtil.service('alertService', function($ionicPopup, $ionicLoading, $timeout) {

		// Alert.
		this.showAlert = function(title, message) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message,
				okText: '확인'
			});

			alertPopup.then(function(res) {
				if (gDictVars.debugMode) console.log('>>> showAlert message fired ');
			});
		}

		// Alert.
		this.showAlertCallback = function(title, message, callback) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message,
				okText: '확인'
			});

			alertPopup.then(function(res) {
				if (gDictVars.debugMode) console.log('>>> showAlert message fired ');
				callback();
			});
		}

		// Confirm.
		this.showConfirm = function(title, message, callBack, arg) {

			var confirmPopup = $ionicPopup.confirm({
				title: title,
				template: message,
				cancelText: '아니오',
				okText: '예'
			});

			confirmPopup.then(function(res) {

				if (gDictVars.debugMode) console.log('>>> showConfirm res >>>' + res);   // true, false
				if (res) callBack(arg);
			});

		}

		// Exit App
		this.exitApp = function(retCode) {
		  console.log("exitApp");

			//commonPlayAudio('resource/exit.wav');
			$timeout( function() {
				navigator.app.exitApp();
			}, 1000);

		}

	});

	// Register helper service.
	window.AppOfUtil.service('helperService', function($window, $cordovaPreferences, $cordovaAppVersion, $http, alertService, $q) {

		// Store preference key/value.
		this.prefStore = function(key, value) {
			console.log('helperService >>> store func invoked >>>' + key + '>>>' + value);
			var prefs = $window.plugins.appPreferences;
			prefs.store( function(value) {
				console.log('helperService >>> store func Success >>>' + value);
			}, function(error) {
				console.log('helperService >>> store func Error >>>' + error);
			}, key, value);
		}

		// Get preference value from given key.
		this.prefFetch = function(key) {
			console.log('helperService >>> fetch func invoked >>>' + key);

			var prefs = $window.plugins.appPreferences;
			prefs.fetch( function(value) {
				if (key == 'shop_id') {
					window.gPrefDict["shop_id"] = value;
				}

				if (key == 'login_status') {
					if ( value == true) location.href="main.html";
				}

				console.log('helperService >>> fetch func Success >>>' + key + ' <<<>>> ' + value);
			}, function(error) {
				console.log('helperService >>> fetch func Error >>>' + error);
			}, key);
		}

		// Get preference value from given key with callback.
		this.prefFetchCallback = function(key, func) {

			if (gDictVars.debugMode) console.log('helperService >>> prefFetchCallback func invoked >>>' + key);

			var prefs = $window.plugins.appPreferences;
			prefs.fetch( function(value) {
				if (key == 'shop_acctno') {
					if (value != null) func(value);
					else func('');
				} else if (key == 'shop_id') {
					window.gPrefDict["shop_id"] = value;
					func('');
				} else {
					func('');
				}
			}, function(error) {
				console.log('helperService >>> prefFetchCallback >>>' + error);
			}, key);
		}

		// Get shorten URL using bit.ly api service.
		this.getShortenURL = function(url, func) {

			var defaults = {
				login: 'frog600',
				apiKey: 'R_5f0d1d2650a6434d80920d45aec9fe6a',
				longUrl: encodeURI(url)
			};

			var daurl = "http://api.bit.ly/v3/shorten?" +
						"&longUrl=" +
						defaults.longUrl +
						"&login=" +
						defaults.login +
						"&apiKey=" +
						defaults.apiKey +
						"&format=json";

			var req = {
				method: 'GET',
				url: daurl
			}

			$http(req).success(function(data, status, headers, config){
				func(data.data.url);     // Shortened url
			}).error(function(data, status, headers, config){
				func('error');     // error
			});
		}

		this.getWiFiIPAddress = function(callback) {
			$window.plugins.networkInterface.getWiFiIPAddress().then(function (ip) {
				callback(version);
			});
		}


		this.checkVersion = function(shopId, procDate, payCancel) {
			helperService.getVersionNumberFromApp(getVersionNumberFromApp);

			var ver;

			var getVersionNumberFromApp = function(version){
				console.log('app_version');
			}
		}

		// Get app version number from App (0.0.1).
		this.getVersionNumberFromApp = function(callback) {
			$cordovaAppVersion.getVersionNumber().then(function (version) {
				callback(version);
			});
		}

		// Get app version number from Server (0.0.1).
		this.getVersionNumberFromServer = function(callback) {

			myobject = { param01: gDictVars.appID };         // "allpay";
			Object.toparams = function ObjecttoParams(obj){
				var p = [];
				for (var key in obj){
					p.push(key + '=' + encodeURIComponent(obj[key]));
				}
				return p.join('&');
			};

			var req = {
				method: 'POST',
				crossDomain: true,
				url: gDictVars.serverURL + "app_version.php",
				data: Object.toparams(myobject),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}

			$http(req).success(function(data, status, headers, config){
				if (data.length == 1){
					localStorage.setItem('notice', data[0].col02);   // 'Y' : 공지사항
					callback(data[0].col01);    // 버전정보
				} else {
					callback('NA');
				}
			}).error(function(data, status, headers, config){
				alertService.showAlert('알림', '서버와의 접속을 확인하세요...');
				callback('NA');
			});
		}

		var people = [];

		// Get Images Load Status.
		this.isImage = function(url, callback) {
			var deferred = $q.defer();


			var image = new Image();
			image.onerror = function() {

				deferred.reject({ status : false, imgUrl : "./img/cubic.jpg" });
				people.push({skills : 1});
				test1 = 1;
			};
			image.onload = function() {
				deferred.resolve({ status : true, imgUrl : image.src });
				people.push({skills : 2});
				test1 = 2;
			};

			//people.push({skills : 1});
			var test1;

			image.src = url;

			callback(people);
		}

		// Get Images Load Status.
		this.isImage2 = function(camid, url) {
			var deferred = $q.defer();
			var camImg = new Object();

			var image = new Image();

			image.onerror = function() {
				deferred.resolve({ camId : image.camid, status : false, imgUrl : "./img/cubic.jpg" });
			};
			image.onload = function() {
				deferred.resolve({ camId : image.camid, status : true, imgUrl : image.src });
			};


			image.camid = camid;
			image.src = url;

			return deferred.promise;
		}

	});


	window.AppOfUtil.run(function($ionicPlatform, $rootScope, alertService) {

		$ionicPlatform.ready(function() {

			if (gDictVars.debugMode) console.log('util.js >>> $ionicPlatform.ready(function() started ...');

			// Setting current platform.
			if (ionic.Platform.isAndroid()) gPlatformID = 1;       // ANDROID
			else if (ionic.Platform.isIOS()) gPlatformID = 2;       // IOS
			else gPlatformID = 0;      // ETC

			$ionicPlatform.registerBackButtonAction(function() {
				if (gDictVars.debugMode)console.log('util.js >>> gDictVars.currMode >>> ' + gDictVars.currMode);

				if (gDictVars.currMode == "exit"){
					alertService.showConfirm('알림', '프로그램을 종료하시겠습니까 ?', alertService.exitApp, 1);
				}else if (gDictVars.currMode == "camera"){
					$rootScope.cameraInit();
				}else if (gDictVars.currMode == "hide"){
					$scope.modal.hide();
				}else {
					location.href="main.html#/tab/issue";
				}
			}, 100);
		});
	});
})();
