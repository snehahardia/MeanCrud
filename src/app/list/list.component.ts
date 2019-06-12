import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AddListComponent } from '../add-list/add-list.component';
 import { EditListComponent } from '../edit-list/edit-list.component';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lists: any;

  addListDialogRef: MatDialogRef<AddListComponent>;
  editListDialogRef: MatDialogRef<EditListComponent>;

  constructor(public dialog: MatDialog,
    private listService: ListService,
    private router: Router) { }

  ngOnInit() {
    this.getAllLists();
  }

  openAddListDialog(): void {
    this.addListDialogRef = this.dialog.open(AddListComponent, {
      width: '500px'
    });

    this.addListDialogRef.afterClosed().subscribe(() => {
      this.getAllLists();
   });
  }

  openEditListDialog(id) {
    this.editListDialogRef = this.dialog.open(EditListComponent, {
     width:'500px',
     data: {'id': id}
    });

    this.editListDialogRef.afterClosed().subscribe(() => {
      this.getAllLists();
  });
  }

  getAllLists(){
    this.listService.getLists().subscribe((res) => {
        console.log("response"+res);
        this.lists = res;
      }, err => {
        console.log(err);
      });
  }

  deleteList(id) {
    this.listService.deleteList(id)
      .subscribe(res => {
          this.router.navigate(['./list']);
          this.ngOnInit();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
