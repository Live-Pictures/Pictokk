cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-camera-with-exif.Camera",
        "file": "plugins/cordova-plugin-camera-with-exif/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera-with-exif",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera-with-exif.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera-with-exif/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera-with-exif",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera-with-exif.camera",
        "file": "plugins/cordova-plugin-camera-with-exif/www/Camera.js",
        "pluginId": "cordova-plugin-camera-with-exif",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera-with-exif.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera-with-exif/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera-with-exif",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-ghyeok-kakaotalk.KakaoTalk",
        "file": "plugins/cordova-plugin-ghyeok-kakaotalk/www/KakaoTalk.js",
        "pluginId": "cordova-plugin-ghyeok-kakaotalk",
        "clobbers": [
            "KakaoTalk"
        ]
    },
    {
        "id": "cordova-plugin-speechrecognition.SpeechRecognition",
        "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
        "pluginId": "cordova-plugin-speechrecognition",
        "merges": [
            "window.plugins.speechRecognition"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "es6-promise-plugin.Promise",
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "id": "cordova-plugin-screen-orientation.screenorientation",
        "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
        "pluginId": "cordova-plugin-screen-orientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "id": "cordova-plugin-canvas2image.Canvas2ImagePlugin",
        "file": "plugins/cordova-plugin-canvas2image/www/Canvas2ImagePlugin.js",
        "pluginId": "cordova-plugin-canvas2image",
        "clobbers": [
            "window.canvas2ImagePlugin"
        ]
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-camera-with-exif": "1.2.2",
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-ghyeok-kakaotalk": "1.0.0",
    "cordova-plugin-speechrecognition": "1.1.2",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.1",
    "cordova-plugin-whitelist": "1.3.1",
    "ionic-plugin-keyboard": "2.2.1",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.1",
    "cordova-plugin-canvas2image": "0.7.0",
    "cordova-plugin-x-socialsharing": "5.3.2",
    "cordova-sqlite-storage": "2.3.1"
};
// BOTTOM OF METADATA
});