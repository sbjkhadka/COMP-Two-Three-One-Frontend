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

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'status', 'more'];
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
  id: string;
  firstname: string;
  lastname: string;
  status: string;
}

const DATA: Status[] = [
  {id: 'id1', firstname: 'A', lastname: 'Smith', status: 'Closed'},
  {id: 'id2', firstname: 'B', lastname: 'Smith', status: 'Closed'},
  {id: 'id3', firstname: 'C', lastname: 'Smith', status: 'Closed'},
  {id: 'id4', firstname: 'D', lastname: 'Smith', status: 'Closed'},
  {id: 'id5', firstname: 'E', lastname: 'Smith', status: 'Closed'},
  {id: 'id6', firstname: 'F', lastname: 'Smith', status: 'Closed'},
  {id: 'id7', firstname: 'G', lastname: 'Smith', status: 'Working'},
  {id: 'id8', firstname: 'H', lastname: 'Smith', status: 'Working'},
  {id: 'id9', firstname: 'I', lastname: 'Smith', status: 'Working'},
  {id: 'id10', firstname: 'J', lastname: 'Smith', status: 'Working'},
  {id: 'id11', firstname: 'K', lastname: 'Smith', status: 'Working'},
  {id: 'id12', firstname: 'L', lastname: 'Smith', status: 'Working'},
  {id: 'id13', firstname: 'M', lastname: 'Smith', status: 'Working'},
  {id: 'id14', firstname: 'N', lastname: 'Smith', status: 'Working'},
  {id: 'id15', firstname: 'O', lastname: 'Smith', status: 'Working'},
  {id: 'id16', firstname: 'P', lastname: 'Smith', status: 'Working'},
  {id: 'id17', firstname: 'Q', lastname: 'Smith', status: 'Working'},
  {id: 'id18', firstname: 'R', lastname: 'Smith', status: 'Suspended'},
  {id: 'id19', firstname: 'S', lastname: 'Smith', status: 'Suspended'},
  {id: 'id20', firstname: 'T', lastname: 'Smith', status: 'Suspended'},
];

