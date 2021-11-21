import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-customer-support-feedback',
  templateUrl: './customer-support-feedback.component.html',
  styleUrls: ['./customer-support-feedback.component.css']
})
export class CustomerSupportFeedbackComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'feedback'];
  dataSource = new MatTableDataSource<Feedback>(DATA);

  constructor() { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface Feedback {
  id: string;
  firstname: string;
  lastname: string;
  feedback: string;
}

const DATA: Feedback[] = [
  {id: 'id1', firstname: 'A', lastname: 'Smith', feedback: 'AAA'},
  {id: 'id2', firstname: 'B', lastname: 'Smith', feedback: 'AAA'},
  {id: 'id3', firstname: 'C', lastname: 'Smith', feedback: 'BBB'},
  {id: 'id4', firstname: 'D', lastname: 'Smith', feedback: 'BBB'},
  {id: 'id5', firstname: 'E', lastname: 'Smith', feedback: 'BBB'},
  {id: 'id6', firstname: 'F', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id7', firstname: 'G', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id8', firstname: 'H', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id9', firstname: 'I', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id10', firstname: 'J', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id11', firstname: 'K', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id12', firstname: 'L', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id13', firstname: 'M', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id14', firstname: 'N', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id15', firstname: 'O', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id16', firstname: 'P', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id17', firstname: 'Q', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id18', firstname: 'R', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id19', firstname: 'S', lastname: 'Smith', feedback: 'CCC'},
  {id: 'id20', firstname: 'T', lastname: 'Smith', feedback: 'CCC'},
];
