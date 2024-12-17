/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comflight/flight_odata/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
