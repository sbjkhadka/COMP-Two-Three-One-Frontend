import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ThemeService} from '../../../shared-services/theme.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  theme: string;
  itemName;
  itemType;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private themeService: ThemeService) {
    dialogRef.disableClose = true;
    this.itemName = data.itemName;
    this.itemType = data.itemType;
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }

}
