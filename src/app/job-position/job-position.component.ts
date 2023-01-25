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
      .subscribe((listJob: any) => this.sampleDatasource = listJob.data)
  }

  getTitles(): void {
    this.jobTitleService.getList()
      .subscribe((listTitle: any) => this.jobTitle = listTitle.data)
  }

  create(name: string, code: string, titleId: number): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code) { return; }
    this.jobPositionService.create({ name, code, titleId } as IJobPosition)
      .subscribe((newJobTitle) => {
        this.sampleDatasource.push(newJobTitle);
      });
  }

  update(id: number, name: string, code: string, titleId: number): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code) { return; }
    this.jobPositionService.update({ id, name, code, titleId } as IJobPosition)
      .subscribe();
  }



  sampleDatasource: IJobPosition[] = [];
  jobTitle = []

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any){
    if (!e.data.id) {
      this.create(e.row.data.name, e.row.data.code, e.row.data.titleId)
    } else {
      this.update(e.row.data.id, e.row.data.name, e.row.data.code, e.row.data.titleId)
    }
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
