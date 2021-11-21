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

  displayedColumns: string[] = ['timestamp', 'ticketid', 'userid', 'fullname', 'message'];
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
  ticketid: string;
  userid: string;
  fullname: string;
  message: string;
}

const DATA: Details[] = [
  {timestamp: 'AAA', ticketid: 'id1', userid: 'A', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id2', userid: 'B', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id3', userid: 'C', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id4', userid: 'D', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id5', userid: 'E', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id6', userid: 'F', fullname: 'Smith', message: 'AAA'},
  {timestamp: 'AAA', ticketid: 'id7', userid: 'G', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id8', userid: 'H', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id9', userid: 'I', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id10', userid: 'J', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id11', userid: 'K', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id12', userid: 'L', fullname: 'Smith', message: 'BBB'},
  {timestamp: 'AAA', ticketid: 'id13', userid: 'M', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', ticketid: 'id14', userid: 'N', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', ticketid: 'id15', userid: 'O', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', ticketid: 'id16', userid: 'P', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', ticketid: 'id17', userid: 'Q', fullname: 'Smith', message: 'CCC'},
  {timestamp: 'AAA', ticketid: 'id18', userid: 'R', fullname: 'Smith', message: 'DDD'},
  {timestamp: 'AAA', ticketid: 'id19', userid: 'S', fullname: 'Smith', message: 'DDD'},
  {timestamp: 'AAA', ticketid: 'id20', userid: 'T', fullname: 'Smith', message: 'DDD'},
];
