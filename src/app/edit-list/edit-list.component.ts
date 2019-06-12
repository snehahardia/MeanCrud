import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListService } from '../List.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IList } from '../list';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  public currentList: any;

  listid:any;
  updateListForm: FormGroup;

  constructor(private fb: FormBuilder,
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.listid = data.id;
         console.log("id---"+data.id);
         this.updateListForm = this.fb.group ({
          'title'    : new FormControl(""),
          'description' : new FormControl("")
        });
    }

  ngOnInit() {
    this.getOneList(this.listid);
  }

  getOneList(id){
    this.listService.getList(id).subscribe((res) => {
        console.log("one list--"+res);
          this.currentList = res;
          this.populateForm(this.currentList);
        }, err => {
          console.log(err);
        });
  }
  
  populateForm(data): void {
    this.updateListForm.patchValue({
      title: data.title,
      description: data.description
    });
  }
   
  updateList(formdata:any){
      let theForm = this.updateListForm.value;
      this.listService.editList(this.listid, theForm).subscribe((res) => {
        this.router.navigate(['/']);
        this.dialogRef.close();
        this.updateListForm.reset();
      });
  }

}
