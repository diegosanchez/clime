# Clime

## Installation

1. clone repository

    ```git clone https://github.com/diegosanchez/clime```
    
2. Install dependencies

    ```npm install```
    
3. Run tests

    ```npm test```

## Services

### /health

To know if the service is up and running
    
```sh
    curl http://mlclime.herokuapp.com/health
```
    
### /v1/clima/:year

To query clime per day

```sh
    curl http://mlclime.herokuapp.com/clima/276
```

Response

```json
{
    "clime": "lluvioso",
    "when": 0
}
```
