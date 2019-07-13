import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import swal from 'sweetalert';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  food;
  table: any;
  foodleangth: any;
  // tslint:disable-next-line:max-line-length
  constructor(public router: Router,
              public database: AngularFireDatabase,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.database.list('/tablemenu/').valueChanges().subscribe(data => {
      this.food = data;
      this.foodleangth = data.length + 1;
      console.log(this.foodleangth);
    });
    this.route.params.subscribe(
      (param: any) => {
        this.table = param;
        console.log(this.table);
      }
    );

  }
  showmenu() {
    this.router.navigate([ '/fooditems' , this. table ]);
  }
  async onClick(item) {
    firebase.database().ref('cart/' + this.table.name + '/' + item.foodID).once('value').then(data => {
      const list = data.val();
      if (list == null) {
        const cart = {
          foodID: item.foodID,
          foodname: item.foodname,
          foodprice: item.foodprice,
          foodtype: item.foodtype,
          amount: 1,
          day: new Date(),
          status: 1,
          sum: item.foodprice,
          placeID: 1
        };
        const update = {};
        update['cart/' + this.table.name + '/' + item.foodID] = cart;
        firebase.database().ref().update(update);
        swal('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
      } else {
        if (data.val().foodID && item.foodID) {
          const cart = {
            foodID: item.foodID,
            foodname: item.foodname,
            foodprice: item.foodprice,
            foodtype: item.foodtype,
            day: new Date(),
            status: 1,
            placeID: 1,
            amount: list.amount + 1,
            sum: list.sum + list.foodprice,
          };
          const update = {};
          update['cart/' + this.table.name + '/' + item.foodID] = cart;
          firebase.database().ref().update(update);
          swal('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
        } else {
          const cart = {
            foodID: item.foodID,
            foodname: item.foodname,
            foodprice: item.foodprice,
            foodtype: item.foodtype,
            amount: 1,
            day: new Date(),
            status: 1,
            sum: item.foodprice,
            placeID: 1
          };
          const update = {};
          update['cart/' + this.table.name + '/' + item.foodID] = cart;
          firebase.database().ref().update(update);
          swal('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
        
        }
      }
    });

    // const  cart = {
    //   foodID: item.foodID,
    //   foodname: item.foodname,
    //   foodprice: item.foodprice,
    //   foodtype: item.foodtype,
    //   amount: 1,
    //   day: 0,
    //   status: 1,
    //   sum: 0,
    //   placeID: 1
    // };
    // const update = {};
    // update['cart/'  + this.table.name] = cart;
    // firebase.database().ref().update(update);
    // swal('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');

  }


  // click(item) {
  //   const  updatemenu = {
  //       foodID: item.foodID,
  //       foodname: item.foodname,
  //       foodprice: item.foodprice,
  //       foodtype: item.foodtype,

  //     };
  //     const update = {};
  //     update['tablemenu/' + this.foodleangth ] = updatemenu;
  //     firebase.database().ref().update(update);
  //     swal('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
  // }

}
