sap.ui.define([
            "sap/ui/core/mvc/Controller"
        ], function (Controller) {
            "use strict";
        
            return Controller.extend("com.flight.flightodata.controller.Detail", {
                onInit: function () {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
                },
        
                _onObjectMatched: function (oEvent) {
                    var sCarrid = oEvent.getParameter("arguments").carrid;
                    var sConnid = oEvent.getParameter("arguments").connid;
                    var sFldate = decodeURIComponent(oEvent.getParameter("arguments").fldate);
        
                    var sPath = `/FlightCollection(carrid='${sCarrid}',connid='${sConnid}',fldate=datetime'${sFldate}')`;
                    this.getView().bindElement({
                        path: sPath,
                        parameters: {
                            expand: "flightBookings,FlightCarrier"
                        }
                    });
                }
             });
        });
        