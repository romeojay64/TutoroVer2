import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class DataProvider {

  items =  []

  constructor(public http: HttpClient, private afStore: AngularFirestore) {
    this.afStore.collection("interests").doc('uyeUjV7YYpTxpV2bBNRk').get().subscribe(ref =>{
    this.items = ref.data().subjects;
    
  })
  }

  filterItems(searchTerm){

    // return this.items.filter((item) => {
    //     return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    // });   
    const val = searchTerm.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }  



}
