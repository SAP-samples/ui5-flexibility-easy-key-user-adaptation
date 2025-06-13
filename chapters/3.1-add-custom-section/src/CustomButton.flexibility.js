/*!
 * ${copyright}
 */

sap.ui.define([], function() {
	"use strict";

	return {
		myChangeType: {
			changeHandler: {
				async applyChange(oChange, oControl, mPropertyBag) {
					const oParent = mPropertyBag.modifier.getParent(oControl);
					const aItems = oParent.getAggregation("items");
					const iNewIndex = aItems.length;
					const oNewButton = await mPropertyBag.modifier.createControl(
						"sap.m.Button",
						mPropertyBag.appComponent,
						mPropertyBag.view,
						{
							id: `newButton_${iNewIndex}`
						},
						{
							text: oChange.getContent().buttonText
						}
					);
					oParent.addItem(oNewButton);
					oChange.setRevertData({
						newControlId: `newButton_${iNewIndex}`
					});
				},
				completeChangeContent(oChange, mSpecificChangeInfo, mPropertyBag) {
					oChange.setContent({
						buttonText: mSpecificChangeInfo.text
					});
				},
				revertChange(oChange, oControl, mPropertyBag) {
					const oParent = mPropertyBag.modifier.getParent(oControl);
					const aItems = oParent.getAggregation("items");
					aItems.find(item => item.getId() === oChange.getRevertData().newControlId).destroy();
				}
			}
		}
	};
});