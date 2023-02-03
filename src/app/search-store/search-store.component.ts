import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DashboardService } from '../dashboard.service';
import { createWorker } from 'tesseract.js';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare const $: any;
declare const Buffer: any;

@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.component.html',
  styleUrls: ['./search-store.component.scss'],
  providers: [MessageService],
})
export class SearchStoreComponent implements OnInit {
  // ocr

  worker: Tesseract.Worker = createWorker();
  isReady: any;
  imageChangedEvent: any;
  base64Image: any;
  ocrResult: any;
  croppedImage: any = '';
  isScanning: any;
  processNow = false;
  hide = false;
  reportID: any;

  processOCR() {
    $('.uploaderSection').fadeOut(500);
    setTimeout(() => {
      $('.loaderPopup').fadeIn(500);
    }, 500);
    setTimeout(() => {
      $('.loaderPopup').fadeOut(500);
    }, 1000);
    setTimeout(() => {
      this.hide = true;
      $('.previewSection').fadeIn(500);
    }, 1500);
  }

  async initialize(): Promise<void> {
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    this.isReady = true;
  }

  handleFileInput(event: any): void {
    this.processNow = true;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.base64Image = event.target.result;
        event.target.result = null;
      };
    }
  }

  scanOCR() {
    this.isScanning = true;
    this.doOCR(this.croppedImage);
    setTimeout(() => {
      this.close();
    }, 1500);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.base64Image = event.base64;
  }

  async doOCR(base64Image: string) {
    this.ocrResult = 'Scanning';
    if (this.isReady) {
      const data = await this.worker.recognize(base64Image);
      this.ocrResult = data.data.text;
      this.ocrResult = this.ocrResult.split(':').pop();
      this.ocrResult = this.ocrResult.replace(/\s/g, '');
      this.ocrResult = this.ocrResult.replace(/-/g, '');
      this.searchSerialForm.value.serial = this.ocrResult;
      this.submitSerialSearch(this.searchSerialForm);
    }
    this.isScanning = false;
  }

  transform(): string {
    return this.base64Image;
  }

  // end ocr

  reviewForm: FormGroup = new FormGroup({
    theifName: new FormControl(null, [Validators.required]),
    theifNatID: new FormControl(null, [Validators.required]),
    theifMobile: new FormControl(null, [Validators.required]),
    theifPicture: new FormControl(null),
    additional_info: new FormControl(null),
  });

  check2:any;

  searchSerialForm: FormGroup = new FormGroup({
    serial: new FormControl(null, [Validators.required]),
  });
  searchSerial: any;
  clear() {
    this.searchSerial = '';
  }

  searchDetailsForm: FormGroup = new FormGroup({
    type: new FormControl(null),
    brand: new FormControl(null),
    model: new FormControl(null),
    color: new FormControl(null),
    frontCrach_top: new FormControl(null),
    frontCrach_center: new FormControl(null),
    frontCrach_bottom: new FormControl(null),
    backCrach_top: new FormControl(null),
    backCrach_center: new FormControl(null),
    backCrach_bottom: new FormControl(null),
    RAM: new FormControl(null),
    ROM: new FormControl(null),
    orderBy: new FormControl("DESC")
  });

  error: any;
  success: any;

  remove = false;
  serialNotFounded = false;
  detailsNotFounded = false;
  reportBySerial: any;
  Brand: any;
  Model: any;
  Type: any;
  Color: any;
  RAM: any;
  ROM: any;
  detailsArray: any;

  constructor(
    private _DashboardService: DashboardService,
    private _MessageService: MessageService,
    private _AuthService: AuthService
  ) {
    this.initialize();
  }
  

  ngOnInit(): void {
    this.Type = this._AuthService.Type();
    this.Color = [
      { name: 'Black', icon: 'Black' },
      { name: 'White', icon: 'White' },
      { name: 'Silver', icon: 'Silver' },
      { name: 'Red', icon: 'Red' },
      { name: 'Blue', icon: 'Blue' },
      { name: 'Mint Green', icon: '#A2E4B8' },
      { name: 'Purple', icon: 'Purple' },
    ];
    this.RAM = [
      { name: '4GB', value: 4 },
      { name: '6GB', value: 6 },
      { name: '8GB', value: 8 },
      { name: '16GB', value: 16 },
    ];
    this.ROM = [
      { name: '16GB', value: 16 },
      { name: '32GB', value: 32 },
      { name: '64GB', value: 64 },
      { name: '128GB', value: 128 },
      { name: '256GB', value: 256 },
    ];
    document.addEventListener('keyup', (clickEvent: KeyboardEvent) => {
      if (clickEvent.key == 'Escape') {
        this.close();
      }
    });
  }

  submitSerialSearch(SearchSerialForm: FormGroup) {
    this._DashboardService
      .serialSearch(SearchSerialForm.value.serial)
      .subscribe((resp) => {
        if (resp.status == true) {
          this.reportBySerial = resp.Data;
          for (let i = 0; i < this._AuthService.Model().length; i++) {
            if (this.reportBySerial.brand.toLowerCase() ==this._AuthService.Model()[i].id.toLowerCase()) {
              for (let k = 0;k < this._AuthService.Model()[i].items.length;k++) {
                if (this.reportBySerial.model ==this._AuthService.Model()[i].items[k].name) {
                  this.reportBySerial.model =
                  this._AuthService.Model()[i].items[k].label;
                }
              }
            }
          }
          this.success = resp.msg;
          setTimeout(() => {
            this.showSuccess();
          }, 1500);
          if (this.reportBySerial.additional_info == 'null') {
            this.remove = false;
          } else {
            this.remove = true;
          }
        } else {
          this.error = resp.msg;
          setTimeout(() => {
            this.showError();
          }, 1500);
          this.serialNotFounded = true;
        }
        this.loader();
      });
  }

  thiefAvatar(event: any) {
    const selectedFile = event.target.files[0];
    this.reviewForm.get('theifPicture')?.setValue(selectedFile);
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById('oFile_upload');
    var newImg = document.createElement('img');
    if (imageDiv != null) {
      imageDiv.innerHTML = ' ';
    }
    newImg.src = image;
    imageDiv?.appendChild(newImg);
    newImg.width = 300;
    newImg.height = 300;
    newImg.className = 'rounded-circle';
  }
  reviewPopup(reportID: any) {
    this.reportID = reportID;
    $('.ReviewParentPopup').fadeIn(500);
    $('.ReviewParentPopup').css('display', 'flex');
  }

  closeReview() {
    $('.ReviewParentPopup').fadeOut(500);
  }

  qrPopup() {
    $('.parentPopup').fadeIn(500);
    $('.parentPopup').css('display', 'flex');
    $('.previewSection').css('display', 'none');
    $('.uploaderSection').css('display', 'flex');
  }

  loader() {
    $('.serialSearchSection').fadeOut(500);
    this.clear();

    setTimeout(() => {
      $('.loader').fadeIn(500);
      $('.loader').css('display', 'flex');
    }, 500);
    if (this.serialNotFounded && !this.reportBySerial) {
      $('.default').css('display', 'none');
      setTimeout(() => {
        $('.loader').fadeOut(500);
      }, 1500);
      setTimeout(() => {
        $('.serialSearchSection').fadeIn(500);
        $('.notFounded').fadeIn(500);
      }, 2000);
    }
    if (this.reportBySerial) {
      $('.default').css('display', 'none');
      setTimeout(() => {
        $('.loader').fadeOut(500);
      }, 1500);
      setTimeout(() => {
        $('.serialSearchSection').fadeIn(500);
        $('.founded').fadeIn(500);
      }, 2000);
    }
  }

  loaderDetails() {
    $('.detailsSearchSection').fadeOut(500);
    this.clear();
    setTimeout(() => {
      $('.loader').fadeIn(500);
      $('.loader').css('display', 'flex');
    }, 500);
    if (this.detailsNotFounded && !this.detailsArray) {
      $('.default').css('display', 'none');
      setTimeout(() => {
        $('.loader').fadeOut(500);
      }, 1000);
      setTimeout(() => {
        $('.detailsSearchSection').fadeIn(500);
        $('.notFounded').fadeIn(500);
      }, 1500);
    }
    if (this.detailsArray) {
      $('.default').css('display', 'none');
      setTimeout(() => {
        $('.loader').fadeOut(500);
      }, 1500);
      setTimeout(() => {
        $('.detailsSearchSection').fadeIn(500);
        $('.founded').fadeIn(500);
      }, 2000);
    }
  }

  termBox2(event:any){
    if (event.checked[0]) {
      this.check2 = true;
    } else {
      this.check2 = false;
    }
  }

  popup(reportID: any) {
    this.reportID = reportID;
    $('.parentPopup').fadeIn(500);
    $('.parentPopup').css('display', 'flex');
  }

  submitReview() {
    const formData = new FormData();
    formData.append('theifName', this.reviewForm.value.theifName);
    formData.append('theifNatID', this.reviewForm.value.theifNatID);
    formData.append('theifMobile', this.reviewForm.value.theifMobile);
    formData.append('theifPicture', this.reviewForm.value.theifPicture);
    formData.append('additional_info', this.reviewForm.value.additional_info);

    if (this.reviewForm.value.theifPicture == null) {
      formData.delete('theifPicture');
    }

    this._DashboardService
      .submitReview(this.reportID, formData)
      .subscribe((resp) => {
        if (this.check2 == true) {
          if (resp.status == true) {
            this.success = resp.msg;
            this.showSuccess();
            location.reload();
          } else {
            const required = ['theifName', 'theifNatID', 'theifMobile'];
            const reviewArray = Object.keys(this.reviewForm.controls);
            const valuesArray = Object.values(this.reviewForm.controls);
            for (let i = 0; i < reviewArray.length; i++) {
              if (valuesArray[i].value == null) {
                for (let j = 0; j < required.length; j++) {
                  if (reviewArray[i] == required[j]) {
                    this.error = `${required[j]} is required`;
                    this.showError();
                  }
                }
              }
            }
          }
        } else {
          const required = ['theifName', 'theifNatID', 'theifMobile'];
          const reviewArray = Object.keys(this.reviewForm.controls);
          const valuesArray = Object.values(this.reviewForm.controls);
          for (let i = 0; i < reviewArray.length; i++) {
            if (valuesArray[i].value == null) {
              for (let j = 0; j < required.length; j++) {
                if (reviewArray[i] == required[j]) {
                  this.error = `${required[j]} is required`;
                  this.showError();
                }
              }
            }
          }
          this.error = 'Please agree to our terms and conditions';
          this.showError();
        }
      });
  }

  submitDetailsSearch(searchDetailsForm: FormGroup) {
    if (searchDetailsForm.value.type == null) {
      this.error = 'Type Is Required';
      this.showError();
    } else {
      this._DashboardService
        .detailsSearch(searchDetailsForm.value)
        .subscribe((resp) => {
          if (resp.status == true) {
            this.success = resp.msg;
            setTimeout(() => {
              this.showSuccess();
            }, 1500);
            this.detailsArray = resp.Data;
            for (let j = 0; j < this.detailsArray.length; j++) {
              for (let i = 0; i < this._AuthService.Model().length; i++) {
                
                if (this.detailsArray[j].brand.toLowerCase() ==this._AuthService.Model()[i].id.toLowerCase()) {
                  for (let k = 0;k < this._AuthService.Model()[i].items.length;k++
                  ) {
                    if (this.detailsArray[j].model == this._AuthService.Model()[i].items[k].name) {
                      this.detailsArray[j].model = this._AuthService.Model()[i].items[k].label;
                    }
                  }
                }
              }
            }
          } else {
            this.error = resp.msg;
            setTimeout(() => {
              this.showError();
            }, 1500);
            this.detailsNotFounded = true;
            this.detailsArray = null;
          }
          this.loaderDetails();
        });
    }
  }

  selectBrand(event: any) {
    this.Brand = this._AuthService.Brand().filter((e) => e.id == event.value);
  }
  selectModel(event: any) {
    this.Model = this._AuthService.Model().filter((e) => e.id == event.value);
  }
  close() {
    $('.parentPopup').fadeOut(500);
  }
  goBack() {
    $('.serialSearchSection').fadeOut(500);
    $('.founded').css('display', 'none');
    setTimeout(() => {
      $('.loader').fadeIn(500);
      $('.loader').css('display', 'flex');
    }, 500);
    setTimeout(() => {
      $('.loader').fadeOut(500);
    }, 1000);
    setTimeout(() => {
      this.reportBySerial = null;
      this.serialNotFounded = false;
      $('.serialSearchSection').fadeIn(500);
      $('.default').fadeIn(500);
      $('.default').css('display', 'block');
      $('#searchSerial').val('');
    }, 1500);
  }

  goBackDetails() {
    $('.detailsSearchSection').fadeOut(500);
    $('.founded').css('display', 'none');
    setTimeout(() => {
      $('.loader').fadeIn(500);
      $('.loader').css('display', 'flex');
    }, 500);
    setTimeout(() => {
      $('.loader').fadeOut(500);
    }, 1000);
    setTimeout(() => {
      this.detailsArray = null;
      this.detailsNotFounded = false;
      $('.detailsSearchSection').fadeIn(500);
      $('.default').fadeIn(500);
      $('.default').css('display', 'block');
    }, 1500);
  }

  showSuccess() {
    this._MessageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.success,
    });
  }
  showError() {
    this._MessageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.error,
    });
  }
}
