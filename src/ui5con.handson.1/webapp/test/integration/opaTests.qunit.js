sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ui5con/handson/<ID>/test/integration/FirstJourney',
		'ui5con/handson/<ID>/test/integration/pages/RootList',
		'ui5con/handson/<ID>/test/integration/pages/RootObjectPage'
    ],
    function(JourneyRunner, opaJourney, RootList, RootObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ui5con/handson/<ID>') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRootList: RootList,
					onTheRootObjectPage: RootObjectPage
                }
            },
            opaJourney.run
        );
    }
);