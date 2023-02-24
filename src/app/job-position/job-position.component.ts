import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import JobPositionService from '../service/job-position-service';
import JobTitleService from '../service/job-title-service';
import { IJobPosition } from '../types/job-title';

@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.scss']
})
export class JobPositionComponent implements OnInit {

  constructor(private jobPositionService: JobPositionService, private jobTitleService: JobTitleService) { }

  ngOnInit(): void {
    this.getList()
    this.getTitles()
  }

  getList(): void {
    this.jobPositionService.getList()
      .subscribe(  {
        next: (v) => this.dataSource = v,
        error: (e) => alert("Fail to fetch data")
      })
  }

  getTitles(): void {
    this.jobTitleService.getList()
      .subscribe(  {
        next: (v: any) => this.jobTitle = v,
        error: (e) => alert("Fail to save")
      })
  }

  create(name: string, code: string, titleId: number): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code || !titleId) { return; }
    this.jobPositionService.create({ name, code, titleId } as IJobPosition)
      .subscribe(
        {
          next: (v) => this.gridContainer.instance.saveEditData(),
          error: (e) => alert("Fail to save")
        }
      );
  }

  update(id: number, name: string, code: string, titleId: number): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code ||!titleId) { return; }
    this.jobPositionService.update({ id, name, code, titleId } as IJobPosition)
      .subscribe(
        {
          next: (v) => this.gridContainer.instance.saveEditData(),
          error: (e) => alert("Fail to save")
        }
      );
  }

  dataSource: IJobPosition[] = [];
  jobTitle = []

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any){
    if (!e.data.id) {
      this.create(e.row.data.name, e.row.data.code, e.row.data.titleId)
    } else {
      this.update(e.row.data.id, e.row.data.name, e.row.data.code, e.row.data.titleId)
    }
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
    if(confirm("are you sure want to delete?")){
      this.jobPositionService.delete(e.id).subscribe(
        {
          next: (v) => this.gridContainer.instance.deleteRow(indexRow),
          error: (e) => alert("Fail to delete")
        }
      );
    }
  }

  addRow(){
    this.gridContainer.instance.addRow();
  }

}
