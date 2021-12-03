import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../shared-services/services/local-storage.service';
import {ThemeService} from '../shared-services/theme.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  currentUser: any;
  theme: string;
  constructor(private localStorageService: LocalStorageService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.currentUser = JSON.parse(this.localStorageService.getItem('logged_in_user')).user;
  }

}
