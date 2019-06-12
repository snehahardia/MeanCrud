import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  listForm: FormGroup;

  constructor(private fb: FormBuilder,
    private listService: ListService,
    public dialogRef: MatDialogRef<AddListComponent>) {

      this.listForm = this.fb.group ({
        'title'    : new FormControl(""),
        'description' : new FormControl("")
      });
     }

  ngOnInit() {
  }

  saveList(formdata:any) {
    let theForm = this.listForm.value;
       this.listService.addList(theForm).subscribe(data => {
             this.ngOnInit();
             this.dialogRef.close();
           this.listForm.reset();
       });
     }

     close() {
         this.dialogRef.close();
     }

}
