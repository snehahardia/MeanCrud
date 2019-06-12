import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list/list.component';
import { AddListComponent } from './add-list/add-list.component';
import { EditListComponent } from './edit-list/edit-list.component';

const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'list' },
  {
    path:'list',
    component: ListComponent
  },
  {
    path:'add',
    component: AddListComponent 
  },
  {
    path:'list/edit/:id',
    component: EditListComponent 
  }
];

@NgModule({
  declarations: [
    ListComponent,
    AddListComponent,
    EditListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
