import { Component } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  subSites : Array<any>;
  siteId;
  subSiteId;

  constructor( private storage : NativeStorage) {

  }

  ionViewWillEnter()
  {
      this.storage.getItem("site_id")
          .then((res)=>
          {
              this.storage.getItem("subsites").then((result)=>
              {
                  this.subSites = result;
              })
          })
  }
  selectSubSitesId(id : string)
  {
    this.storage.setItem("subsite_id" , id)
        .then(()=>
        {
          this.subSiteId = id;
          console.log("subsite id set to "+ id);
        });
  }
}
