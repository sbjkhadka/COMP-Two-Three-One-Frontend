import { Component, OnInit } from '@angular/core';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  activeUser;
  activeUserRecipe;
  constructor(public activeUserSingletonService: ActiveUserSingletonService) {
    this.activeUser =  this.activeUserSingletonService.activeUser;
    this.activeUserRecipe = this.activeUserSingletonService.activeUserRecipe;
  }


  ngOnInit(): void {
  }



}
