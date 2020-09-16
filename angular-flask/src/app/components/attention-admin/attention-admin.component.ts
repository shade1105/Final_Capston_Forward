import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attention-admin',
  templateUrl: './attention-admin.component.html',
  styleUrls: ['./attention-admin.component.scss']
})
export class AttentionAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

     const ab = document.getElementById("abs");
     const inner = ab.innerHTML;
     const word = "결석";
     const reg = new RegExp(word,"g");
     ab.innerHTML = inner.replace(reg, '<span style="color:red">'+ word +'</span>');

  }



}
