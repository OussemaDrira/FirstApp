import { Component } from '@angular/core';
import { CLOBAL } from '../app_config'
import { Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { ConfirmeDialogComponent } from '../confirme-dialog/confirme-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/models/Memebre';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  constructor(private MS: MemberService, private router: Router, public dialog: MatDialog) {


  }
  datasource: Member[] = this.MS.tab;




  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate', 'action'];

  delete(id: string): void {
    // ouvrir le boite dialgue 
    // atendre le resulatat de l'utilisateur 
    // if click sure comfirme 
    let dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.OnDelete(id).subscribe((m) => {
          // poniter sure la methode  de service
          this.datasource = m;
        });


      }
    });}}



