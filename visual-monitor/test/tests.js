'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://mishlohim.co.il';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      // Wait for Exclusive benefits top message.
      .pause(3000)
      .click('#_ZAhelloBar #_ZAhelloBarRightImg')
      .webdrivercss(testName + '.homepage', {
        name: 'homepage',
        exclude:
          [
            // Top banner right.
            '.BannerRight',
            // Top banner left.
            '.BannerLeft',
            // News
            '.NewsBody',
            // Business list
            '.BusinessList .bBody',
            // Products.
            '#divProducts img',
            // Menu item Ad
            '.MenuItemAdv',
          ],
        remove:
          [
            // Plusone.
            '#___plusone_0',
            // Facebook likes.
            '.fbLike',
            // Popular
            '.PopSearch',
            // Articles.
            '.Articles .Head',
            '.Articles .Body',
            // Products text.
            '#divProducts span',
            // Feedback.
            '.opinion_image'
          ],
        screenWidth: selectedCaps == 'chrome' ? [960, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
