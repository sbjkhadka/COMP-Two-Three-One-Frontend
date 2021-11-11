import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  infoType: string;
  infoName: string;
  constructor(private dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    dialogRef.disableClose = true;
    this.infoType = data.infoType;
    this.infoName = data.infoName;
  }

  ngOnInit(): void {
  }

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }

}
