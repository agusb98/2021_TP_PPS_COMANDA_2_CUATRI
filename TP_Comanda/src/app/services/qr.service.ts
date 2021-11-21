import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
	providedIn: 'root'
})

export class QrService {
	constructor(private barcodeScanner: BarcodeScanner) { }

	scannDNI() {
		const options = {
			prompt: "Escaneá el DNI",
			formats: 'PDF_417, QR_CODE',
			showTorchButton: true,
			resultDisplayDuration: 2,
		};

		return new Promise((res, rej) => {
			this.barcodeScanner.scan(options).then(barcodeData => {
				const datos = barcodeData.text.split('@');

				let data = {
					surname: datos[1],
					name: datos[2],
					dni: + datos[4],
				}
				res(data);
			});
		});
	}

	async createQR(code: any) {
		try { return await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, code); }
		catch (error) { console.log(error); }
	}
}