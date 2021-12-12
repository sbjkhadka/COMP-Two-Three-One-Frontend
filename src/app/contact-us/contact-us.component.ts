import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../shared-services/theme.service';
import {ContactUsModel} from '../shared-models/contact-us.model';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {AdminService} from '../shared-services/admin.service';
import {SessionStorageService} from '../shared-services/session-storage.service';
import {SnackbarService} from '../shared-services/snackbar.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm = new FormGroup({});

  model: ContactUsModel = {
    type: 'Support',
    message: ''
  };
  contactUsFormField: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      defaultValue: 'support',
      templateOptions: {
        label: 'Request type',
        options: [
          {label: 'Support', value: 'Support'},
          {label: 'Feedback', value: 'Feedback'}
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
  constructor(private sessionStorageService: SessionStorageService,
              private themeService: ThemeService,
              private adminService: AdminService,
              private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.currentUser = JSON.parse(this.sessionStorageService.getItem('logged_in_user')).user;
  }

  submitContactUsForm(model: ContactUsModel): void {
    model.user = this.currentUser._id;
    model.userEmail = this.currentUser.email;
    if (model.type === 'Support') {
      model.status = 'Open';
    }
    this.adminService.sendFeedbackOrRequest(model).subscribe(value => {
      this.snackBarService.openSnackBar(`${model.type} Added`);
      window.location.href = '/home';
    }, error1 => {
      this.snackBarService.openSnackBar(`Could not add your ${model.type}`);
    });
  }

}
