import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BidData } from "../auth/models/bid-data.model";
import { Observable } from "rxjs";
import { IBids } from "../frontend models/bids";

@Injectable({ providedIn: "root" })
export class BidService {

    constructor(private http: HttpClient, private router: Router) {}

    bidsubmit( bidAmount:number, timeDuration:number, userId:string, title:string,  bidDescription: string, username:string){
        const bidData:BidData ={bidAmount:bidAmount, timeDuration:timeDuration , userId :userId,title:title, bidDescription: bidDescription, username: username};
        this.http.post('/api/submitbid', bidData).subscribe(response=>{
        console.log(response);
           })
         }

 getbids():Observable<{success: Boolean, message: String, bids:IBids[]}>{
    let url = "/api/getbids";
    return this.http.get<{success: Boolean, message: String, bids:IBids[]}>(url)
    }

}
