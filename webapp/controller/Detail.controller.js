sap.ui.define([
            "sap/ui/core/mvc/Controller",
            "sap/m/MessageToast",
            "sap/ui/core/Fragment"
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

                  

                    
                },
                onAfterRendering: function () {
                    this._bindScrollListener();
                },
                _bindScrollListener: function () {
                    var oScrollContainer = this.byId("scrollContainer");
                    if (oScrollContainer) {
                        var oDomRef = oScrollContainer.getDomRef();
                
                        if (oDomRef) {
                            oDomRef.addEventListener("scroll", function () {
                                this._handleScroll();
                            }.bind(this));
                        } else {
                            console.error("ScrollContainer DOM reference is not available.");
                        }
                    }
                },
        
                _handleScroll: function () {
                     // Safely get the IconTabBar control
                    var oIconTabBar = this.byId("iconTabBar");

                    if (!oIconTabBar) {
                        console.error("IconTabBar control not found. Check the ID.");
                        return;
                    }
                    var oScrollContainer = this.byId("scrollContainer");
                    var oFlightBookings = this.byId("flightBookingsSection").getDomRef();
                    var oFlightCarrier = this.byId("flightCarrierSection").getDomRef();
        
                    var iScrollTop = oScrollContainer.getDomRef().scrollTop;
                    var iFlightBookingsTop = oFlightBookings.offsetTop;
                    var iFlightCarrierTop = oFlightCarrier.offsetTop;
        
                    var oTabBar = this.byId("flightTabBar");
        
                    // Check which section is currently in view
                    if (iScrollTop >= iFlightCarrierTop - 100) {
                        oTabBar.setSelectedKey("flightCarrier");
                    } else if (iScrollTop >= iFlightBookingsTop - 100) {
                        oTabBar.setSelectedKey("flightBookings");
                    }
                },
        

        // Navigate to sections based on selected tab
        onTabSelect: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("key");
            var oScrollContainer = this.byId("scrollContainer");

            // Scroll to the relevant section based on tab selection
            if (sSelectedKey === "flightBookings") {
                var oFlightBookings = this.byId("flightBookingsSection").getDomRef();
                oScrollContainer.scrollToElement(oFlightBookings, 500); // Scroll duration: 500ms
            } else if (sSelectedKey === "flightCarrier") {
                var oFlightCarrier = this.byId("flightCarrierSection").getDomRef();
                oScrollContainer.scrollToElement(oFlightCarrier, 500);
            }
        } 
             });
        });
        