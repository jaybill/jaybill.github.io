(function() {
  var GoogleAnalytics;

  GoogleAnalytics = (function() {
    function GoogleAnalytics() {}

    GoogleAnalytics.init = function(webPropertyId) {
      var scriptTag;
      this._initQueue(webPropertyId);
      scriptTag = this._createScriptTag();
      this._injectScriptTag(scriptTag);
      return true;
    };

    GoogleAnalytics._initQueue = function(webPropertyId) {
      if (window._gaq == null) {
        window._gaq = [];
      }
      window._gaq.push(['_setAccount', webPropertyId]);
      return window._gaq.push(['_trackPageview']);
    };

    GoogleAnalytics._createScriptTag = function() {
      var protocol, scriptTag;
      scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      protocol = location.protocol;
      scriptTag.src = "" + protocol + "//stats.g.doubleclick.net/dc.js";
      return scriptTag;
    };

    GoogleAnalytics._injectScriptTag = function(scriptTag) {
      var firstScriptTag;
      firstScriptTag = document.getElementsByTagName('script')[0];
      return firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    };

    GoogleAnalytics.trackPageView = function(url) {
      return window._gaq.push(['_trackPageview', url]);
    };

    GoogleAnalytics.trackEvent = function(category, action, label, value, nonInteraction) {
      var argument, trackedEvent, _i, _len, _ref;
      if (label == null) {
        label = null;
      }
      if (value == null) {
        value = null;
      }
      if (nonInteraction == null) {
        nonInteraction = null;
      }
      trackedEvent = ['_trackEvent', category, action];
      _ref = [label, value, nonInteraction];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        argument = _ref[_i];
        if (argument != null) {
          trackedEvent.push(argument);
        } else {
          break;
        }
      }
      return window._gaq.push(trackedEvent);
    };

    return GoogleAnalytics;

  })();

  $(function() {
    return GoogleAnalytics.init('UA-1333552-23');
  });

}).call(this);
