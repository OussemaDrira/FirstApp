import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit, Component, OnInit, Inject } from '@angular/core'; // Ajout de Inject
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleService } from 'src/services/article.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmeDialogComponent } from '../confirme-dialog/confirme-dialog.component';
import { MatSort } from '@angular/material/sort';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Article } from 'src/models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'type', 'titre', 'createdDate', 'action'];
  nom = "list";
  form!: FormGroup;
  
  tabArticle: Article[] = [];
  datasource = new MatTableDataSource<any>();

  getAllData(): void {
    this.MS.GetAll().subscribe((r) => {
      this.tabArticle = r;
      this.datasource = new MatTableDataSource<any>(this.tabArticle);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MS: ArticleService, private route: Router, private dialog: MatDialog) { // Correction de parenthèse
    this.datasource.data = this.MS.tab;
    

  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.getAllData();
    this.form = new FormGroup({
      
      // Initialisation de form
      // Définir les contrôles du formulaire ici
    });
  }

  delete(id: string): void {
    let dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.OnDelete(id).subscribe((m) => {
          this.datasource = m;
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data));
  }

  openDialogedit(id:string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.MS.getArticlesBYid(id).subscribe((r)=>{
  dialogConfig.data = r;
   
    

    const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)); })
  }
}
