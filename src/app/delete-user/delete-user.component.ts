import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../shared-services/theme.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  theme: string;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

}
