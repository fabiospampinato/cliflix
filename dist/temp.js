"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
var temp = require("temp");
/* TEMP */
temp.track();
/* EXIT */
var exitEvents = ['exit', 'SIGINT', 'SIGTERM'];
exitEvents.forEach(function (e) {
    process.on(e, function () {
        temp.cleanupSync();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxZQUFZOztBQUVaLDJCQUE2QjtBQUU3QixVQUFVO0FBRVYsSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFDO0FBRWQsVUFBVTtBQUVWLElBQU0sVUFBVSxHQUFVLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUV4RCxVQUFVLENBQUMsT0FBTyxDQUFHLFVBQUEsQ0FBQztJQUNwQixPQUFPLENBQUMsRUFBRSxDQUFHLENBQUMsRUFBRTtRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUcsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=