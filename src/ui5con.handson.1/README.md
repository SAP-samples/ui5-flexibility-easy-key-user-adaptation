## Application Details

To use this application for the tutorial you have to

1. Clone this repository to SAP Business Application Studio

	If the *Get Started* tab is not already opened, open it by opening the burger menu, then selecting File > New Window. In the resulting window, select "Clone from Git", then enter the following URL in the subsequent popup: `https://github.com/SAP-samples/ui5-flexibility-easy-key-user-adaptation.git`.

	After it is cloned, confirm the popup asking if you would like to open the cloned repository and add it to the current workspace with *Open*.

	In the bottom-left corner, click on 'Main', then in the popup select "origin/chapter-2.1".

2. Replace the ID in all files

   In the search field of SAP Business Application Studio, replace the \<ID> in ui5con.handson.\<ID> and ui5con/handson/\<ID> with a unique number

   <img src="../../img/replace-id-dots.png" width="300">
   <img src="../../img/replace-id-slash.png" width="300">

3. In your ui5*.yaml files replace:

   2.1. \<DESTINATION> with the destination name.  Go to your BTP **Global Account** > **Trial Subaccount** > **Connectivity** > **Destinations (New)** and copy the "Name".

   2.2 <ABAP_TRIAL_URL> with the actual trial URL. You can find it in the same Destination under "URL".

3. In your ui5-deploy.yaml replace:

   3.1 line 24 - <TRANSPORT> with the transport you can find in the ADT under **Transport Organizer**

   3.2 line 21 - Z_UI5CON_\<ID> with a unique name

## ui5con.handson.1

An SAP Fiori application.

### Starting the generated app

- This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.

	To install its dependencies, right-click on the *src/ui5con.handson.1* folder and select *Open in Integrated Terminal*. In the terminal, type:

	```
	npm install
	```

	In order to launch the generated app, open the *src/ui5con.handson.1/package.json* file, hover over the "key-user" entry in *scripts*, then choose *Run Script*.

	```
	npm start
	```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


