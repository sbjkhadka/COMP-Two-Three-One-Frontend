import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../shared-services/admin.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ThemeService} from '../../shared-services/theme.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FeedbackDetailsModel} from '../../shared-models/feedback-details.model';

@Component({
  selector: 'app-support-feedback-details',
  templateUrl: './support-feedback-details.component.html',
  styleUrls: ['./support-feedback-details.component.css']
})
export class SupportFeedbackDetailsComponent implements OnInit {

  public messageForm: FormGroup;

  theme: string;
  id = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new BehaviorSubject<MatTableDataSource<any>>(new MatTableDataSource<any>([]));
  displayedColumns: string[] = ['time', 'message'];
  selectedData;

  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private themeService: ThemeService,
              private router: Router) {
    this.selectedData = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    if (!this.selectedData) {
      this.backToMainList();
    }
    this.messageForm = new FormGroup({
      message: new FormControl('')
    });
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.activatedRoute.params.subscribe(value => {
      this.id = value.id;
    });

    if (this.selectedData && this.selectedData.feedbackDetails) {
      this.dataSource.next(new MatTableDataSource<any>(this.selectedData.feedbackDetails));
      setTimeout(() => this.dataSource.value.paginator = this.paginator);
    }
  }

  addMessage(): void {

    const payload: FeedbackDetailsModel = {
      message: this.messageForm.value.message,
      time: this.createDateString()
    };
    this.adminService.addFeedbackMessage(this.id, payload).subscribe(response => {
      if (response.status === 200) {
        this.selectedData.feedbackDetails.unshift(payload);
        this.dataSource.next(new MatTableDataSource<any>(this.selectedData.feedbackDetails));
        setTimeout(() => this.dataSource.value.paginator = this.paginator);
      }
    });
  }

  createDateString(): string {
    const d = new Date();
    let mm = (d.getMonth() + 1) + '';
    let dd = d.getDate() + '';
    const yyyy = d.getFullYear();

    if (mm.length < 2) {
      mm = '0' + mm;
    }
    if (dd.length < 2) {
      dd = '0' + dd;
    }
    return [yyyy, mm, dd].join('-');
  }

  backToMainList(): void {
    this.router.navigate([`supportAndFeedback`]).then();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.value.filter = filterValue.trim().toLowerCase();
  }
}
