import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ThemeService} from '../shared-services/theme.service';
import {Status} from '../customer-support/customer-support.component';

@Component({
  selector: 'app-customer-support-details',
  templateUrl: './customer-support-details.component.html',
  styleUrls: ['./customer-support-details.component.css']
})
export class CustomerSupportDetailsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['timestamp', 'userid', 'fullname', 'message'];
  dataSource = new MatTableDataSource<Details>(DATA);
  theme: string;

  constructor(private themeService: ThemeService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSend(): void {

  }
}

export interface Details {
  timestamp: string;
  userid: string;
  fullname: string;
  message: string;
}

const DATA: Details[] = [
  {timestamp: 'AAA',  userid: 'A', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'B', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'C', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'D', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'E', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'F', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', userid: 'G', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'H', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'I', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'J', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'K', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'L', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', userid: 'M', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', userid: 'N', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', userid: 'O', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', userid: 'P', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', userid: 'Q', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', userid: 'R', fullname: 'Smith', message: 'DDD'},
  {timestamp: 'AAA', userid: 'S', fullname: 'Smith', message: 'DDD'},
  {timestamp: 'AAA', userid: 'T', fullname: 'Smith', message: 'DDD'},
];
