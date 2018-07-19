/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.pictokk.pic;

import android.bluetooth.BluetoothAdapter;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.engine.SystemWebViewEngine;

public class MainActivity extends CordovaActivity {
  private BluetoothAdapter mBluetoothAdapter = null;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    super.init();

    WebView webView = (WebView) this.appView.getEngine().getView();
    webView.clearCache(true);
    webView.getSettings().setCacheMode( WebSettings.LOAD_NO_CACHE);
    loadUrl(this.launchUrl);
  }
}
