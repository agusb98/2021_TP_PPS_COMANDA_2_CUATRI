import { Injectable, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class QrService implements OnInit {

	private options: BarcodeScannerOptions = {
    formats: 'PDF_417,QR_CODE',
    prompt: "Escaneá el QR",  
    showTorchButton: true, 
    resultDisplayDuration: 2,
  };

	constructor(
	    private barcodeScanner: BarcodeScanner,
	    private toast: ToastrService,
	    ) {
  	}

	ngOnInit() { 
	  	// BarcodeScanner.prepare(); 
	}

	getDatosDniQr() {
		
   		 	return new Promise((resolve) => {
      		this.barcodeScanner.scan(this.options).then(barcodeData => {
        		var json = this.GetJsonFromBarcode(barcodeData);

        		this.toast.success("json", 'Escanear DNI');

        		resolve(json);     
      		})
    	})
  	}

  	GetJsonFromBarcode(data) {
    	var datos = data.split('@');
    	var nombre = datos[2].charAt(0).toUpperCase() + datos[2].slice(1).toLowerCase();
    	var apellido = datos[1].charAt(0).toUpperCase() + datos[1].slice(1).toLowerCase();
    	
	
    	return { 'name': nombre, 'surname': apellido, 'dni': datos[4] };
  	}

	  // async startScan() {
	  //   try {
	  //     BarcodeScanner.hideBackground(); // make background of WebView transparent
	  //     const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

	  //     // if the result has content
	  //     if (result.hasContent) { return result.content; }
	  //   }
	  //   catch (error) { this.startScan(); }
	  // }

	  // stopScann() {
	  //   BarcodeScanner.showBackground();
	  //   BarcodeScanner.stopScan();
	  // }

	  // getDNI() {
	  //   return new Promise((resolve) => {
	  //     this.startScan().then(data => {
	  //       resolve(this.getJsonDNI(data));
	  //     })
	  //   })
	  // }

	  // private getJsonDNI(data) {
	  //   var arr = data.split('@');

	  //   var name = arr[2].charAt(0).toUpperCase() + arr[2].slice(1).toLowerCase();
	  //   var surname = arr[1].charAt(0).toUpperCase() + arr[1].slice(1).toLowerCase();
	  //   var cuil = arr[8].substring(0, 2) + arr[4] + arr[8].substring(3, 1);

	  //   return { 'name': name, 'surname': surname, 'dni': arr[4], 'cuil': cuil };
	  // }
}