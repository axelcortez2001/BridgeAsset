# DEVELOPMENT Documentation

## June 17, 2024

`first commit`
`Set up amplify and nextJs`

## June 19, 2024

`Initial Setup of Backend Environments`

## July 29 - August 09, 2024

`CRUD functionality for laptop and monitor Assets` 
    - Implemented functionalities including backend and mockup frontend for its CRUD 
    - Implemented validations, logic and code refactoring

## August 12 - August 13, 2024

`Setup Vulnerability alerts(Code Scanning, Dependabot and Secret Scanning)`     - Fixed 3 detections

## August 14, 2024

`CRUD Functionality for peripherals`
`Mockup View and filtering for users based from issued asset data` 
    - Admin suggested to transform fa_code to unique identifier 
    - Implemented UUID for the suggestion 
    - Encountered error: uuid version is not matching with package.json to packge-lock.json 
    - Match version of uuid and redeploy

## August 16, 2024

`User mockup view Revisions and implementation of filtering logic` 
    - Encountered error: Missing key on a div inside a map component function 
    - Fixed the issue and redeployed the fixed version

## August 19, 2024

`Filtering Logic in view User History and realtime update for every trigger events`
`Implementation of Block View for asset management`

## August 22, 2024

`Implementation of tanstack table, sticky asset title, computation logic for ytd, etc and table footer for totals`

    - fixed warranty status logic
    - changed view asset into modal before passing it to update asset component 
    - deployed the updated version

## August 26, 2024

`User Active Asset data routing to update asset data component`
`Create Categorization for table and block view for asset data for better filtering management`

## August 27, 2024

`Filtering for asset component page`
`Admin suggested to add a logic function where in when the doi of an asset is more than 3 years up to now, it will return "more then 3 years"`
`Documentations`

## August 28, 2024

`Implemented Data fetching and filtering based from asset category for better visualization and ease to function on dashboard` 
    - Deployment Failed: dashboard components were read as server 
    - Testing deployment: input `use client` for every component's page(FAILED)
    - Testing deployment (v2) : rename page components with their specific component title

## September 02, 2024
`Expandable asset categories chart for better asset dashboard visualization`
### Features 
 - clickable bar chart
 - show specific asset based from category selected at bar chart
 - navigate to update asset component based from the selected asset at the table view of the selected category at bar chart

    - `New Issue found` ->  Updates from asset and user component we're not reflecting at dashboard component
    - `FIXED`
- trnasform chart component into a reusable chart component for bar and pie chart

## September 03, 2024
`Creating reusable chart for date line and fixed issue on tab selection at dashboard`
    
### NOTE: inclusion of creation of folder and files from last updates

    - Create folder ChartGateWay for gateways of components to chart component
    - Created an AllComponentsGateway file
    - Created BranchPieGateway file
    - Created DateChartGateway
        - added categorizeDate function and logic
    - Implemented the reusable date chart to component (All, Laptop, Monitor and Peripheral)

## September 04, 2024
`Updates and actions for this date`

    - Set bar charts legend to top position
    - set pie and doughnut legend to bottom position

### Creating LifeSpan Chart

    - Created `LifeSpanGateWay`
    - Created generateWarrantyStatus function
    - integrated gateway to all the components and now its working
    - push changes to GH

### Creating a reusable expand component

    - Created a new folder `Expand Components`
    - Created file ExpandGateway, expandGatewayModal and Expand Store
    - Implemented function and logic for branch chart data
    - Implemented file dateChartGateway
    - Implemented its functionalities

## September 05, 2024

### Features

    - Created a file status chartGateWay for status chart data for all the 3 components
    - Created a function and logic for chartGateway
    - revisions of datechartgateway function to have and option of `daily`, `monthly` and `yearly` options
    - Get the max value amount within date chart data and added 10k  for better presentation of data inside the chart

    