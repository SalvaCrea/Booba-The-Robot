var ledTest = require ('./src/led-test');

ledTest.initLed(17);
ledTest.toggleLed();

ledTest.autoLed(300);
ledTest.stopAutoLed();