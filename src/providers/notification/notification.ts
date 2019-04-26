import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {URL} from '../global-url';

@Injectable()
export class NotificationProvider {

  constructor(public http: Http) { }

  setUserToken(model)
  {
    let header = new Headers();
    header.append('Content-Type' , 'application/json');

    return this.http.post(`${URL.url}SetFireBaseUID` , JSON.stringify(model) , {headers : header})
      .map(res => res.json())
  }

  getOnlineUsers(site)
  {
      return this.http.get(`${URL.url}GetFireBaseUsers?SiteID=${site}`)
        .map(res => res.json())
  }

  getHandoverUsers(site)
  {
    return this.http.get(`${URL.url}GetHandOverUsers?SiteID=${site}`)
      .map(res => res.json())
  }

  getHandoverCar(user , barcode)
  {
    return this.http.get(`${URL.url}GetHandOverCar?BarCode=${barcode}&InPorcessUser=${user}`)
      .map(res => res.json())
  }

  getCarData(barcode)
  {
    return this.http.get(`${URL.url}GetCarData?BarCode=${barcode}`)
      .map(res => res.json())
  }

  sendAmountNotification(token : string, senderData : any, amount? : number ) {

    let body = {
      "notification":{
        "title":"New Notification has arrived",
        "body": `${senderData.message}`,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "isHandover" : false,
        "amount" : amount,
        "senderToken" : senderData.senderToken,
        "senderEmail" : senderData.senderEmail,
        "type": senderData.type,
        "message": senderData.message,
        "barcode": senderData.barcode
      },
      "to":`${token}`,
      "priority":"high",
      "restricted_package_name":""
    };

    let options = new Headers();
    options.append('Content-Type' , 'application/json');
    options.append('Authorization' , 'key=AAAAT6rOnsQ:APA91bFS0R9KVdaIVEtz5N3T-9LmLw_rG7TetBhhlQmPWpyi6ouo0Nhvo-N0PspTDy3-XLchVbmbl2R8NiiO9GWxxLvefudaUXUWJ8o9Sb4sZtxWTmsBznCO32Xr6ZXcHkgATMG9QYFH');

  return this.http.post(
            "https://fcm.googleapis.com/fcm/send",
            body,
            {headers: options});
  }

  sendHandoverNotification(token : string, senderData : any) {

    let body = {
      "notification":{
        "title":"New Notification has arrived",
        "body": `${senderData.message}`,
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "isHandover" : true,
        "senderToken" : senderData.senderToken,
        "senderEmail" : senderData.senderEmail,
        "type": senderData.type,
        "message": senderData.message,
        "barcode" : senderData.barcode
      },
      "to":`${token}`,
      "priority":"high",
      "restricted_package_name":""
    };

    let options = new Headers();
    options.append('Content-Type' , 'application/json');
    options.append('Authorization' , 'key=AAAAT6rOnsQ:APA91bFS0R9KVdaIVEtz5N3T-9LmLw_rG7TetBhhlQmPWpyi6ouo0Nhvo-N0PspTDy3-XLchVbmbl2R8NiiO9GWxxLvefudaUXUWJ8o9Sb4sZtxWTmsBznCO32Xr6ZXcHkgATMG9QYFH');

    return this.http.post(
      "https://fcm.googleapis.com/fcm/send",
      body,
      {headers: options});
  }
}
