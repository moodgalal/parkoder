import { Injectable } from "@angular/core";

@Injectable()
export class PublicShared {
  public static CurrentUserName;
  public static CurrentUserToken;
  public static CurrentUserExt;
  public static CurrentSite = {
    SiteID: -1, SiteName: 'ALL', CurrencyCode: ''
    , VehicleType: true, VehicleColor: true, VehicleBrand: true, VehicleStatus: true
    , Scratchs: true, ScratchImage: true
  };
  public static CurrentGate = { GateID: -1, GateName: 'ALL' };
  public static CurrentBarking = { SubSiteID: -1, SubSiteName: 'ALL' };

  public static GateList: Array<any> = [];
  public static ParkingList: Array<any> = [];
  public static transactions: Array<any> = null;
  public static Ticket: any = {};

  public  inProcessUser : boolean = true;
}
