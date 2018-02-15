/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested initialization place for your code.
// It is completely optional and not required.
// It implements a Cordova "hide splashscreen" function, that may be useful.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...



// Set to "true" if you want the console.log messages to appear.

app.LOG = app.LOG || false ;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;



// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

//...overly simple example...
//    var el, evt ;
//
//    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
//        evt = "click" ;                                             // let touch become a click event
//    else                                                            // else, assume touch events available
//        evt = "touchend" ;                                          // not optimum, but works
//
//    el = document.getElementById("id_btnHello") ;
//    el.addEventListener(evt, myEventHandler, false) ;

    // NOTE: ...you can put other miscellaneous init stuff in this function...
    // NOTE: ...and add whatever else you want to do now that the app has started...
    // NOTE: ...or create your own init handlers outside of this file that trigger off the "app.Ready" event...

    app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
    if (device.platform == 'Android') {
      $("input[ctype='number']").each(function (index) {
        $(this).attr("type", "number");
      });
    }
    if (window._onload)
      window._onload();
} ;
document.addEventListener("app.Ready", app.initEvents, false) ;



// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch() ;

    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;
/* #################################################################################### */
function Mensagem(p_texto)
{
  navigator.notification.alert(p_texto, null, "ATENÇÃO", "OK");
}
/* #################################################################################### */
var BUTTON_YES = 1;
var BUTTON_NO = 2;

window.BUTTON_YES = 1;
window.BUTTON_NO = 2;
/**
 * @param {string} p_mensagem Message for user
 * @param {object} p_method Function to callback
 */
function YesNo(p_mensagem, p_method)
{
  navigator.notification.confirm(p_mensagem, p_method, 'Atenção', ['Sim', 'Não']);
}
/* #################################################################################### */
/**
 * @param {string} p_mensagem Message for user
 * @param {object} p_method Function to callback
 */
function ConfirmOk(p_mensagem, p_method)
{
  navigator.notification.confirm(p_mensagem, p_method, 'Atenção', ['Ok']);
}
/* #################################################################################### */
function AjaxAspNetWs(p_link, p_data, p_success, p_error, p_showwaiting) {
  $.ajax({
    url: p_link,
    data: JSON.stringify(p_data),
    dataType: "json",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    timeout: 40000,
    dataFilter: function (data) {
      return data;
    },
    beforeSend: function( jqXHR, settings ){
      //Mensagem("ajax beforeSend");
    },
    complete: function( jqXHR, textStatus ){
      //Mensagem("ajax complete ");
    },
    success: function (data, textStatus, jqXHR) {
      //Mensagem("ajax success");
      p_success(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //Mensagem("ajax error");
      var p_data = [];
      p_data.d = "Ajax error: [" + jqXHR.status + "][" + jqXHR.statusText + "]";
      Mensagem(p_data.d);
      p_success(p_data);
    } 
  });
  
}
/* #################################################################################### */
function ContainerWaiting(p_container) {
  if (typeof (p_container) == "object")
    p_container.Html('<img id="ajax-waiting" src="imagens/ajax-waiting.gif" />');
  else
  {
    $("#" + p_container).html("");
    $("#" + p_container).prepend('<img id="ajax-waiting" src="imagens/ajax-waiting.gif" />');
  }
}
/* #################################################################################### */
function ContainerClear(p_container)
{
  $("#" + p_container).html("");
}
/* #################################################################################### */
function ContainerWait(p_container)
{
  $("#" + p_container).html("");
  $("#" + p_container).prepend('<div class="cssload-container"><div class="cssload-loading"></div></div>');
}
/* #################################################################################### */
function ContainerWaitLg(p_container)
{
  $("#" + p_container).html("");
  $("#" + p_container).prepend('<img id="ajax-waiting" src="imagens/ajax-waiting-lg.gif" />');
}
/* #################################################################################### */
function DateToStr(p_date) {
  var v_day = p_date.getDate();
  if (v_day < 10)
    v_day = '0' + v_day;
  var v_month = (p_date.getMonth() + 1);
  if (v_month < 10)
    v_month = '0' + v_month;
  return v_day + "/" + v_month + "/" + p_date.getFullYear();
}
/* ################################################################################################### */
window.TextControl = window.TextControl || {};
window.TextControl = function (p_controlid)
{
  this.Id = p_controlid;
  this.Obj = $("#" + p_controlid);
  this.Clear = function () {
    this.Obj.val('');
  };
  this.Val = function ()
  {
    return this.Obj.val();
  };
  this.Text = function ()
  {
    if ((this.Obj.val() === null) || (!this.Obj.val()))
      return '';
    else
      return this.Obj.val();
  };
  this.TextSet = function (p_text)
  {
    if (p_text !== null)
    {
      this.Obj.val(p_text);
    }
    ;
  };
  this.ToInt = function ()
  {
    var v_text = this.Obj.val();
    if ((!v_text) || (v_text === null) || (v_text.length <= 0))
      return 0;
    else
      return parseInt(v_text);
  };
  this.ToFloat = function ()
  {
    var v_text = this.Obj.val();
    if ((!v_text) || (v_text === null) || (v_text.length <= 0))
      return 0;
    else
    {
      var v_ret = new Double(v_text);
      return v_ret.Value;
    }
  };
  this.ToDate = function ()
  {
    var v_text = this.Obj.val();
    if ((!v_text) || (v_text === null) || (v_text.length <= 0))
      return '';
    else
    {
      return v_text.substr(8, 2) + "/" + v_text.substr(5, 2) + "/" + v_text.substr(0, 4);
    }
  };
  this.Length = function () {
    return this.Obj.val().length;
  };
  this.Focus = function () {
    this.Obj.focus();
  };
  this.ReadOnly = function (p_readonly)
  {
    if (typeof (p_readonly) == 'boolean')
    {
      if (p_readonly)
        this.Obj.attr('readonly', 'readonly');
      else
        this.Obj.removeAttr('readonly');
    }
    return (this.Obj.attr('readonly') == 'readonly');
  };
  return this;
}
/* #################################################################################### */
window.ButtonControl = window.ButtonControl || {};
window.ButtonControl = function (p_controlid)
{
  this.Id = p_controlid;
  this.Obj = $("#" + p_controlid);
  this.Click = function () {
    this.Obj.trigger("click");
  };
  this.Enabled = function (p_enabled)
  {
    if (typeof (p_enabled) == 'boolean')
      this.Obj.attr('disabled', (!p_enabled));
    return (this.Obj.attr('disabled') != ('disabled'));
  };
  return this;
};
/* #################################################################################### */
window.CheckBoxControl = window.CheckBoxControl || {};
window.CheckBoxControl = function (p_controlid) {
  this.Id = p_controlid;
  this.Obj = $("#" + p_controlid);
  this.Checked = function (p_checked)
  {
    if (typeof (p_checked) === 'boolean')
    {
      this.Obj.prop('checked', p_checked);
      /*if (p_checked)
       this.Obj.attr('checked', 'checked');
       else
       this.Obj.removeAttr('checked');*/
    }
    return this.Obj.is(":checked");
  };
  this.Enabled = function (p_enabled)
  {
    if (typeof (p_enabled) === 'boolean')
      this.Obj.attr('disabled', (!p_enabled));
    return this.Obj.attr('disabled');
  };
  return this;
};
/* #################################################################################### */
window.DropDownListControl = window.DropDownListControl || {};
window.DropDownListControl = function (p_controlid) {
  this.Id = p_controlid;
  this.Obj = $("#" + p_controlid);
  this.GetSelectedValue = function () {
    if ((this.Obj.val() === null) || (!this.Obj.val()))
      return -1;
    else
      return this.Obj.val();
  }
  this.SelectedValue = function (p_value)
  {
    if (p_value != null)
      this.Obj.val(p_value);
    if ((this.Obj.val() === null) || (!this.Obj.val()))
      return -1;
    else
      return this.Obj.val();
  };
  this.Text = function () {
    return $("#" + AspName(p_controlid)).find('option:selected').text();
  };
  this.GetText = function () {
    return $("#" + AspName(p_controlid)).find('option:selected').text();
  };
  this.Clear = function () {
    this.Obj.html("");
  };
  this.Enabled = function (p_enabled) {
    this.Obj.attr('disabled', (!p_enabled));
  };
  this.AddItem = function (p_val, p_text, p_enabled)
  {
    if (p_enabled)
      this.Obj.append($('<option></option>').val(p_val).html(p_text));
    else
      this.Obj.append($('<option></option>').val(p_val).html(p_text).attr('disabled', 'disabled'));
  };
  this.Show = function () {
    this.Obj.fadeIn('slow').removeClass('hidden');
  };
  this.Hide = function () {
    this.Obj.addClass('hidden');
  };
  return this;
};
/* #################################################################################### */
window.DateTime = window.DateTime || {};
window.DateTime = function (p_date) {
  this.Value = new Date(1901, 0, 1);
  if (typeof (p_date) == 'string')
    this.Value = StrToDate(p_date);
  else if (typeof (p_date) == 'object')
    this.Value = p_date;
  this.ToString = DateToStr(this.Value);
  this.IsEmpty = (this.ToString == '01/01/1901');
};
/* #################################################################################### */
function StrToDate(p_date) {
  var v_day = 0;
  var v_month = 0;
  var v_year = 0;
  //2015-12-17T00:00:00
  //2015-09-18
  if ("/-.".indexOf(p_date.substr(4, 1)) > -1) {
    v_year = p_date.substr(0, 4);
    v_month = p_date.substr(5, 2);
    v_day = p_date.substr(8, 2);
  }
  //18-09-2015
  if (("/-.".indexOf(p_date.substr(2, 1)) > -1) && ("/-.".indexOf(p_date.substr(5, 1)) > -1)) {
    v_day = p_date.substr(0, 2);
    v_month = p_date.substr(3, 2);
    v_year = p_date.substr(6, 4);
  }
  return new Date(v_year, (v_month - 1), v_day);
}
/* #################################################################################### */
window.Double = window.Double || {};
window.Double = function (p_value) {
  this.Value = 0;
  if (typeof (p_value) == 'string')
    this.Value = parseFloat(p_value.replace(/[.]/, '').replace(/[,]/, '.'));
  else if (typeof (p_value) == 'number')
    this.Value = p_value;
  this.ToString = function (p_decimals)
  {
//    var v_dec = '';
//    for (var i = 0; i < p_decimals; i++)
//      v_dec += '0';
//    var v_base = this.Value.toString();
//    if (v_base.indexOf('.') <= -1)
//      v_base += '.';
//    v_base += v_dec + 'e+' + p_decimals;
//    var v_x = parseInt(parseFloat(v_base)).toString();
//    return v_x.substr(0, v_x.length - p_decimals) + ',' + v_x.substr(v_x.length - p_decimals, p_decimals);
    var v_ret = this.Value;
    if (this.Value > 1)
      v_ret = Number(Math.round(this.Value + 'e2') + 'e-2').toFixed(p_decimals);
    return v_ret.toString().replace('.', ',');
  };
};
/* #################################################################################### */
window.ContainerObject = window.ContainerObject || {};
window.ContainerObject = function (p_containerid)
{
  this.Id = p_containerid;
  this.ClientId = p_containerid;
  this.Obj = $("#" + p_containerid);
  this.Html = function (p_html)
  {
    if (p_html !== null)
      this.Obj[0].innerHTML = p_html;
    return this.Obj[0].innerHTML;
  };
  this.Clear = function ()
  {
    this.Obj[0].innerHTML = '';
  };
  this.Loading = function ()
  {
    ContainerLoading(this.ClientId);
  };
  this.Hide = function ()
  {
    this.Obj.addClass('hidden');
  };
  this.Show = function ()
  {
    this.Obj.fadeIn('slow').removeClass('hidden');
  };
  this.Collapse = function ()
  {
    this.Obj.collapse('toggle');
  };
  this.CollapseShow = function ()
  {
    this.Obj.collapse('show');
  };
  this.CollapseHide = function ()
  {
    this.Obj.collapse('hide');
  };

  return this;
};
/* ################################################################################################### */
function BackButtonToExit(e)
{
  navigator.app.exitApp();
}
/* ################################################################################################### */
function BackButtonSetOff(e)
{
  e.preventDefault();
}