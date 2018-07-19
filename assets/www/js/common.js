/**
 * @license Longicorn v1.0.0
 * (c) 2016 Longicorn, Inc. http://longicorn.com
 * License: None
 */

 /**
 * Define common function(s).
 */

 /**
 * Play audio file.
 * input : src (audio file to play)
 */
 function commonPlayAudio(src) {

  // Create Media object from src
  var media = null;

  var path = window.location.pathname;
  var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

  if (gPlatformID == 1)     // ANDROID
  {
    src = 'file://' + phoneGapPath + src;
    media = new Media(src,
             function () {
                         console.log("playAudio():Audio Success");
                     },
              function (err) {
                          console.log("playAudio():Audio Error: " + err);
                      }
              );
  }

  // Play audio
  media.play();

 }

 /**
 * Set html element value.
 * input : tag (id tag), value (set value)
 */
function commonSetValue(tag, value)
{

//alert(tag + '<<<>>>>' + value);

    var s = document.getElementById(tag);
    s.value = value;

}

 /**
 * Get html element value.
 * input : tag (id tag)
 */
function commonGetValue(tag)
{

    var s = document.getElementById(tag);
    return s.value;

}

 /**
 * Encoding data.
 * input : plain source string
 */
 function encodeDataString(str)
 {

      // Encoding.
      var retStr = str.split("").reverse().join("");
      retStr = '|' + retStr + ' ';
      retStr = Base64.encode(retStr);

      return retStr;

 }

 /**
  * Decoding data.
  * input : encoded source string
  */
  function decodeDataString(str)
  {

      if (str.length < 1) return "";

      var retStr = Base64.decode(str);
      retStr = retStr.substring(1, (retStr.length -1));
      retStr = retStr.split("").reverse().join("");

      return retStr;
  }

  var Base64 = {

  	// private property
  	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  	// public method for encoding
  	encode : function (input) {
  		var output = "";
  		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  		var i = 0;

  		while (i < input.length) {

  		  chr1 = input.charCodeAt(i++);
  		  chr2 = input.charCodeAt(i++);
  		  chr3 = input.charCodeAt(i++);

  		  enc1 = chr1 >> 2;
  		  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
  		  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
  		  enc4 = chr3 & 63;

  		  if (isNaN(chr2)) {
  			  enc3 = enc4 = 64;
  		  } else if (isNaN(chr3)) {
  			  enc4 = 64;
  		  }

  		  output = output +
  			  this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
  			  this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

  		}

  		return output;
  	},

  	// public method for decoding
  	decode : function (input)
  	{
  	    var output = "";
  	    var chr1, chr2, chr3;
  	    var enc1, enc2, enc3, enc4;
  	    var i = 0;

  	    input = input.replace(/[^A-Za-z0-9+/=]/g, "");

  	    while (i < input.length)
  	    {
  	        enc1 = this._keyStr.indexOf(input.charAt(i++));
  	        enc2 = this._keyStr.indexOf(input.charAt(i++));
  	        enc3 = this._keyStr.indexOf(input.charAt(i++));
  	        enc4 = this._keyStr.indexOf(input.charAt(i++));

  	        chr1 = (enc1 << 2) | (enc2 >> 4);
  	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
  	        chr3 = ((enc3 & 3) << 6) | enc4;

  	        output = output + String.fromCharCode(chr1);

  	        if (enc3 != 64) {
  	            output = output + String.fromCharCode(chr2);
  	        }
  	        if (enc4 != 64) {
  	            output = output + String.fromCharCode(chr3);
  	        }
  	    }

  	    return output;
  	}
  }

/**
 * Create uuid data.
 * input : None
 */
 function createUUIDString()
 {

      // UUID Gem.
      function s4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

 }
