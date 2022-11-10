import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sampleDatasource = [
    {
      id: 1,
      code: 25,
      name: 'Test 1',      
    },
    {
      id: 2,
      code: 26,
      name: 'Test 2',      
    },
    {
      id: 3,
      code: 27,
      name: 'Test 3',      
    },
    {
      id: 4,
      code: 28,
      name: 'Test 4',      
    },
    {
      id: 1,
      code: 23,
      name: 'Test 5',      
    }
  ];

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(){
    this.gridContainer.instance.saveEditData();
  }

  cancel(){
    this.gridContainer.instance.cancelEditData();
  }

  edit(e: any){
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.gridContainer.instance.editRow(indexRow);
  }

  delete(e: any){
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.gridContainer.instance.deleteRow(indexRow);
  }

  addRow(){
    this.gridContainer.instance.addRow();
  }

}
