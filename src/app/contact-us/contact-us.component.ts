import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../shared-services/local-storage.service';
import {ThemeService} from '../shared-services/theme.service';
import {ContactUsModel} from '../shared-models/contact-us.model';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm = new FormGroup({});

  model: ContactUsModel = {
    request: 'support',
    message: ''
  };
  contactUsFormField: FormlyFieldConfig[] = [
    {
      key: 'request',
      type: 'select',
      defaultValue: 'support',
      templateOptions: {
        label: 'Request type',
        options: [
          {label: 'Support', value: 'support'},
          {label: 'Feedback', value: 'feedback'}
        ]
      }
    },
    {
      key: 'message',
      type: 'textarea',
      templateOptions: {
        label: 'Message',
        placeholder: '...',
        description: 'Please enter your brief message',
        required: true,
        rows: 10
      }
    }
  ];
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

  submitContactUsForm(model: ContactUsModel): void {
    console.log('model', model);
  }

}
