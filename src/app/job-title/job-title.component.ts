import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import JobTitleService from '../service/job-title-service';
import { IJobTitle } from '../types/job-title';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  constructor(private jobtTitleService: JobTitleService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList(): void {
    this.jobtTitleService.getList()
      .subscribe((listJob: any) => this.dataSource = listJob)
  }

  create(name: string, code: string): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code) { return; }
    this.jobtTitleService.create({ name, code } as IJobTitle)
      .subscribe((newJobTitle) => {
        // this.getList();
      });
  }

  update(id: number, name: string, code: string): void {
    name = name.trim();
    code = code.trim();
    if (!name || !code) { return; }
    this.jobtTitleService.update({ id, name, code } as IJobTitle)
      .subscribe();
  }


  deleteTitle(id: string): void {
    this.jobtTitleService.delete(id).subscribe();
  }
  dataSource: IJobTitle[] = [];

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any) {
    if (!e.data.id) {
      this.create(e.row.data.name, e.row.data.code)
    } else {
      this.update(e.row.data.id, e.row.data.name, e.row.data.code)
    }
    this.gridContainer.instance.saveEditData();
  }

  cancel() {
    this.gridContainer.instance.cancelEditData();
  }

  edit(e: any) {
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.gridContainer.instance.editRow(indexRow);
  }

  delete(e: any) {
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.deleteTitle(e.id)
    this.gridContainer.instance.deleteRow(indexRow);
  }

  addRow() {
    this.gridContainer.instance.addRow();
  }

}
