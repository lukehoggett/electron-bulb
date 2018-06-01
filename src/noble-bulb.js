import noble from 'noble';

const MipowManufacturerData = '4d49504f57';

export default class NobleBulb {
  constructor() {
    this.state = null;
    this.bulbPeripherals = [];
    noble.on('stateChange', this.onStateChange.bind(this));
    noble.on('scanStart', this.onScanStart.bind(this));
    noble.on('discover', this.onDiscover.bind(this));
  }

  onStateChange(state) {
    this.state = state;
    console.info('onStateChange', state);
    if (state === 'poweredOn') {
      noble.startScanning();
    } else {
      noble.stopScanning();
    }
  }

  onScanStart(rag) {
    console.info('scanStart', rag);
  }

  onDiscover(peripheral) {
    if (NobleBulb.isPlaybulb(peripheral)) {
      this.bulbPeripherals.push(peripheral);
      console.info('#################', peripheral);
    }
  }

  static isPlaybulb(peripheral) {
    return typeof peripheral.advertisement.manufacturerData !== 'undefined' && peripheral.advertisement.manufacturerData.toString('hex') === MipowManufacturerData;
  }
}
