/*!
 * ${copyright}
 */
sap.ui.define([], function() {
	"use strict";
	return {
		actions: {
			settings: {
				icon: "sap-icon://popup-window",
				additionalInfoKey: "",
				name: "my custom action",
				async handler(oSelectedElement) {
					const sText = await prompt("Please enter a name.", "");
					return [{
						changeSpecificData: {
							changeType: "createNewButton",
							content: {
								text: sText
							}
						},
						selectorControl: oSelectedElement
					}];
				}
			}
		}
	};
});