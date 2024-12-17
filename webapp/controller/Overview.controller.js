sap.ui.define([
        "sap/ui/core/mvc/Controller"
        ], function(Controller) {
            "use strict";
            return Controller.extend("com.flight.flightodata.controller.Overview", {
                onItemPress: function(oEvent) { 

                    var oItem = oEvent.getSource();
                    var oContext = oItem.getBindingContext();
                    var oRouter = this.getOwnerComponent().getRouter();

                    oRouter.navTo("Detail", {
                        carrid: oContext.getProperty("carrid"),
                        connid: oContext.getProperty("connid"),
                        fldate: encodeURIComponent(oContext.getProperty("fldate"))
                    }); 
                }
            });
        });
        
   