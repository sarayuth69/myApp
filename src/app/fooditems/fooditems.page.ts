import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import swal from 'sweetalert';

const newLocal = 'cartList/';
@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.page.html',
  styleUrls: ['./fooditems.page.scss'],
})
export class FooditemsPage implements OnInit {

  item: any;
  table: any;
  constructor(public router: Router,
              private route: ActivatedRoute,
              public database: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: any) => {
        this.table = param;
        console.log(this.table);
      }
    );

    this.database.list(`/cart/${this.table.name}`).valueChanges().subscribe(data => {
      this.item = data;
      console.log(data);
    });
  }
  click(delet) {
    firebase.database().ref(`cart/${this.table.name}/${delet.foodID}`).remove();
    console.log(delet);


  }


}
