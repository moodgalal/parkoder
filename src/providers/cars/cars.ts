import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from '../global-url';

@Injectable()
export class CarsProvider {

  public globalUrl: string = URL.url;
    // public globalUrl: string = `http://localhost:50123/ParkPoint/`;

  constructor(public http: Http) {
  }

  login(user: string, password: string) {
    return this.http.get(`${this.globalUrl}GetTokenLogin?userName=${user}&password=${password}`)
      .map(res => res.json())
  }
  LoginToSite(model) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.http.post(`${this.globalUrl}LoginToSite`, model, { headers: header })
      .map(res => res.json())
  }

  public getSites(user) {
    let Url: string = `${this.globalUrl}GetSite?UserName=${user}`;

    return this.http.get(Url)
      .map(res => res.json());
  }

  public getSubSites(id) {
    console.log("getSubSites() in the service");
    let Url: string = `${this.globalUrl}GetSubLocation?SiteID=${id}`;

    return this.http.get(Url)
      .map(res => res.json());
  }

  public getGates(id) {
    console.log("getGates() in the service");
    let Url: string = `${this.globalUrl}GetGates?SiteID=${id}`;

    return this.http.get(Url)
      .map(res => res.json());
  }

  public GetAllVehicleTrasaction(siteId, subSiteId, gateId, userEmail) {
    let Url = `${this.globalUrl}GetAllVehicleTrasaction?SiteID=${siteId}&SubSiteID=${subSiteId}&GateID=${gateId}&userEmail=${userEmail}`;
    return this.http.get(Url).map(res => res.json());
  }

  public CheckTransaction(barcode: string, siteId: number, gateId: number) {
    let Url = this.globalUrl + "CheckTransaction?BarCode=" + barcode +
      "&SiteID=" + siteId.toString() +
      "&GateID=" + gateId.toString();
    //console.log(Url);
    return this.http.get(Url)
      .map(res => res.json())
  }

  public getAllCountries() {
    let Url = `${this.globalUrl}GetAllCountries`;
    return this.http.get(Url)
      .map(res => res.json())
  }
  public GetCustomerInfo(CUSTNMBR) {
    let Url = `${this.globalUrl}Customer/GetCustomerInfo?CUSTNMBR=` + CUSTNMBR;

    return this.http.get(Url)
      .map(res => res.json())
  }

  public SaveNewVehicle(Ticket: any) {
    let Url = `${this.globalUrl}SaveNewVehicle`;
    let header = new Headers({ "Content-type": "application/json" });
    return this.http.post(Url, Ticket, { headers: header }).map(res => res.json());
  }
  public SaveVehiclePaymentData(Ticket: any) {
    let Url = `${this.globalUrl}SaveVehiclePaymentData`;
    let header = new Headers({ "Content-type": "application/json" });
    return this.http.post(Url, Ticket, { headers: header }).map(res => res.json());
  }


  public saveCarNext(obj: any) {
    console.log("in save function");
    console.log(obj);

    let Url = this.globalUrl + "SaveNewVehicleNext?BarCode=" + obj.BarCode +
      "&ItemID=" + obj.ItemId +
      "&ItemName=" + obj.ItemName +
      "&EntryUserName=" + obj.EntryUserName +
      "&SiteID=" + obj.SiteId +
      "&GateID=" + obj.GateId +
      "&CountryCode=" + obj.CountryCode +
      "&PlateNumber=" + obj.PlateNumber +
      "&PlateNoPrefix=" + obj.PlateNoPrefix +
      "&CUSTNMBR=" + obj.CUSTNMBR +
      "&CustomerName=" + obj.CustomerName +
      "&CustomerPhoneNumber=" + obj.CustomerPhoneNumber +
      "&AdvancedPayment=" + obj.AdvancedPayment +
      "&CurrencyCode=" + obj.CurrencyCode;

    let header = new Headers({ "Content-type": "application/json" });
    console.log(Url);
    return this.http.post(Url, {}, { headers: header })
      .map(res => res.json());
  }

  public getNewTicket(barcode: string, siteId: number, gateId: number) {
    let Url = this.globalUrl + "GetNewTicket?BarCode=" + barcode +
      "&SiteID=" + siteId.toString() +
      "&GateID=" + gateId.toString();

    return this.http.get(Url)
      .map(res => res.json())
  }

  public getBins(subSiteId: number) {
    let Url = `${this.globalUrl}GetBin?SubSiteID=${subSiteId}`;

    return this.http.get(Url)
      .map(res => res.json())
  }

  public BinSave(BarCode, EntryUserName, subsite, BinId, BinName) {
    let Url = this.globalUrl + "BinSave?BarCode=" + BarCode +
      "&EntryUserName=" + EntryUserName +
      "&SubSiteID=" + subsite +
      "&BinID=" + BinId +
      "&BinName=" + BinName;
    return this.http.get(Url).map(res => res.json())
  }

  public getBrands() {
    let Url = `${this.globalUrl}GetAllBrands`;

    return this.http.get(Url)
      .map(res => res.json())
  }

  public getColors() {
    let Url = `${this.globalUrl}GetAllColors`;

    return this.http.get(Url)
      .map(res => res.json())
  }

  getTypes() {
    let Url = `${this.globalUrl}GetAllTypes`;

    return this.http.get(Url)
      .map(res => res.json())
  }

  getStatus() {
    let Url = `${this.globalUrl}GetAllStatus`;

    return this.http.get(Url)
      .map(res => res.json())
  }

  saveCarData(obj: any) {
    console.log("in save function");
    console.log(obj);

    let Url = this.globalUrl + "SaveVehicleData?BarCode=" + obj.BarCode +
      "&UserNameIn=" + obj.EntryUserName +
      "&VehicleBrandID=" + obj.BrandId +
      "&VehicleTypeID=" + obj.TypeId +
      "&VehicleColorID=" + obj.ColorId +
      "&VehicleStatusID=" + obj.StatusId;

    let header = new Headers({ "Content-type": "application/json" });

    return this.http.post(Url, {}, { headers: header })
      .map(res => res.json());
  }
  SaveBrand(barcode, VehicleBrandID, RecordStatusID) {
    let URL = `${this.globalUrl}SaveBrand?BarCode=${barcode}&VehicleBrandID=${VehicleBrandID}&RecordStatusID=${RecordStatusID}`;

    return this.http.get(URL).map(res => res.json());
  }
  SaveColor(barcode, VehicleColorID, RecordStatusID) {
    let URL = `${this.globalUrl}SaveColor?BarCode=${barcode}&VehicleColorID=${VehicleColorID}&RecordStatusID=${RecordStatusID}`;

    return this.http.get(URL).map(res => res.json());
  }
  binRequest(name, barcode) {
    let URL = `${this.globalUrl}BinRequest?BarCode=${barcode}&EntryUserName=${name}`;

    return this.http.get(URL)
      .map(res => res.json());
  }

  binRequestCancel(name, barcode) {
    let URL = `${this.globalUrl}BinRequestCancel?BarCode=${barcode}&EntryUserName=${name}`;

    return this.http.get(URL)
      .map(res => res.json());
  }

  retrieveRequest(name, barcode) {
    let URL = `${this.globalUrl}RetrieveRequest?BarCode=${barcode}&EntryUserName=${name}`;

    return this.http.get(URL)
      .map(res => res.json());
  }

  retrieveHold(name, barcode, GateIDOut) {
    let URL = `${this.globalUrl}RetrieveHold?BarCode=${barcode}&EntryUserName=${name}&GateIDOut=${GateIDOut}`;

    return this.http.get(URL)
      .map(res => res.json());
  }

  saveCustomerInfo(barcode, phone, num, name) {
    return this.http.get(`${this.globalUrl}SaveCustomerData?BarCode=${barcode}&CUSTNMBR=${num}&CustomerName=${name}&CustomerPhoneNumber=${phone}`).map(res => res.json())
  }

  RetrieveCancel(barcode) {
    return this.http.get(`${this.globalUrl}RetrieveCancel?BarCode=${barcode}`)
      .map(res => res.json())
  }

  getCurrency(barcode, name) {
    return this.http.get(`${this.globalUrl}GetCurrency?BarCode=${barcode}&EntryUserName=${name}`)
      .map(res => res.json())
  }
  GetPrice(carDuration,SiteID) {
    return this.http.get(`${this.globalUrl}GetPrice?carDuration=${carDuration}&SiteID=${SiteID}`)
      .map(res => res.json())
  }
  getCurrencyTypes() {
    return this.http.get(`${this.globalUrl}GetCurencies`)
      .map(res => res.json())
  }

  saveCash(barcode, username, CollectedAMT , DocAmount, curCode) {
    return this.http.get(`${this.globalUrl}SaveCash?BarCode=${barcode}&EntryUserName=${username}&DocAmount=${DocAmount}&CollectedAMT=${CollectedAMT}&CurrencyCode=${curCode}`)
      .map(res => res.json())
  }

  saveCredit(barcode, username, totalCash, curCode) {
    return this.http.get(`${this.globalUrl}SaveCreditCard?BarCode=${barcode}&EntryUserName=${username}&TotalCreditCard=${totalCash}&CurrencyCode=${curCode}`)
      .map(res => res.json())
  }

  releaseCar(barcode, username) {
    return this.http.get(`${this.globalUrl}ReleaseCar?BarCode=${barcode}&EntryUserName=${username}`)
      .map(res => res.json())
  }
  DoHoldIn(barcode, InPorcessUser) {
    return this.http.get(`${this.globalUrl}DoHoldIn?BarCode=${barcode}&InPorcessUser=${InPorcessUser}`)
      .map(res => res.json())
  }
  DoAttendIn(barcode, InPorcessUser) {
    return this.http.get(`${this.globalUrl}DoAttendIn?BarCode=${barcode}&InPorcessUser=${InPorcessUser}`)
      .map(res => res.json())
  }
  SaveAdvancedPaymentData(barcode, amount) {
    return this.http.get(`${this.globalUrl}SaveAdvancedPaymentData?BarCode=${barcode}&AdvancedPayment=${amount}`)
      .map(res => res.json())
  }


  getAllCustomers() {
    return this.http.get(`${this.globalUrl}Customer/getAll`)
      .map(res => res.json())
  }

  getAllCities() {
    return this.http.get(`${this.globalUrl}shared/getCities`)
      .map(res => res.json())
  }

  getAllNationalities() {
    return this.http.get(`${this.globalUrl}shared/getNationalities`)
      .map(res => res.json())
  }
  addCustomer(customer) {
    return this.http.post(`${this.globalUrl}Customer/add`, customer)
      .map(res => res.json())
  }
  editCustomer(customer) {
    return this.http.post(`${this.globalUrl}Customer/edit`, customer)
      .map(res => res.json())
  }

  getCustomerVehicle(customerNumber) {
    return this.http.get(`${this.globalUrl}VehiclePlate/GetByCustomerNumber?CUSTNMBR=${customerNumber}`)
      .map(res => res.json())
  }

  addVehicle(vehicle) {
    return this.http.post(`${this.globalUrl}VehiclePlate/add`, vehicle)
      .map(res => res.json())
  }

  editVehicle(vehicle) {
    return this.http.post(`${this.globalUrl}VehiclePlate/edit`, vehicle)
      .map(res => res.json())
  }

  saveRelease(barcode , name)
  {
    return this.http.get(`${this.globalUrl}SaveRelease?BarCode=${barcode}&userEmail=${name}`)
      .map(res => res.json())
  }

  getExchange(code , amt)
  {
    return this.http.get(`${this.globalUrl}GetExchange?CountryCode=${code}&AMT=${amt}`)
      .map(res => res.json())
  }
}

