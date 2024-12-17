sap.ui.define([
        "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/DateFormat"
        ], function(Controller,DateFormat) {
            "use strict";
            return Controller.extend("com.flight.flightodata.controller.Overview", {
                
                onInit: function () {
                    this.oDateFormat = DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });  
                    
                },

                

                // Custom formatter function
                formatDate: function (sDate) {
                    if (!sDate) {
                        return "";
                    }

                    // Convert the string date to Date object
                    var oDate = new Date(sDate);
                    return this.oDateFormat.format(oDate);
                },
                _onOverviewMatched: function () {
                    // Optionally load or refresh data here
                  },
                // Custom function to format the date for OData service
formatDateForOData: function (date) {
    if (!date) {
      return "";
    }
  
    var oDate = new Date(date);
  
    // Format the date to match the OData service format (YYYY-MM-DDTHH:MM:SS)
    var year = oDate.getUTCFullYear();
    var month = String(oDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    var day = String(oDate.getUTCDate()).padStart(2, '0');
    var hours = String(oDate.getUTCHours()).padStart(2, '0');
    var minutes = String(oDate.getUTCMinutes()).padStart(2, '0');
    var seconds = String(oDate.getUTCSeconds()).padStart(2, '0');
  
    // Return the formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  },
                onItemPress: function(oEvent) { 

                    var oItem = oEvent.getSource();
                    var oContext = oItem.getBindingContext();
                    var oRouter = this.getOwnerComponent().getRouter();

                    // Get the fldate from the context and format it
                    var fldate1 = oContext.getProperty("fldate");

                    if (fldate1) {
                        // Format the date before passing it
                        fldate1 = this.oDateFormat.format(new Date(fldate1));
                    }

                    var carrid = oContext.getProperty("carrid");
                    var connid = oContext.getProperty("connid");
                    var fldate = oContext.getProperty("fldate");
                    console.log("Navigating to detail page with params:", carrid, connid, fldate);
                     // Format fldate for OData service (YYYY-MM-DDTHH:MM:SS)
                        var formattedDate = this.formatDateForOData(fldate);

                        // Ensure fldate is encoded before passing it as a parameter
                        fldate = encodeURIComponent(formattedDate);

                        console.log("Formatted fldate for OData:", fldate);

                    // Navigate to the Detail page with parameters
                    oRouter.navTo("Detail", {
                        carrid: carrid,
                        connid: connid,
                        fldate: fldate
                    });
                }
            });
        });
        
   