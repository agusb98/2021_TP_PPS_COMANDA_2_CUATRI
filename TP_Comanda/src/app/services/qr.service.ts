import { Injectable, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})

export class QrService implements OnInit {

  ngOnInit() { BarcodeScanner.prepare(); }

  async startScan() {
    try {
      BarcodeScanner.hideBackground(); // make background of WebView transparent
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) { return result.content; }
    }
    catch (error) { this.startScan(); }
  }

  stopScann() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  getDNI() {
    return new Promise((resolve) => {
      this.startScan().then(data => {
        resolve(this.getJsonDNI(data));
      })
    })
  }

  private getJsonDNI(data) {
    var arr = data.split('@');

    var name = arr[2].charAt(0).toUpperCase() + arr[2].slice(1).toLowerCase();
    var surname = arr[1].charAt(0).toUpperCase() + arr[1].slice(1).toLowerCase();
    var cuil = arr[8].substring(0, 2) + arr[4] + arr[8].substring(3, 1);

    return { 'name': name, 'surname': surname, 'dni': arr[4], 'cuil': cuil };
  }
}