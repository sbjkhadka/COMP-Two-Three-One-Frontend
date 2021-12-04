import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../shared-services/admin.service';
import {BehaviorSubject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {ThemeService} from '../shared-services/theme.service';
import {ConfirmationDialogComponent} from '../home/generic-dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  theme: string;
  users = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  dataSource = new BehaviorSubject<MatTableDataSource<any>>(new MatTableDataSource<any>([]));

  constructor(private adminService: AdminService,
              private themeService: ThemeService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.getUserList();
  }

  getUserList(): void {
    this.adminService.getUserList().subscribe(users => {
      console.log('user_list', users.users);
      this.users = users.users;
      this.dataSource = new BehaviorSubject<MatTableDataSource<any>>(new MatTableDataSource<any>(users.users));
      this.dataSource.value.paginator = this.paginator;
    });
  }

  deleteUser(element): void {
    this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px',
      panelClass: 'no-padding-container',
      data: {
        itemName: 'User',
        itemType: 'Delete'
      }
    }).afterClosed().subscribe(decision => {
      if (decision) {
        this.adminService.deleteUser(element.email.trim()).subscribe(deleteSuccess => {
          if (deleteSuccess.status === 200) {
            const index = this.users.findIndex(user => user.email.trim() === element.email.trim());
            if (index >= 0) {
              this.users.splice(index, 1);
              this.dataSource.next(new MatTableDataSource<any>(this.users));
              this.dataSource.value.paginator = this.paginator;
            }
          }
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.value.filter = filterValue.trim().toLowerCase();
  }

}
