/**
 * @license Longicorn v1.0.0
 * (c) 2016 Longicorn, Inc. http://longicorn.com
 * License: None
 */

 /**
 * Define main framework.
 */

window.AppOfMain = angular.module('longi_main', ['ionic', 'ngCordova', 'ngDialog', 'ngSanitize', 'ngTouch','longi_util', 'plgn.ionic-segment' ]);

window.AppOfMain.config(function($stateProvider, $compileProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.icon('ion-chevron-left');
	$ionicConfigProvider.backButton.text('')

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|content|file|assets-library):|data:image/);

	// Contruct MVC of ISSUE
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'AppCtrl'
		})
		.state('app.camera', {
			url: '/camera',
			views: {
				'menuContent': {
					templateUrl: 'templates/camera.html',
					controller: 'cameraCtrl'
				}
			}
		})
		.state('app.textmic', {
			url: '/textmic',
			views: {
				'menuContent': {
					templateUrl: 'templates/textmic.html',
					//controller: 'PlaylistCtrl'
				}
			}
		})
		.state('app.gallery', {
			url: '/gallery',
			views: {
				'menuContent': {
					templateUrl: 'templates/gallery.html'
				}
			}
		});

	$urlRouterProvider.otherwise('/app/camera');

});

// If required HTML compiling ?
window.AppOfMain.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
    );
  };
}]);

// ---------------  Start App Controller ----------------------------------------
// Define controller of tabs
window.AppOfMain.controller('AppCtrl', function($rootScope, $scope, $timeout, $http, $ionicSideMenuDelegate, $ionicScrollDelegate, alertService, helperService) {

	$scope.goCamera = function() { location.href = "main.html#/app/camera"; }
	$scope.goTextmic = function() { location.href = "main.html#/app/textmic"; }
	$scope.goGallery = function() { location.href = "main.html#/app/gallery"; }

	$rootScope.getType = "camera";
	$rootScope.viewDepth = 1;

  $rootScope.cameraInit = function(){
      screen.orientation.lock('portrait').then(function success() {
        var largeImage = document.getElementById('viewPicture');
        largeImage.style.display = 'inline';
        largeImage.style.maxWidth = '100px';
        largeImage.src = "./img/camera.png";
        $timeout(function() {
          $rootScope.resultText = [];
          $rootScope.viewDepth = 1;
          $rootScope.base64Image = "";
        }, 100);
        gDictVars.currMode = "exit";
      }, function error(errMsg) {
         console.log("Error locking the orientation :: " + errMsg);
      });
  }

	$scope.logout = function(){
		localStorage.setItem('login_status', '0');
		alertService.showAlertCallback('알림', '로그아웃 되었습니다.',
			function(){
				location.href = "index.html";
			}
		);
	}
});
// ---------------  End App Controller ----------------------------------------


// ---------------  cameraCtrl Controller ----------------------------------------
window.AppOfMain.controller('cameraCtrl', function($rootScope, $scope, $cordovaCamera, $timeout, alertService, helperService, $compile) {
	angular.element(document).ready(function () {
		gDictVars.currMode = "exit";    // 메인화면으로 전환
		document.getElementById('spinner').style.visibility='visible';
		if (gDictVars.debugMode) console.log('main.js >>> PlaylistsCtrl >>> angular.element(document).ready(function () started ...');

		$scope.sizeArray = ["5px", "6px", "7px", "8px", "9px", "10px", "11px", "12px", "13px", "14px", "15px", "18px", "24px", "30px", "36px", "48px"];
		$scope.colorArray = ["ffffff", "7e7e7e", "000000", "2fe5e8", "6684fe", "8c60ff", "e161fe", "ff63ce", "ff6688", "e74e49", "f4744d", "ffcd62", "c8fe5e", "7dff5f", "3fff85", "41ffdb"];
		$scope.fontArray = [
			"'Nanum Gothic', sans-serif",
			"'Do Hyeon', sans-serif",
			"'Gugi', cursive",
			"'Nanum Myeongjo', serif",
			"'Black Han Sans', sans-serif",
			"'Nanum Gothic Coding', monospace",
			"'Cute Font', cursive",
			"'Gamja Flower', cursive",
			"'Nanum Pen Script', cursive",
			"'Gaegu', cursive",
			"'Nanum Brush Script', cursive",
			"'Jua', sans-serif",
			"'Gothic A1', sans-serif",
			"'Hi Melody', cursive",
			"'Black And White Picture', sans-serif",
			"'Stylish', sans-serif",
			"'Dokdo', cursive",
			"'East Sea Dokdo', cursive",
			"'Song Myung', serif",
			"'Sunflower', sans-serif",
			"'Yeon Sung', cursive",
			"'Kirang Haerang', cursive",
			"'Poor Story', cursive"
		];

		//$rootScope.resultText = [{name : "지후야 사랑해... 행복하게 살자...우리 지후는 효자야... 사랑해... 행복하게 살자..."}, {name : "지후야 사랑해... 행복하게 살자...지후야 사랑해... 행복하게 살자..."}, {name : "지후야 사랑해... 행복하게 살자..."}, {name : "지후야"}];

    $rootScope.resultText = [];

		$scope.originW = 0;
		$scope.originH = 0;

		$scope.editText = "";
		$scope.dragOn = 0;

		$scope.pageX = 0;
		$scope.pageY = 0;

		$scope.divX = 0;
		$scope.divY = 0;

		$scope.touchFist = 0;

    $scope.releaseFist = 0;

		$scope.textEditor = false;

		$scope.editProcess = 0;

		$scope.rotateVal = 0;

		if($rootScope.getType == "camera"){
		  $rootScope.getCamera();
		}else if($rootScope.getType == "album"){
		  $rootScope.getAlbum();
		}
	});

	var getCamera = function(){
		var options = {
			quality          : 100,
			destinationType  : Camera.DestinationType.FILE_URI,
			sourceType       : Camera.PictureSourceType.CAMERA,
			allowEdit        : false,
			encodingType     : Camera.EncodingType.JPEG,
			saveToPhotoAlbum : true,
			correctOrientation:true
		};
		navigator.camera.getPicture(function(result) {
			$scope.viewPictureCamera(result);
		}, function(err) {

		}, options);
	};

	$rootScope.getCamera = getCamera;

	var getAlbum = function(){
		var options = {
			quality          : 100,
			destinationType  : Camera.DestinationType.FILE_URI,
			sourceType       : Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit        : false,
			encodingType     : Camera.EncodingType.JPEG,
			saveToPhotoAlbum : false,
			correctOrientation:true
		};
		navigator.camera.getPicture(function(result) {
			$scope.viewPictureCamera(result);
		}, function(err) {

		}, options);
	};

	$rootScope.getAlbum = getAlbum;

	$scope.viewPictureCamera = function(result) {
		var thisResult = JSON.parse(result);
		var metadata = JSON.parse(thisResult.json_metadata);
		//console.log(thisResult.filename);

    // metadata.orientation >> 1 : 가로 홈버튼 오른쪽, 3 : 가로 홈버튼 왼쪽, 6 : 세로 정상, 8 : 세로 꺼꾸로

    if(metadata.orientation == 1 || metadata.orientation == 3){ // 가로 홈버튼 왼쪽
			screen.orientation.lock('landscape').then(function success() {}, function error(errMsg) {});
		}else if(metadata.orientation == 6 || metadata.orientation == 8){ // 세로 정상
		  screen.orientation.lock('portrait').then(function success() {}, function error(errMsg) {});
		}

		$scope.rotateVal = metadata.orientation;

		$rootScope.base64Image = thisResult.filename;

		var largeImage = document.getElementById('viewPicture');
		largeImage.style.display = 'block';
		largeImage.style.maxWidth = '100%';
		largeImage.src = thisResult.filename;
		$timeout(function() {
			$scope.changeValue(2, "camera");
		}, 100);
	}

	$scope.changeValue = function(depth, exitVal) {
		$rootScope.viewDepth = depth;
		gDictVars.currMode = exitVal;
	}

	$rootScope.speechToText = function() {
		var settings = {
			language: "ko-KR",
			showPopup: true
		};

		window.plugins.speechRecognition.startListening(function(result) {
			$timeout(function() {
				$rootScope.viewDepth = 2;
				for(ii = 0; ii < result.length - 1; ii++){
					var rstInfo = new Object();
					rstInfo.name = result[ii];
					rstInfo.value = result[ii];
					$rootScope.resultText.push(rstInfo);
				}
				var last_int = result.length - 1;
				console.log(JSON.stringify(result.length));
				console.log(JSON.stringify(result[last_int]));
				//console.log(JSON.stringify($rootScope.resultText));
			}, 100);
		}, function(err) {
			console.log(result);
		}, settings);
	}

	$rootScope.speechToStart = function() {
		window.plugins.speechRecognition.isRecognitionAvailable(
			function(){
				window.plugins.speechRecognition.hasPermission(
					function(isGranted){
						if(isGranted){
							$rootScope.speechToText();
						}else{
							window.plugins.speechRecognition.requestPermission(function (){
								$rootScope.speechToText();
							}, function (err){
								console.log(err);
							});
						}
					},
					function(err){
						console.log(err);
					}
				);
			},
			function(){
				console.log("Somethign went wrong.");
			}
		);
	}

	$scope.selectText = function(index)  {
		$scope.editText = $rootScope.resultText[index].name;
		$timeout(function() {
			var element = document.getElementById("editTextBox");
			var pageX = (window.screen.width - element.offsetWidth) / 2;
			var pageY = (window.screen.height - element.offsetHeight) / 2;

			$scope.draggedStyle = {
			  "transform": "translate(" + pageX + "px, " + pageY + "px)",
			  "-webkit-transform": "translate(" + pageX + "px, " + pageY + "px)"
			};

			$scope.divX = pageX;
			$scope.divY = pageY;
			$scope.changeValue(3, "camera");
		}, 1);
	}

    $scope.onTap = function(event){
		//console.log("onTap / " + event.target.className);
    }


    $scope.onTouch = function(event){
      $scope.pageX = event.gesture.center.pageX;
      $scope.pageY = event.gesture.center.pageY;

      var moveY = $scope.divY - ($scope.pageY - event.gesture.center.pageY);

      //console.log("onTouch >> pageY : " + $scope.pageY + " / eventY : " + event.gesture.center.pageY + " / divY : " + $scope.divY + " / moveY : " + moveY);

      var element = document.getElementById("editTextBox");

      element.style.border='1px solid #fff';

      if($scope.touchFist == 0){
        element.setAttribute('on-drag', 'onDrag($event)');
        $compile(element)($scope);
        $scope.touchFist = 1;
      }
      $scope.dragOn = 1;
      $scope.releaseFist = 0;

    }

    $scope.onTouchOut = function(event){
      //console.log("onTouchOut");

      var element = document.getElementById("editTextBox");

      element.style.border='1px solid rgba(255, 255, 255, 0)';

      $scope.dragOn = 0;

      element.removeAttribute('on-drag', 'onDrag($event)');
      $compile(element)($scope);

      $scope.textEditor = false;
      document.getElementById("editTextBg").style.background="transparent";
      document.getElementById("editTextBox").style.width= "auto";

      }

      $scope.onDrag = function(event)  {

      var winX = window.screen.width / 2;
      var winY = window.screen.height / 2;

      var moveX = $scope.divX - ($scope.pageX - event.gesture.center.pageX);
      var moveY = $scope.divY - ($scope.pageY - event.gesture.center.pageY);

          //console.log('Reporting : drag');


      if($scope.dragOn == 1){
        //console.log("onDrag >> pageY : " + $scope.pageY + " / eventY : " + event.gesture.center.pageY + " / divY : " + $scope.divY + " / moveY : " + moveY);
        $scope.doshadow = event.target.id.substr(8, 1);
        $scope.draggedStyle = {
          "transform": "translate(" + moveX + "px, " + moveY + "px)",
          "-webkit-transform": "translate(" + moveX + "px, " + moveY + "px)"
        };

        if(winY < moveY){
          document.getElementById("editorBox").style.bottom = "initial";
          document.getElementById("editorBox").style.top = 0;
        }else{
          document.getElementById("editorBox").style.top = "initial";
          document.getElementById("editorBox").style.bottom = 0;
        }

        //if($scope.rotateVal == 3 || $scope.rotateVal == 6){
        //}else if($scope.rotateVal == 3 || $scope.rotateVal == 6){
        //}

      }
    }

    $scope.onRelease = function(event)  {
      if($scope.releaseFist == 0){
        var pageX = $scope.divX - ($scope.pageX - event.gesture.center.pageX);
        var pageY = $scope.divY - ($scope.pageY - event.gesture.center.pageY);


        $scope.divX = pageX;
        $scope.divY = pageY;

        //console.log("onRelease >> pageY : " + $scope.pageY + " / eventY : " + event.gesture.center.pageY + " / divY : " + $scope.divY + " / moveY : " + pageY);

        var element = document.getElementById("editTextBox");
        element.removeAttribute('on-drag', 'onDrag($event)');
        $scope.releaseFist++;
        $scope.dragOn = 0;
      }
    }

	$scope.onDoubleTap = function(event)  {

		var element = document.getElementById("editTextBox");
		console.log(element.offsetWidth + " / " + element.offsetHeight);
		document.getElementById("editTextBox").style.width= "100%";

		document.getElementById("editTextBg").style.background="rgba(0, 0, 0, 0.5)";
		$scope.textEditor = true;

		var textarea = document.querySelector('textarea');
		textarea.addEventListener('keydown', autosize);

		autosize();
		function autosize(){
		  var el = document.getElementById("textEditorArea");
		  setTimeout(function(){
        el.style.cssText = 'height:auto; padding:0';
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
		  },0);
		}

		document.getElementById("textEditorArea").focus();
		$scope.editProcess = 0;
	}

	$scope.choiceProcess = function(value)  {
		$scope.editProcess = value;
	}

	$scope.changeFont = function(key, index)  {
		if(key == "color"){
			var color = $scope.colorArray[index];
			document.getElementById("textEditorView").style.color = "#"+color;
			document.getElementById("textEditorArea").style.color = "#"+color;
		}else if(key == "font"){
			var font = $scope.fontArray[index];
			document.getElementById("textEditorView").style.fontFamily = font;
			document.getElementById("textEditorArea").style.fontFamily = font;
		}else if(key == "size"){
			var size = $scope.sizeArray[index];
			document.getElementById("textEditorView").style.fontSize = size;
			document.getElementById("textEditorArea").style.fontSize = size;
		}
	}

	$scope.saveProcess = function(){
		    html2canvas(document.getElementById('camera'), {
            onrendered: function(canvas) {
                canvas.id = "creatCanvas";
                document.body.appendChild(canvas);

                window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function(msg){
                            console.log(JSON.stringify(msg));
                            //doMMS(function(result) {}, msg);
                        },
                        function(err){
                            console.log(err);
                        },
                        document.getElementById('creatCanvas')
                    );
                //document.getElementById('myCanvas').append(canvas);
                // Clean up
                document.body.removeChild(canvas);
            }
        });
  }

	$scope.saveProcess2 = function(){
		var canvas = document.createElement('canvas');
		canvas.id = "creatCanvas";

		var img = new Image();
		img.onload = function () {
			canvas.width = 300;
			canvas.height = 300;
		}
		img.src = $rootScope.base64Image;

    canvas.width = 300;
    canvas.height = 300;

		document.body.appendChild(canvas);

		var canvasBox = document.getElementById('creatCanvas');
		var imgsrc = document.createElement('img');
    imgsrc.id = "originImag";
    imgsrc.src = $rootScope.base64Image;
		canvasBox.appendChild(imgsrc);
		setTimeout(function(){
		  document.getElementById('originImag').src = "file:///storage/emulated/0/Android/data/com.pictokk.pic/cache/1524444604034.jpg";
    }, 300);
		//var context = canvas.getContext('2d');

    console.log(canvas.width + " / " + canvas.height + " / " + document.getElementById('originImag'));


	}


	$scope.saveProcess2 = function(){
		html2canvas(document.getElementById('creatImg'), {
            onrendered: function(canvas) {
                canvas.id = "creatCanvas";
                document.body.appendChild(canvas);

				/*
                window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function(msg){
							              console.log(msg);
                            //doMMS(function(result) {}, msg);
                        },
                        function(err){
                            console.log(err);
                        },
                        document.getElementById('creatImg')
                    );
                //document.getElementById('myCanvas').append(canvas);
                // Clean up

               document.body.removeChild('creatImg');
			   */
            }
       });
	}

});
// ---------------  End cameraCtrl Controller ----------------------------------------


// ---------------  PlaylistCtrl Controller ----------------------------------------
window.AppOfMain.controller('PlaylistCtrl', function($scope) {
	angular.element(document).ready(function () {
		gDictVars.currMode = "exit";    // 메인화면으로 전환
		document.getElementById('spinner').style.visibility='visible';
		if (gDictVars.debugMode) console.log('main.js >>> CameraCtrl >>> angular.element(document).ready(function () started ...');
	});
});
// ---------------  End PlaylistCtrl Controller ----------------------------------------

