import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  foods;
  table = [
    {name: 'TABLE_1'},
    {name: 'TABLE_2'},
    {name: 'TABLE_3'},
    {name: 'TABLE_4'},
    {name: 'TABLE_5'},
    {name: 'TABLE_6'},
    {name: 'TABLE_7'},
    {name: 'TABLE_8'},
    {name: 'TABLE_9'}
  ];
  constructor(public router: Router, public database: AngularFireDatabase,  private route: ActivatedRoute ) {
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    this.database.list('/tablemenu/'),  ref => ref.orderByChild('').limitToLast(3).valueChanges().subscribe( data => {
      this.foods = data.reverse();
  });
}

  onclick(table) {
   this.router.navigate([ '/menu' , table ]);

 }
}


