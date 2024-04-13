import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './article-form/article-form.component';
const routes: Routes = [
  {
    path: 'create',
    pathMatch:'full',
    component:MemberFormComponent
  },{
    path: 'cre',
    pathMatch:'full',
    component:ArticleFormComponent
  },
  {
    path: 'dashboard',
    pathMatch:'full',
    component:DashbordComponent
  },
  {
    path: 'tools',
    pathMatch:'full',
    component:ToolsComponent
  },
  {
    path: 'articles',
    pathMatch:'full',
    component:ArticlesComponent
  },
  {
    path: 'events',
    pathMatch:'full',
    component:EventsComponent
  },
  {
    path: 'member',
    pathMatch:'full',
    component:MemberComponent
  },
  {
    path: 'login',
    pathMatch:'full',
    component:LoginComponent
  },{
    path: '',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path: ':id/edit',
    pathMatch:'full',
    component:MemberFormComponent,
    
  },
  {
    path: ':id/edittt',
    pathMatch:'full',
    component:ArticleFormComponent,
    
  },
  // un route differat de l'autre route 
  {
    path:'**',
    redirectTo:'members'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
