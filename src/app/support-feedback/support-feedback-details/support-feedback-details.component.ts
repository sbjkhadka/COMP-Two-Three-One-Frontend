import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-support-feedback-details',
  templateUrl: './support-feedback-details.component.html',
  styleUrls: ['./support-feedback-details.component.css']
})
export class SupportFeedbackDetailsComponent implements OnInit {

  id = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.id = value.id;
    });
  }

}
