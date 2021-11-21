import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ThemeService} from '../shared-services/theme.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  theme: string;
  constructor(private themeService: ThemeService) {

  }

  selectedType: string;

  types: Type[] = [
    {value: 'support', viewValue: 'Support'},
    {value: 'review', viewValue: 'Review'},
  ];

  contactUsForm: FormGroup;

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

  onSend(): void {

  }

}