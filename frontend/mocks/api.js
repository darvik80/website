#!/usr/bin/env node
mocks =[
    {
        httpRequest: {
            method: 'OPTIONS',
        },
        httpResponse: {
            headers: [
                { name: 'Access-Control-Allow-Origin', values: ['*'] },
                { name: 'Access-Control-Allow-Methods', values: ['DELETE, GET, HEAD, OPTIONS, POST, PUT, PATCH'] },
                { name: 'Access-Control-Allow-Headers', values: ['Allow, Content-Encoding, Content-Length, Content-Type, ETag, Expires, Last-Modified, Location, Server, Vary, Authorization'] },
                { name: 'Access-Control-Expose-Headers', values: ['Allow, Content-Encoding, Content-Length, Content-Type, ETag, Expires, Last-Modified, Location, Server, Vary, Authorization'] },
                { name: 'Access-Control-Max-Age', values: ['300'] },
                { name: 'connection', values: ['close'] },
            ]
        },
    },
    {
        "httpRequest": {
            "method": "POST",
            "path": "/api/sendMessage",
            "headers": {
                //"Content-Type": [ "application/json" ]
            }
        },
        "httpResponse": {
            "headers" : {
                "Content-Type" : [ "application/json" ],
                "Cache-Control" : [ "no-cache, no-store" ]
            },
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
mockServer.start_mockserver({serverPort: port, verbose: true, jvmOptions: "-DenableCORSForAllResponses=true"}).then(() => {
        mocks.map((mock) => {
            mockServerClient("localhost", port).mockAnyResponse(mock)
        });
    }
);

