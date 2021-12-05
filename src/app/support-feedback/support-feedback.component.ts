import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../shared-services/admin.service';
import {ThemeService} from '../shared-services/theme.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-support-feedback',
  templateUrl: './support-feedback.component.html',
  styleUrls: ['./support-feedback.component.css']
})
export class SupportFeedbackComponent implements OnInit {
  control = new FormControl('all');
  heading = 'Supports and Feedbacks';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  theme: string;
  feedbacks = [];
  feedbackTemp = [];
  displayedColumns: string[] = ['type', 'status', 'email', 'message', 'action'];
  dataSource = new BehaviorSubject<MatTableDataSource<any>>(new MatTableDataSource<any>([]));

  constructor(private adminService: AdminService,
              private themeService: ThemeService,
              private router: Router) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.getAllSupportsAndFeedbacks();
    this.control.valueChanges.subscribe(value => {
    this.feedbackTemp = this.feedbacks;
    switch (value) {
        case 'all': {
          this.feedbackTemp = this.feedbacks;
          this.heading = 'Supports and Feedbacks';
          break;
        } default: {
          this.feedbackTemp = this.feedbacks.filter(feedback => feedback.type === value);
          this.heading = value;
          break;
        }
      }
    this.dataSource.next(new MatTableDataSource<any>(this.feedbackTemp));
    this.dataSource.value.paginator = this.paginator;
    });
  }

  getAllSupportsAndFeedbacks(): void {
    this.adminService.getAllSupportsAndFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks.feedbacks;
      this.feedbackTemp = feedbacks.feedbacks;
      this.dataSource = new BehaviorSubject<MatTableDataSource<any>>(new MatTableDataSource<any>(feedbacks.feedbacks));
      this.dataSource.value.paginator = this.paginator;
      console.log('fe', feedbacks);
    });
  }

  navigateToDetailsPage(element: any): void {
    this.router.navigate([`supportAndFeedback/${element._id}`], { state: element }).then(v => {  });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.value.filter = filterValue.trim().toLowerCase();
  }

}
