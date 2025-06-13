# Create custom Key User Action / Change Handler

## Add a custom section to the application

The easiest way to add some custom flexibility behavior to certain controls is to add instance specific designtime and flexibility information to one control instance. In Fiori Elements applications all controls are generated, so to have access to a control instance in XML we need to use an extension point and create own controls there. This can easily be done using the Fiori Tools Guided Development. For the Object Page there is the option 'Add a Custom Section to an Object Page Using Extensions'.

![Add Custom Section Generator](img/AddCustomSection.png)

In the first step you need to choose a name for the new fragment and click on the 'Create a File and Insert Snippet' button. The next step is more complex, first you need to select an Entity Set and the Extension Point. As Entity Set use 'Root', for Extension Point 'Before'. Then you can configure where the new Section should be placed in the Object Page, to have it as the first Section select 'Nested Tabs' and enter a title (e.g. 'CustomButton'). After inserting the snippet the new section can be seen in the Preview of the application.

## Create instance specific designtime metadata

All actions that can be triggered by the Key User are defined in designtime metadata files, with almost all controls contributing such metadata by default. This metadata can also be defined for only one instance of a control, directly in the XML.

```JS
	<Button xmlns:dt="sap.ui.dt" id="customButton" dt:designtime="project1/ext/CustomButton.designtime" />
```

This metadata file can hold much more information than only the actions, see [here](https://ui5.sap.com/#/topic/5866a476fa4445ec953181354b383097). For our scenario we will use the [settings actions](https://ui5.sap.com/#/topic/5483068f017049339e6a9e25f89f7074), which can be used for any action. In this action a handler function must be defined, which returns the necessary data to create a Key User change.

The following sample creates an action with a specific name and icon, creates a change of type 'createNewButton' and passes some information along with it.

```js
{
	actions: {
		settings: {
			icon: "sap-icon://popup-window",
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
}
```

For this action to work we now need to create a change handler for that change type.

## Create instance specific change handler

Change Handlers can be either directly defined in the library.js or, for convenience, in flexibility files that are referenced in the library. But there is, same as with the designtime, the option to create instance specific change handlers:

```js
	<Button xmlns:fl="sap.ui.fl" id="customButton" fl:flexibility="project1/ext/custom.flexibility" />
```

The reference file then contains the new change handler that is called during change creation and every time the change gets applied. The 3 necessary functions of a change handler are 'applyChange', 'revertChange' and 'completeChangeContent', but there are more optional functions (see [here](https://ui5.sap.com/#/topic/6a346a293c724bd4bc33f0df92706008)).

First the completeChangeContent function is called during the change creation process. There any specific content for the change needs to be saved to the change content, which will also be persisted in the backend. The other function are always called once the change gets applied or reverted. The applyChange function creates a new button control with the given name and adds it to the parent aggregation. To enable undo the necessary information to revert the change must be saved to the change instance. The revert then destroys the created control.

Changes can be applied both during XML Preprocessing and on a proper UI5 control, which is why the passed control and the view is not always the same. To overcome this difference the mPropertyBag passed to the change handler contains a module that always works in the given scenario (mPropertyBag.modifier). There many functions that manipulate controls or return information are available, such as createControl or getParent.

```js
{
	createNewButton: {
		changeHandler: {
			async applyChange(oChange, oControl, mPropertyBag) {
				const oParent = mPropertyBag.modifier.getParent(oControl);
				const aItems = await mPropertyBag.modifier.getAggregation(oParent, "items");
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
				const aItems = await mPropertyBag.modifier.getAggregation(oParent, "items");
				aItems.find(item => item.getId() === oChange.getRevertData().newControlId).destroy();
			}
		}
	}
}
```