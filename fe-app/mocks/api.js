#!/usr/bin/env node
mocks =[
    {
        "httpRequest": {
            "method": "POST",
            "path": "/api/sendMessage",
            "headers": {
                "Content-Type": ["application/json"]
            },

            "body" : {
                "type" : "JSON"
            }
        },
        "httpResponse": {
            "body": {
                "type": "JSON",
                "json": JSON.stringify({"status": "success"})
            }
        }
    },
    {
        "httpRequest": {
            "method": "GET",
            "path": "/test"
        },
        "httpResponse": {
            "headers" : {
                "Content-Type" : [ "text/plain" ],
                "Cache-Control" : [ "no-cache, no-store" ]
            },
            "body": "some response"
        }
    }
];

let mockServer = require('mockserver-node');
let mockServerClient = require('mockserver-client').mockServerClient;

let port = 3001;
mockServer.start_mockserver({serverPort: port, verbose: true}).then(() => {
        mocks.map((mock) => {
            mockServerClient("localhost", port).mockAnyResponse(mock)
        });
    }
);

