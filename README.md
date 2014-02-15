# Door Peripheral

This peripheral provides an outline for simple door open/close management over Bluetooth LE. The BTLE service and characteristics are implemented, but the authentication and actual door opening components are stubbed in. These are what would need to be implemented.

### Install

Install dependencies:

    npm install

### Run

On OSX you can start with:

    node peripheral.js

On Linux you need to super user privileges:

    sudo peripheral.js

### Allowing People to Authenticate

Use the ALLOWED_FILE environment variable to tell the peripheral where it can perform a lookup for a given auth token:

    ALLOWED_FILE=/path/to/allowed.json

The ALLOWED_FILE should contain the auth token as keys, e.g.:

    { "abc123": "bob@example.com", "def135": "bev@example.com" }

### Debug

Set up the `DEBUG=door` environment variable, e.g.:

    DEBUG=door node peripheral.js

To see additional DEBUG output used in the underlying bleno library use the following:

    DEBUG=door,bleno,hci-ble,l2cap-ble node ./peripheral.js

## BLE Services

* DoorService

The DoorService provides a single characteristic, DoorAuthCharacteristic, which can be read or written to (without response).

Write your secret to the DoorAuthCharacteristic and if it's the proper secret you will be granted access. If not, you will be ignored.

If you read the DoorAuthCharacteristic it provides no meanginful information outside of it telling you it's a door.

