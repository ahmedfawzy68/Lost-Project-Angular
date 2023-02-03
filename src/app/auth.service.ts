import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);
  ownerData = new BehaviorSubject(null);

  liveLink:any = 'http://lost.360-courses.com/api/';

  userStorage: any = {
    firstName: '',
    lastName: '',
    email: '',
    national_id: '',
  };
  ownerStorage: any = {
    firstName: '',
    lastName: '',
    email: '',
    national_id: '',
  };

  saveUserData() {
    // let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(this.userStorage);
    // console.log(this.userData);
  }
  saveOwnerData() {
    // let encodedOwnerData = JSON.stringify(localStorage.getItem('ownerToken'));
    this.ownerData.next(this.ownerStorage);
    // console.log(this.ownerData);
  }

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }

    if (localStorage.getItem('ownerToken') != null) {
      this.saveOwnerData();
    }
  }

  ownerRegister(ownerRegisterData: any): Observable<any> {
    return this._HttpClient.post(
      `${this.liveLink}store-owner/register`,
      ownerRegisterData
    );
  }

  userRegister(userRegisterData: any): Observable<any> {
    return this._HttpClient.post(
       `${this.liveLink}user/register`,
      userRegisterData
    );
  }

  userLogin(userLoginData: any): Observable<any> {
    return this._HttpClient.post(
       `${this.liveLink}user/login`,
      userLoginData
    );
  }

  ownerLogin(ownerLoginData: any): Observable<any> {
    return this._HttpClient.post(
       `${this.liveLink}store-owner/login`,
      ownerLoginData
    );
  }

  ownerLogout(): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
       `${this.liveLink}store-owner/logout`,
      '',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  userLogout(): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post( `${this.liveLink}user/logout`, '',{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
  }
  socialLogin(socialData: any): Observable<any> {
    return this._HttpClient.post(
       `${this.liveLink}social/Auth`,
      socialData
    );
  }

  userCompleteInfo(userData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
       `${this.liveLink}user/complete-info`,
      userData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  ownerCompleteInfo(userData: any): Observable<any> {
    const token = localStorage.getItem('ownerToken');
    return this._HttpClient.post(
       `${this.liveLink}store-owner/complete-info`,
      userData,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  submitReport(deviceInfo: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this._HttpClient.post(
       `${this.liveLink}user/report/submit`,
      deviceInfo,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  Government() {
    return [
      { id: 'Cairo', name: 'Cairo' },
      { id: 'Giza', name: 'Giza' },
      { id: 'Alexandria', name: 'Alexandria' },
      { id: 'Dakahlia', name: 'Dakahlia' },
      { id: 'Red Sea', name: 'Red Sea' },
      { id: 'Beheira', name: 'Beheira' },
      { id: 'Fayoum', name: 'Fayoum' },
      { id: 'Gharbiya', name: 'Gharbiya' },
      { id: 'Ismailia', name: 'Ismailia' },
      { id: 'Menofia', name: 'Menofia' },
      { id: 'Minya', name: 'Minya' },
      { id: 'Qaliubiya', name: 'Qaliubiya' },
      { id: 'New Valley', name: 'New Valley' },
      { id: 'Suez', name: 'Suez' },
      { id: 'Aswan', name: 'Aswan' },
      { id: 'Assiut', name: 'Assiut' },
      { id: 'Beni Suef', name: 'Beni Suef' },
      { id: 'Port Said', name: 'Port Said' },
      { id: 'Damietta', name: 'Damietta' },
      { id: 'Sharkia', name: 'Sharkia' },
      { id: 'South Sinai', name: 'South Sinai' },
      { id: 'Kafr Al sheikh', name: 'Kafr Al sheikh' },
      { id: 'Matrouh', name: 'Matrouh' },
      { id: 'Luxor', name: 'Luxor' },
      { id: 'Qena', name: 'Qena' },
      { id: 'North Sinai', name: 'North Sinai' },
      { id: 'Sohag', name: 'Sohag' },
    ];
  }

  city() {
    return [
      { id: 'Cairo', name: '15 May' },
      { id: 'Cairo', name: 'Al Azbakeyah' },
      { id: 'Cairo', name: 'Al Basatin' },
      { id: 'Cairo', name: 'Tebin' },
      { id: 'Cairo', name: 'El-Khalifa' },
      { id: 'Cairo', name: 'El darrasa' },
      { id: 'Cairo', name: 'Aldarb Alahmar' },
      { id: 'Cairo', name: 'Zawya al-Hamra' },
      { id: 'Cairo', name: 'El-Zaytoun' },
      { id: 'Cairo', name: 'Sahel' },
      { id: 'Cairo', name: 'El Salam' },
      { id: 'Cairo', name: 'Sayeda Zeinab' },
      { id: 'Cairo', name: 'El Sharabeya' },
      { id: 'Cairo', name: 'Shorouk' },
      { id: 'Cairo', name: 'El Daher' },
      { id: 'Cairo', name: 'Ataba' },
      { id: 'Cairo', name: 'New Cairo' },
      { id: 'Cairo', name: 'El Marg' },
      { id: 'Cairo', name: 'Ezbet el Nakhl' },
      { id: 'Cairo', name: 'Matareya' },
      { id: 'Cairo', name: 'Maadi' },
      { id: 'Cairo', name: 'Maasara' },
      { id: 'Cairo', name: 'Mokattam' },
      { id: 'Cairo', name: 'Manyal' },
      { id: 'Cairo', name: 'Mosky' },
      { id: 'Cairo', name: 'Nozha' },
      { id: 'Cairo', name: 'Waily' },
      { id: 'Cairo', name: 'Bab al-Shereia' },
      { id: 'Cairo', name: 'Bolaq' },
      { id: 'Cairo', name: 'Garden City' },
      { id: 'Cairo', name: 'Hadayek El-Kobba' },
      { id: 'Cairo', name: 'Helwan' },
      { id: 'Cairo', name: 'Dar Al Salam' },
      { id: 'Cairo', name: 'Shubra' },
      { id: 'Cairo', name: 'Tura' },
      { id: 'Cairo', name: 'Abdeen' },
      { id: 'Cairo', name: 'Abaseya' },
      { id: 'Cairo', name: 'Ain Shams' },
      { id: 'Cairo', name: 'Nasr City' },
      { id: 'Cairo', name: 'New Heliopolis' },
      { id: 'Cairo', name: 'Masr Al Qadima' },
      { id: 'Cairo', name: 'Mansheya Nasir' },
      { id: 'Cairo', name: 'Badr City' },
      { id: 'Cairo', name: 'Obour City' },
      { id: 'Cairo', name: 'Cairo Downtown' },
      { id: 'Cairo', name: 'Zamalek' },
      { id: 'Cairo', name: 'Kasr El Nile' },
      { id: 'Cairo', name: 'Rehab' },
      { id: 'Cairo', name: 'Katameya' },
      { id: 'Cairo', name: 'Madinty' },
      { id: 'Cairo', name: 'Rod Alfarag' },
      { id: 'Cairo', name: 'Sheraton' },
      { id: 'Cairo', name: 'El-Gamaleya' },
      { id: 'Cairo', name: '10th of Ramadan City' },
      { id: 'Cairo', name: 'Helmeyat Alzaytoun' },
      { id: 'Cairo', name: 'New Nozha' },
      { id: 'Cairo', name: 'Capital New' },
      { id: 'Giza', name: 'Giza' },
      { id: 'Giza', name: 'Sixth of October' },
      { id: 'Giza', name: 'Cheikh Zayed' },
      { id: 'Giza', name: 'Hawamdiyah' },
      { id: 'Giza', name: 'Al Badrasheen' },
      { id: 'Giza', name: 'Saf' },
      { id: 'Giza', name: 'Atfih' },
      { id: 'Giza', name: 'Al Ayat' },
      { id: 'Giza', name: 'Al-Bawaiti' },
      { id: 'Giza', name: 'ManshiyetAl Qanater' },
      { id: 'Giza', name: 'Oaseem' },
      { id: 'Giza', name: 'Kerdasa' },
      { id: 'Giza', name: 'Abu Nomros' },
      { id: 'Giza', name: 'Kafr Ghati' },
      { id: 'Giza', name: 'Manshiyet Al Bakari' },
      { id: 'Giza', name: 'Dokki' },
      { id: 'Giza', name: 'Agouza' },
      { id: 'Giza', name: 'Haram' },
      { id: 'Giza', name: 'Warraq' },
      { id: 'Giza', name: 'Imbaba' },
      { id: 'Giza', name: 'Boulaq Dakrour' },
      { id: 'Giza', name: 'Al Wahat Al Baharia' },
      { id: 'Giza', name: 'Omraneya' },
      { id: 'Giza', name: 'Moneeb' },
      { id: 'Giza', name: 'Bin Alsarayat' },
      { id: 'Giza', name: 'Kit Kat' },
      { id: 'Giza', name: 'Mohandessin' },
      { id: 'Giza', name: 'Faisal' },
      { id: 'Giza', name: 'Abu Rawash' },
      { id: 'Giza', name: 'Hadayek Alahram' },
      { id: 'Giza', name: 'Haraneya' },
      { id: 'Giza', name: 'Hadayek October' },
      { id: 'Giza', name: 'Saft Allaban' },
      { id: 'Giza', name: 'Smart Village' },
      { id: 'Giza', name: 'Ard Ellwaa' },
      { id: 'Alexandria', name: 'Abu Qir' },
      { id: 'Alexandria', name: 'Al Ibrahimeyah' },
      { id: 'Alexandria', name: 'Azarita' },
      { id: 'Alexandria', name: 'Anfoushi' },
      { id: 'Alexandria', name: 'Dekheila' },
      { id: 'Alexandria', name: 'El Soyof' },
      { id: 'Alexandria', name: 'Ameria' },
      { id: 'Alexandria', name: 'El Labban' },
      { id: 'Alexandria', name: 'Al Mafrouza' },
      { id: 'Alexandria', name: 'El Montaza' },
      { id: 'Alexandria', name: 'Mansheya' },
      { id: 'Alexandria', name: 'Naseria' },
      { id: 'Alexandria', name: 'Ambrozo' },
      { id: 'Alexandria', name: 'Bab Sharq' },
      { id: 'Alexandria', name: 'Bourj Alarab' },
      { id: 'Alexandria', name: 'Stanley' },
      { id: 'Alexandria', name: 'Smouha' },
      { id: 'Alexandria', name: 'Sidi Bishr' },
      { id: 'Alexandria', name: 'Shads' },
      { id: 'Alexandria', name: 'Gheet Alenab' },
      { id: 'Alexandria', name: 'Fleming' },
      { id: 'Alexandria', name: 'Victoria' },
      { id: 'Alexandria', name: 'Camp Shizar' },
      { id: 'Alexandria', name: 'Karmooz' },
      { id: 'Alexandria', name: 'Mahta Alraml' },
      { id: 'Alexandria', name: 'Mina El-Basal' },
      { id: 'Alexandria', name: 'Asafra' },
      { id: 'Alexandria', name: 'Agamy' },
      { id: 'Alexandria', name: 'Bakos' },
      { id: 'Alexandria', name: 'Boulkly' },
      { id: 'Alexandria', name: 'Cleopatra' },
      { id: 'Alexandria', name: 'Glim' },
      { id: 'Alexandria', name: 'Al Mamurah' },
      { id: 'Alexandria', name: 'Al Mandara' },
      { id: 'Alexandria', name: 'Moharam Bek' },
      { id: 'Alexandria', name: 'Elshatby' },
      { id: 'Alexandria', name: 'Sidi Gaber' },
      { id: 'Alexandria', name: 'North Coast/sahel' },
      { id: 'Alexandria', name: 'Alhadra' },
      { id: 'Alexandria', name: 'Alattarin' },
      { id: 'Alexandria', name: 'Sidi Kerir' },
      { id: 'Alexandria', name: 'Elgomrok' },
      { id: 'Alexandria', name: 'Al Max' },
      { id: 'Alexandria', name: 'Marina' },
      { id: 'Dakahlia', name: 'Mansoura' },
      { id: 'Dakahlia', name: 'Talkha' },
      { id: 'Dakahlia', name: 'Mitt Ghamr' },
      { id: 'Dakahlia', name: 'Dekernes' },
      { id: 'Dakahlia', name: 'Aga' },
      { id: 'Dakahlia', name: 'Menia El Nasr' },
      { id: 'Dakahlia', name: 'Sinbillawin' },
      { id: 'Dakahlia', name: 'El Kurdi' },
      { id: 'Dakahlia', name: 'Bani Ubaid' },
      { id: 'Dakahlia', name: 'Al Manzala' },
      { id: 'Dakahlia', name: "tami al'amdid" },
      { id: 'Dakahlia', name: 'aljamalia' },
      { id: 'Dakahlia', name: 'Sherbin' },
      { id: 'Dakahlia', name: 'Mataria' },
      { id: 'Dakahlia', name: 'Belqas' },
      { id: 'Dakahlia', name: 'Meet Salsil' },
      { id: 'Dakahlia', name: 'Gamasa' },
      { id: 'Dakahlia', name: 'Mahalat Damana' },
      { id: 'Dakahlia', name: 'Nabroh' },
      { id: 'Red Sea', name: 'Hurghada' },
      { id: 'Red Sea', name: 'Ras Ghareb' },
      { id: 'Red Sea', name: 'Safaga' },
      { id: 'Red Sea', name: 'El Qusiar' },
      { id: 'Red Sea', name: 'Marsa Alam' },
      { id: 'Red Sea', name: 'Shalatin' },
      { id: 'Red Sea', name: 'Halaib' },
      { id: 'Red Sea', name: 'Aldahar' },
      { id: 'Beheira', name: 'Damanhour' },
      { id: 'Beheira', name: 'Kafr El Dawar' },
      { id: 'Beheira', name: 'Rashid' },
      { id: 'Beheira', name: 'Edco' },
      { id: 'Beheira', name: 'Abu al-Matamir' },
      { id: 'Beheira', name: 'Abu Homs' },
      { id: 'Beheira', name: 'Delengat' },
      { id: 'Beheira', name: 'Mahmoudiyah' },
      { id: 'Beheira', name: 'Rahmaniyah' },
      { id: 'Beheira', name: 'Itai Baroud' },
      { id: 'Beheira', name: 'Housh Eissa' },
      { id: 'Beheira', name: 'Shubrakhit' },
      { id: 'Beheira', name: 'Kom Hamada' },
      { id: 'Beheira', name: 'Badr' },
      { id: 'Beheira', name: 'Wadi Natrun' },
      { id: 'Beheira', name: 'New Nubaria' },
      { id: 'Beheira', name: 'Alnoubareya' },
      { id: 'Fayoum', name: 'Fayoum' },
      { id: 'Fayoum', name: 'Fayoum El Gedida' },
      { id: 'Fayoum', name: 'Tamiya' },
      { id: 'Fayoum', name: 'Snores' },
      { id: 'Fayoum', name: 'Etsa' },
      { id: 'Fayoum', name: 'Epschway' },
      { id: 'Fayoum', name: 'Yusuf El Sediaq' },
      { id: 'Fayoum', name: 'Hadqa' },
      { id: 'Fayoum', name: 'Atsa' },
      { id: 'Fayoum', name: 'Algamaa' },
      { id: 'Fayoum', name: 'Sayala' },
      { id: 'Gharbiya', name: 'Tanta' },
      { id: 'Gharbiya', name: 'Al Mahalla Al Kobra' },
      { id: 'Gharbiya', name: 'Kafr El Zayat' },
      { id: 'Gharbiya', name: 'Zefta' },
      { id: 'Gharbiya', name: 'El Santa' },
      { id: 'Gharbiya', name: 'Qutour' },
      { id: 'Gharbiya', name: 'Basion' },
      { id: 'Gharbiya', name: 'Samannoud' },
      { id: 'Ismailia', name: 'Ismailia' },
      { id: 'Ismailia', name: 'Fayed' },
      { id: 'Ismailia', name: 'Qantara Sharq' },
      { id: 'Ismailia', name: 'Qantara Gharb' },
      { id: 'Ismailia', name: 'El Tal El Kabier' },
      { id: 'Ismailia', name: 'Abu Sawir' },
      { id: 'Ismailia', name: 'Kasasien El Gedida' },
      { id: 'Ismailia', name: 'Nefesha' },
      { id: 'Ismailia', name: 'Sheikh Zayed' },
      { id: 'Menofia', name: 'Shbeen El Koom' },
      { id: 'Menofia', name: 'Sadat City' },
      { id: 'Menofia', name: 'Menouf' },
      { id: 'Menofia', name: 'Sars El-Layan' },
      { id: 'Menofia', name: 'Ashmon' },
      { id: 'Menofia', name: 'Al Bagor' },
      { id: 'Menofia', name: 'Quesna' },
      { id: 'Menofia', name: 'Berkat El Saba' },
      { id: 'Menofia', name: 'Tala' },
      { id: 'Menofia', name: 'Al Shohada' },
      { id: 'Minya', name: 'Minya' },
      { id: 'Minya', name: 'Minya El Gedida' },
      { id: 'Minya', name: 'El Adwa' },
      { id: 'Minya', name: 'Magagha' },
      { id: 'Minya', name: 'Bani Mazar' },
      { id: 'Minya', name: 'Mattay' },
      { id: 'Minya', name: 'Samalut' },
      { id: 'Minya', name: 'Madinat El Fekria' },
      { id: 'Minya', name: 'Meloy' },
      { id: 'Minya', name: 'Deir Mawas' },
      { id: 'Minya', name: 'Abu Qurqas' },
      { id: 'Minya', name: 'Ard Sultan' },
      { id: 'Qaliubiya', name: 'Banha' },
      { id: 'Qaliubiya', name: 'Qalyub' },
      { id: 'Qaliubiya', name: 'Shubra Al Khaimah' },
      { id: 'Qaliubiya', name: 'Al Qanater Charity' },
      { id: 'Qaliubiya', name: 'Khanka' },
      { id: 'Qaliubiya', name: 'Kafr Shukr' },
      { id: 'Qaliubiya', name: 'Tukh' },
      { id: 'Qaliubiya', name: 'Qaha' },
      { id: 'Qaliubiya', name: 'Obour' },
      { id: 'Qaliubiya', name: 'Khosous' },
      { id: 'Qaliubiya', name: 'Shibin Al Qanater' },
      { id: 'Qaliubiya', name: 'Mostorod' },
      { id: 'New Valley', name: 'El Kharga' },
      { id: 'New Valley', name: 'Paris' },
      { id: 'New Valley', name: 'Mout' },
      { id: 'New Valley', name: 'Farafra' },
      { id: 'New Valley', name: 'Balat' },
      { id: 'New Valley', name: 'Dakhla' },
      { id: 'Suez', name: 'Suez' },
      { id: 'Suez', name: 'Alganayen' },
      { id: 'Suez', name: 'Ataqah' },
      { id: 'Suez', name: 'Ain Sokhna' },
      { id: 'Suez', name: 'Faysal' },
      { id: 'Aswan', name: 'Aswan' },
      { id: 'Aswan', name: 'Aswan El Gedida' },
      { id: 'Aswan', name: 'Drau' },
      { id: 'Aswan', name: 'Kom Ombo' },
      { id: 'Aswan', name: 'Nasr Al Nuba' },
      { id: 'Aswan', name: 'Kalabsha' },
      { id: 'Aswan', name: 'Edfu' },
      { id: 'Aswan', name: 'Al-Radisiyah' },
      { id: 'Aswan', name: 'Al Basilia' },
      { id: 'Aswan', name: 'Al Sibaeia' },
      { id: 'Aswan', name: 'Abo Simbl Al Siyahia' },
      { id: 'Aswan', name: 'Marsa Alam' },
      { id: 'Assiut', name: 'Assiut' },
      { id: 'Assiut', name: 'Assiut El Gedida' },
      { id: 'Assiut', name: 'Dayrout' },
      { id: 'Assiut', name: 'Manfalut' },
      { id: 'Assiut', name: 'Qusiya' },
      { id: 'Assiut', name: 'Abnoub' },
      { id: 'Assiut', name: 'Abu Tig' },
      { id: 'Assiut', name: 'El Ghanaim' },
      { id: 'Assiut', name: 'Sahel Selim' },
      { id: 'Assiut', name: 'El Badari' },
      { id: 'Assiut', name: 'Sidfa' },
      { id: 'Beni Suef', name: 'Bani Sweif' },
      { id: 'Beni Suef', name: 'Beni Suef El Gedida' },
      { id: 'Beni Suef', name: 'Al Wasta' },
      { id: 'Beni Suef', name: 'Naser' },
      { id: 'Beni Suef', name: 'Ehnasia' },
      { id: 'Beni Suef', name: 'beba' },
      { id: 'Beni Suef', name: 'Fashn' },
      { id: 'Beni Suef', name: 'Somasta' },
      { id: 'Beni Suef', name: 'Alabbaseri' },
      { id: 'Beni Suef', name: 'Mokbel' },
      { id: 'Port Said', name: 'PorSaid' },
      { id: 'Port Said', name: 'Port Fouad' },
      { id: 'Port Said', name: 'Alarab' },
      { id: 'Port Said', name: 'Zohour' },
      { id: 'Port Said', name: 'Alsharq' },
      { id: 'Port Said', name: 'Aldawahi' },
      { id: 'Port Said', name: 'Almanakh' },
      { id: 'Port Said', name: 'Mubarak' },
      { id: 'Damietta', name: 'Damietta' },
      { id: 'Damietta', name: 'New Damietta' },
      { id: 'Damietta', name: 'Ras El Bar' },
      { id: 'Damietta', name: 'Faraskour' },
      { id: 'Damietta', name: 'Zarqa' },
      { id: 'Damietta', name: 'alsaru' },
      { id: 'Damietta', name: 'alruwda' },
      { id: 'Damietta', name: 'Kafr El-Batikh' },
      { id: 'Damietta', name: 'Azbet Al Burg' },
      { id: 'Damietta', name: 'Meet Abou Ghalib' },
      { id: 'Damietta', name: 'Kafr Saad' },
      { id: 'Sharkia', name: 'Zagazig' },
      { id: 'Sharkia', name: 'Al Ashr Men Ramadan' },
      { id: 'Sharkia', name: 'Minya Al Qamh' },
      { id: 'Sharkia', name: 'Belbeis' },
      { id: 'Sharkia', name: 'Mashtoul El Souq' },
      { id: 'Sharkia', name: 'Qenaiat' },
      { id: 'Sharkia', name: 'Abu Hammad' },
      { id: 'Sharkia', name: 'El Qurain' },
      { id: 'Sharkia', name: 'Hehia' },
      { id: 'Sharkia', name: 'Abu Kabir' },
      { id: 'Sharkia', name: 'Faccus' },
      { id: 'Sharkia', name: 'El Salihia El Gedida' },
      { id: 'Sharkia', name: 'Al Ibrahimiyah' },
      { id: 'Sharkia', name: 'Deirb Negm' },
      { id: 'Sharkia', name: 'Kafr Saqr' },
      { id: 'Sharkia', name: 'Awlad Saqr' },
      { id: 'Sharkia', name: 'Husseiniya' },
      { id: 'Sharkia', name: 'san alhajar alqablia' },
      { id: 'Sharkia', name: 'Manshayat Abu Omar' },
      { id: 'South Sinai', name: 'Al Toor' },
      { id: 'South Sinai', name: 'Sharm El-Shaikh' },
      { id: 'South Sinai', name: 'Dahab' },
      { id: 'South Sinai', name: 'Nuweiba' },
      { id: 'South Sinai', name: 'Taba' },
      { id: 'South Sinai', name: 'Saint Catherine' },
      { id: 'South Sinai', name: 'Abu Redis' },
      { id: 'South Sinai', name: 'Abu Zenaima' },
      { id: 'South Sinai', name: 'Ras Sidr' },
      { id: 'Kafr Al sheikh', name: 'Kafr El Sheikh' },
      { id: 'Kafr Al sheikh', name: 'Kafr El Sheikh Downtown' },
      { id: 'Kafr Al sheikh', name: 'Desouq' },
      { id: 'Kafr Al sheikh', name: 'Fooh' },
      { id: 'Kafr Al sheikh', name: 'Metobas' },
      { id: 'Kafr Al sheikh', name: 'Burg Al Burullus' },
      { id: 'Kafr Al sheikh', name: 'Baltim' },
      { id: 'Kafr Al sheikh', name: 'Masief Baltim' },
      { id: 'Kafr Al sheikh', name: 'Hamol' },
      { id: 'Kafr Al sheikh', name: 'Bella' },
      { id: 'Kafr Al sheikh', name: 'Riyadh' },
      { id: 'Kafr Al sheikh', name: 'Sidi Salm' },
      { id: 'Kafr Al sheikh', name: 'Qellen' },
      { id: 'Kafr Al sheikh', name: 'Sidi Ghazi' },
      { id: 'Matrouh', name: 'Marsa Matrouh' },
      { id: 'Matrouh', name: 'El Hamam' },
      { id: 'Matrouh', name: 'Alamein' },
      { id: 'Matrouh', name: 'Dabaa' },
      { id: 'Matrouh', name: 'Al-Nagila' },
      { id: 'Matrouh', name: 'Sidi Brani' },
      { id: 'Matrouh', name: 'Salloum' },
      { id: 'Matrouh', name: 'Siwa' },
      { id: 'Matrouh', name: 'Marina' },
      { id: 'Matrouh', name: 'North Coast' },
      { id: 'Luxor', name: 'Luxor' },
      { id: 'Luxor', name: 'New Luxor' },
      { id: 'Luxor', name: 'Esna' },
      { id: 'Luxor', name: 'New Tiba' },
      { id: 'Luxor', name: 'Al ziynia' },
      { id: 'Luxor', name: 'Al Bayadieh' },
      { id: 'Luxor', name: 'Al Qarna' },
      { id: 'Luxor', name: 'Armant' },
      { id: 'Luxor', name: 'Al Tud' },
      { id: 'Qena', name: 'Qena' },
      { id: 'Qena', name: 'New Qena' },
      { id: 'Qena', name: 'Abu Tesht' },
      { id: 'Qena', name: 'Nag Hammadi' },
      { id: 'Qena', name: 'Deshna' },
      { id: 'Qena', name: 'Alwaqf' },
      { id: 'Qena', name: 'Qaft' },
      { id: 'Qena', name: 'Naqada' },
      { id: 'Qena', name: 'Farshout' },
      { id: 'Qena', name: 'Quos' },
      { id: 'North Sinai', name: 'Arish' },
      { id: 'North Sinai', name: 'Sheikh Zowaid' },
      { id: 'North Sinai', name: 'Nakhl' },
      { id: 'North Sinai', name: 'Rafah' },
      { id: 'North Sinai', name: 'Bir al-Abed' },
      { id: 'North Sinai', name: 'Al Hasana' },
      { id: 'Sohag', name: 'Sohag' },
      { id: 'Sohag', name: 'Sohag El Gedida' },
      { id: 'Sohag', name: 'Akhmeem' },
      { id: 'Sohag', name: 'Akhmim El Gedida' },
      { id: 'Sohag', name: 'Albalina' },
      { id: 'Sohag', name: 'El Maragha' },
      { id: 'Sohag', name: "almunsha'a" },
      { id: 'Sohag', name: 'Dar AISalaam' },
      { id: 'Sohag', name: 'Gerga' },
      { id: 'Sohag', name: 'Jahina Al Gharbia' },
      { id: 'Sohag', name: 'Saqilatuh' },
      { id: 'Sohag', name: 'Tama' },
      { id: 'Sohag', name: 'Tahta' },
      { id: 'Sohag', name: 'Alkawthar' },
    ];
  }

  Type() {
    return [
      { id: 'laptop', label: 'laptop', name: 'laptop' },
      { id: 'mobile', label: 'mobile', name: 'mobile' },
    ];
  }

  Brand() {
    return [
      {
        id: 'laptop',
        label: 'laptop',
        img: '../../assets/img/laptop.png',
        items: [
          {
            id: 'msi',
            label: 'msi',
            name: 'msi',
            img: '../../assets/brandIcons/msi.png',
          },
          { id: 'hp', label: 'hp', img: '../../assets/brandIcons/hp.png' },
          {
            id: 'lenovo',
            label: 'lenovo',
            name: 'lenovo',
            img: '../../assets/brandIcons/lenovo.png',
          },
          {
            id: 'dell',
            label: 'dell',
            name: 'dell',
            img: '../../assets/brandIcons/dell.png',
          },
          {
            id: 'acer',
            label: 'acer',
            name: 'acer',
            img: '../../assets/brandIcons/acer.png',
          },
          {
            id: 'asus',
            label: 'asus',
            name: 'asus',
            img: '../../assets/brandIcons/asus.png',
          },
        ],
      },
      {
        id: 'mobile',
        label: 'Mobile',
        img: '../../assets/img/smartphone.png',
        items: [
          {
            id: 'samsung',
            label: 'samsung',
            name: 'samsung',
            img: '../../assets/brandIcons/samsung.png',
          },
          {
            id: 'realme',
            label: 'realme',
            name: 'realme',
            img: '../../assets/brandIcons/realme.png',
          },
          {
            id: 'honor',
            label: 'honor',
            name: 'honor',
            img: '../../assets/brandIcons/honor.png',
          },
          {
            id: 'huawei',
            label: 'huawei',
            name: 'huawei',
            img: '../../assets/brandIcons/huawei.png',
          },
          {
            id: 'xiaomi',
            label: 'xiaomi',
            name: 'xiaomi',
            img: '../../assets/brandIcons/xiaomi.png',
          },
          {
            id: 'oppo',
            label: 'oppo',
            name: 'oppo',
            img: '../../assets/brandIcons/oppo.png',
          },
        ],
      },
    ];
  }

  Model() {
    return [
      {
        type: 'laptop',
        id: 'acer',
        label: 'acer',
        img: '../../assets/brandIcons/acer.png',
        items: [
          {
            label: ' aspire3-a315-notebook ',
            img: 'aspire3-a315-notebook.jpg',
            name: 'aspire3-a315-notebook',
          },
          {
            label: 'aspire5-notebook',
            img: 'aspire5-notebook.jpg',
            name: 'aspire5-notebook',
          },
          {
            label: 'nitro5-an515.jpg',
            img: 'nitro5-an515.jpg',
            name: 'nitro5-an515',
          },
          {
            label: 'predator-helios',
            img: 'predator-helios.jpg',
            name: 'predator-helios',
          },
          { label: ' swift5 ', img: 'swift5.jpg', name: 'swift5' },
        ],
      },

      {
        type: 'laptop',
        id: 'asus',
        label: 'asus',
        img: '../../assets/brandIcons/asus.png',
        items: [
          { label: ' expertbook ', img: 'expertbook.jpg', name: 'expertbook' },
          {
            label: ' uf-dash-f15 ',
            img: 'tuf-dash-f15.jpg',
            name: 'tuf-dash-f15',
          },
          {
            label: ' vivobook15 ',
            img: 'vivobook15.jpg',
            name: 'vivobook15',
          },
          { label: ' zenbook13 ', img: 'zenbook13.jpg', name: 'zenbook13' },
        ],
      },

      {
        type: 'laptop',
        id: 'dell',
        label: 'dell',
        img: '../../assets/brandIcons/dell.png',
        items: [
          { label: ' g3 ', img: 'g3.jpg', name: 'g3' },
          { label: ' g15 ', img: 'g15.jpg', name: 'g15' },
          {
            label: ' inspiron7405 ',
            img: 'inspiron7405.jpg',
            name: 'inspiron7405',
          },
          {
            label: ' latitude3520 ',
            img: 'latitude3520.jpg',
            name: 'latitude3520',
          },
          {
            label: ' vostro3500 ',
            img: 'vostro3500.jpg',
            name: 'vostro3500',
          },
        ],
      },

      {
        type: 'laptop',
        id: 'hp',
        label: 'hp',
        img: '../../assets/brandIcons/hp.png',
        items: [
          { label: ' envy-x360 ', img: 'envy-x360.jpg', name: 'envy-x360' },
          { label: ' g7 ', img: 'g7.jpg', name: 'g7' },
          {
            label: ' pavilion15 ',
            img: 'pavilion15.jpg',
            name: 'pavilion15',
          },
          { label: 'victus16', img: 'victus16.jpg', name: 'victus16' },
        ],
      },

      {
        type: 'laptop',
        id: 'lenovo',
        label: 'lenovo',
        img: '../../assets/brandIcons/lenovo.png',
        items: [
          { label: 'ideapad5', img: 'ideapad5.jpg', name: 'ideapad5' },
          {
            label: ' ideapad-flex5 ',
            img: 'ideapad-flex5.jpg',
            name: 'ideapad-flex5',
          },
          { label: ' legion5', img: 'legion5.jpg', name: 'legion5' },
          { label: ' v15 ', img: 'v15.jpg', name: 'v15' },
          { label: ' yoga7 ', img: 'yoga7.jpg', name: 'yoga7' },
        ],
      },

      {
        type: 'laptop',
        id: 'msi',
        label: 'msi',
        img: '../../assets/brandIcons/msi.png',
        items: [
          {
            label: ' gaming-gs76 ',
            img: 'gaming-gs76.jpg',
            name: 'gaming-gs76',
          },
          { label: 'gf63 ', img: 'gf63.jpg', name: 'gf63' },
          { label: 'gf65 ', img: 'gf65.jpg', name: 'gf65' },
          { label: 'modern14 ', img: 'modern14.jpg', name: 'modern14' },
          { label: 'sword15" ', img: 'sword15.jpg', name: 'sword15' },
        ],
      },

      {
        type: 'mobile',
        id: 'samsung',
        label: 'samsung',
        img: '../../assets/brandIcons/samsung.png',
        items: [
          { label: 'a33', img: 'a33.png', name: 'a33' },
          { label: 'a52', img: 'a52.png', name: 'a52' },
          { label: 'a72 ', img: 'a72.png', name: 'a72' },
          {
            label: 'galaxy-note7',
            img: 'galaxy-note7.png',
            name: 'galaxy-note7',
          },
          {
            label: 'galaxy-note8',
            img: 'galaxy-note8.png',
            name: 'galaxy-note8',
          },
          {
            label: 'galaxy-note9',
            img: 'galaxy-note9.png',
            name: 'galaxy-note9',
          },
          { label: 'm31', img: 'm31.png', name: 'm31' },
          { label: 's20', img: 's20.png', name: 's20' },
          { label: 's21', img: 's21.png', name: 's21' },
        ],
      },
      {
        type: 'mobile',
        id: 'realme',
        label: 'realme',
        img: '../../assets/brandIcons/oppo.png',
        items: [
          { label: '6', img: '6.png', name: '6' },
          { label: '6i', img: '6i.png', name: '6i' },
          { label: '7', img: '7.png', name: '7' },
          { label: '7pro', img: '7pro.png', name: '7pro' },
          { label: '8pro', img: '8pro.png', name: '8pro' },
          { label: 'c11', img: 'c11.png', name: 'c11' },
          { label: 'c15', img: 'c15.png', name: 'c15' },
          { label: 'c25', img: 'c25.png', name: 'c25' },
        ],
      },
      {
        type: 'mobile',
        id: 'honor',
        label: 'honor',
        items: [
          { label: '8a', img: '8a.png', name: '8a' },
          { label: '8x', img: '8x.png', name: '8x' },
          { label: '9x-pro', img: '9x-pro.png', name: '9x-pro' },
        ],
      },
      {
        type: 'mobile',
        id: 'huawei',
        label: 'huawei',
        img: '../../assets/img/huawei.png',
        items: [
          { label: 'nova8', img: 'nova8.png', name: 'nova8' },
          { label: 'p30-pro', img: 'p30-pro.png', name: 'p30-pro' },
          { label: 'p40-pro', img: 'p40-pro.png', name: 'p40-pro' },
          { label: 'y7-prime2019', img: 'y7-prime2019.png', name: 'y7-prime2019' },
        ],
      },
      {
        type: 'mobile',
        id: 'xiaomi',
        label: 'xiaomi',
        img: '../../assets/img/xiaomi.png',
        items: [
          { label: '9a', img: '9a.png', name: '9a' },
          { label: '9c', img: '9c.png', name: '9c' },
          { label: '9t', img: '9t.png', name: '9t' },
          { label: 'note7', img: 'note7.png', name: 'note7' },
          { label: 'note8', img: 'note8.png', name: 'note8' },
          { label: 'note9s', img: 'note9s.png', name: 'note9s' },
          { label: 'note10', img: 'note10.png', name: 'note10' },
          { label: 'note10-pro', img: 'note10-pro.png', name: 'note10-pro' },
          { label: 'note11', img: 'note11.png', name: 'note11' },
          { label: 'note11-pro', img: 'note11-pro.png', name: 'note11-pro' },
          { label: 'poco-f1', img: 'poco-f1.png', name: 'poco-f1' },
          { label: 'poco-x3', img: 'poco-x3.png', name: 'poco-x3' },
        ],
      },
      {
        type: 'mobile',
        id: 'oppo',
        label: 'oppo',
        img: '../../assets/img/oppo.png',
        items: [
          { label: 'a12', img: 'a12.png', name: 'a12' },
          { label: 'a54', img: 'a54.png', name: 'a54' },
          { label: 'a74', img: 'a74.png', name: 'a74' },
          { label: 'reno2-z', img: 'reno2-z.png', name: 'reno2-z' },
          { label: 'reno4', img: 'reno4.png', name: 'reno4' },
        ],
      },
    ];
  }
}
