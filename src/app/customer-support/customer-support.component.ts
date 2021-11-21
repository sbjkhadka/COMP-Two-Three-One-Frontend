import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ThemeService} from '../shared-services/theme.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['ticketid', 'customerfullname', 'status', 'more'];
  dataSource = new MatTableDataSource<Status>(DATA);
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

  openDetails(): void {
    window.location.href = '/customersupportdetails';
  }

}

export interface Status {
  ticketid: string;
  customerfullname: string;
  status: string;
}

const DATA: Status[] = [
  {ticketid: 'id1', customerfullname: 'A', status: 'Closed'},
  {ticketid: 'id2', customerfullname: 'B', status: 'Closed'},
  {ticketid: 'id3', customerfullname: 'C', status: 'Closed'},
  {ticketid: 'id4', customerfullname: 'D', status: 'Closed'},
  {ticketid: 'id5', customerfullname: 'E', status: 'Closed'},
  {ticketid: 'id6', customerfullname: 'F', status: 'Closed'},
  {ticketid: 'id7', customerfullname: 'G', status: 'Working'},
  {ticketid: 'id8', customerfullname: 'H', status: 'Working'},
  {ticketid: 'id9', customerfullname: 'I', status: 'Working'},
  {ticketid: 'id10', customerfullname: 'J', status: 'Working'},
  {ticketid: 'id11', customerfullname: 'K', status: 'Working'},
  {ticketid: 'id12', customerfullname: 'L', status: 'Working'},
  {ticketid: 'id13', customerfullname: 'M', status: 'Working'},
  {ticketid: 'id14', customerfullname: 'N', status: 'Working'},
  {ticketid: 'id15', customerfullname: 'O', status: 'Working'},
  {ticketid: 'id16', customerfullname: 'P', status: 'Working'},
  {ticketid: 'id17', customerfullname: 'Q', status: 'Working'},
  {ticketid: 'id18', customerfullname: 'R', status: 'Suspended'},
  {ticketid: 'id19', customerfullname: 'S', status: 'Suspended'},
  {ticketid: 'id20', customerfullname: 'T', status: 'Suspended'},
];

