sap.ui.define([
            "sap/ui/core/mvc/Controller",
            "sap/m/MessageToast"
        ], function (Controller,MessageToast) {
            "use strict";
        
            return Controller.extend("com.flight.flightodata.controller.Detail", {
                onInit: function () {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
                },
        
                _onObjectMatched: function (oEvent) {
                    var oArgs = oEvent.getParameter("arguments");
                    var sCarrid = oArgs.carrid;
                    var sConnid = oArgs.connid;
                    var sFldate = oArgs.fldate;
                     // Use these values to load specific data for the detail page
                    console.log("Data:::::::::"+sCarrid, sConnid, sFldate);
                   // var oModel = this.getView().getModel();
                    // Construct the OData URL to fetch flight details based on carrid, connid, and fldate
                    var sPath = "/FlightCollection(carrid='" + sCarrid + "',connid='" + sConnid + "',fldate=datetime'" + sFldate + "')?$expand=flightBookings,FlightCarrier";
                    
                    // Log to ensure binding is happening
                    console.log("Binding path:", sPath);

                    
                    // Bind the view to the constructed path
                    this.getView().bindElement({
                        path: sPath,
                        parameters: {
                            expand: "flightBookings,FlightCarrier" // Optional in some cases
                        },
                        events: {
                            dataRequested: function () {
                                console.log("Data request initiated...");
                            },
                            dataReceived: function (oData) {
                                console.log("Data received successfully:", oData.getParameter("data"));
                            }
                        }
                    });

                    // var sPath = "/FlightCollection(carrid='" + oArgs.carrid + "',connid='" + oArgs.connid + "',fldate=datetime'" + oArgs.fldate + "')";
                    // var sPath = "/FlightCollection(carrid='" + oArgs.carrid + "',connid='" + oArgs.connid + "')";
                    // this.getView().bindElement({
                    //   path: sPath,
                    //   parameters: {
                    //     "$expand": "flightBookings,FlightCarrier"
                    //   }
                    // });

                    
                }
             });
        });
        