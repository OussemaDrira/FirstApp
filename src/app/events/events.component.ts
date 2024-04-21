import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Evt } from 'src/models/Evt';
import { EventService } from 'src/services/event.service';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  dataEvent:Evt[]=[];
  displayedColumns: string[] = ['1', '2', '3','4','5','6'];
  dataSource = new MatTableDataSource<any>();
  constructor(private ES:EventService , private route: Router, private dialog: MatDialog ){
  }
  ngOnInit(): void {
      this.getAllData();
  }
  getAllData():void
  {
  this.ES.GetAll().subscribe((r)=>{this.dataEvent=r;
    this.dataSource=new MatTableDataSource<Evt>(this.dataEvent)
  })
  }
 

  openDialog(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    const dialogRef=this.dialog.open(EventFormComponent,dialogConfig);
   // this.dialogRef.afterClosed().subscribe(()=>{
      //this.ES.save().subscribe(()=>{
        this.route.navigate(['/events'])
     // })
   // })
  }
}

