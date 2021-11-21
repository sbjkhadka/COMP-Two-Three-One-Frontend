import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import fontawesome from '@fortawesome/fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})

export class ListOfUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'role', 'securityquestion', 'delete'];
  dataSource = new MatTableDataSource<User>(DATA);

  constructor(){
    fontawesome.library.add(faTrashAlt);
  }

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

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  securityquestion: string;
}

const DATA: User[] = [
  {id: 'id1', firstname: 'A', lastname: 'Smith', role: 'admin', securityquestion: '?'},
  {id: 'id2', firstname: 'B', lastname: 'Smith', role: 'admin', securityquestion: '?'},
  {id: 'id3', firstname: 'C', lastname: 'Smith', role: 'pseudo-admin', securityquestion: '?'},
  {id: 'id4', firstname: 'D', lastname: 'Smith', role: 'pseudo-admin', securityquestion: '?'},
  {id: 'id5', firstname: 'E', lastname: 'Smith', role: 'pseudo-admin', securityquestion: '?'},
  {id: 'id6', firstname: 'F', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id7', firstname: 'G', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id8', firstname: 'H', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id9', firstname: 'I', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id10', firstname: 'J', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id11', firstname: 'K', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id12', firstname: 'L', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id13', firstname: 'M', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id14', firstname: 'N', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id15', firstname: 'O', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id16', firstname: 'P', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id17', firstname: 'Q', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id18', firstname: 'R', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id19', firstname: 'S', lastname: 'Smith', role: 'user', securityquestion: '?'},
  {id: 'id20', firstname: 'T', lastname: 'Smith', role: 'user', securityquestion: '?'},
];



