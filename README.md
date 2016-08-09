# mockttp
Mock HTTP REST Servers over local host

## Usage

Install mockhttp 
```bash
npm install --save-dev mockttp
```

Create the mockttp.json configuration file 
```json
[
  {
    "name": "Mock HTTP Test Server 1",
    "port": 1337,
    "endpoints": [
      {
        "method": "POST",
        "pattern": "/create",
        "response": {
          "status": 201,
          "data": {
            "name": "Lucas Vieira"
          }
        }
      }
    ]
  },
  {
    "name": "Mock HTTP Test Server 2",
    "port": 1338,
    "endpoints": [
      {
        "method": "GET",
        "pattern": "/show/:name",
        "response": {
          "status": 404,
          "data": {
            "message": "User Not Found"
          }
        }
      }
    ]
  }
]
```

mockttp supports the same routing patterns as restify

Run
```bash
./node_modules/.bin/mockttp
```
