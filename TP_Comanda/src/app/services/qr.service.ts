import { Injectable, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class QrService implements OnInit {

  private options: BarcodeScannerOptions = {
    formats: 'PDF_417,QR_CODE'
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    // private firestorage: FirestoreService,
    // private toast: FuctionsService
  ) { }

  ngOnInit() { }

  getDNI() {
    return new Promise((resolve) => {
      this.barcodeScanner.scan(this.options).then(data => {
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