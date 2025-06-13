# Create custom Key User Action / Change Handler

## Add a custom section to the application

The easiest way to add some custom flexibility behavior to certain controls is to add instance specific designtime and flexibility information to one control instance. In Fiori Elements applications all controls are generated, so to have access to a control instance in XML we need to use an extension point and create own controls there. This can easily be done using the Fiori Tools Guided Development. For the Object Page there is the option 'Add a Custom Section to an Object Page Using Extensions'.

![Add Custom Section Generator](img/AddCustomSection.png)

In the first step you need to choose a name for the new fragment and click on the 'Create a File and Insert Snippet' button. The next step is more complex, first you need to select an Entity Set and the Extension Point. As Entity Set use 'Root', for Extension Point 'Before'. Then you can configure where the new Section should be placed in the Object Page, to have it as the first Section select 'Nested Tabs' and enter a title (e.g. 'CustomButton'). After inserting the snippet the new section can be seen in the Preview of the application.
