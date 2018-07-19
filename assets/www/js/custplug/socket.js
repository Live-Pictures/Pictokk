/**
 * @license allpay v1.0.0
 * (c) 2016 Allpay, Inc. http://allpay.com
 * License: None
 */

 /**
 * Define bluetooth custom javascript for custom plugin.
 */

// Check Camera status.
function sendCameraStatus(func)
{
    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendCameraStatus", []);
}

// Camera status.
function sendScanAction(func, dirId)
{

    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendScanAction", [dirId]);

}

// Send Image pi to server.
function sendImageServer(func)
{

    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendImageServer", []);

}

// Camera reboot.
function sendCameraReboot(func, data)
{
    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendCameraReboot", [data]);

}

// Camera image delete -> 3dscan folder
function sendCameraDelete(func, data)
{
    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendCameraDelete", [data]);
}

// Send Camera Option
function sendCameraOption(func, data)
{

    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "sendCameraOption", [data]);

}

// Software Update action.
function doSwUpdate(func, appName)
{
    cordova.exec(function(result) { func(result); }, function(error) { alert(error); }, "SocketManager", "doSwUpdate", [appName]);
}
