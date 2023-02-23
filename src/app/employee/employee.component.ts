import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import EmployeeService from '../service/employee-service';
import JobPositionService from '../service/job-position-service';
import JobTitleService from '../service/job-title-service';
import { IEmployee } from '../types/employee';
import { IJobPosition } from '../types/job-title';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private jobPositionService: JobPositionService, private jobTitleService: JobTitleService) {
    this.changevalue = this.changevalue.bind(this)
   }

  ngOnInit(): void {
    this.getList()
    this.getPositions()
    // this.getTitles()
  }
  dataSource : IEmployee[] = [];
  jobPosition : IJobPosition[] = [];

  getList(): void {
    this.employeeService.getList()
      .subscribe((listEmployee: any) => this.dataSource = listEmployee)
  }

  // getTitles(): void {
  //   this.jobTitleService.getList()
  //     .subscribe((listTitle: any) => this.jobTitle = listTitle)
  // }

  getPositions(): void {
    this.jobPositionService.getList()
      .subscribe((listPosition: any) => this.jobPosition = listPosition)
  }

  create(name: string, nik: string, address: string,  jobTitleId: string, jobPositionId: string): void {
    
    name = name.trim();
    nik = nik.trim();
    address = address.trim();

    if (!name || !nik || !jobPositionId) { return; }
    
    this.employeeService.create({ name, nik, address, jobPositionId, jobTitleId} as IEmployee)
      .subscribe((newEmployee) => {
        this.dataSource.push(newEmployee);
      });
  }

  update(id: string, name: string, nik: string, address: string, jobTitleId: string,  jobPositionId: string): void {
    name = name.trim();
    nik = nik.trim();
    address = address.trim();

    if (!name || !nik || !jobPositionId || !jobTitleId) { return; }
    this.employeeService.update({ id, name, nik, jobPositionId, jobTitleId, address } as IEmployee)
      .subscribe();
  }

  deleteEmployee(id: string): void {
    this.employeeService.delete(id).subscribe();
  }

  changevalue (rowData: any, value: any) : void{
    // (<any> this).defaultSetCellValue(rowData, value);
    console.log('job position', this.jobPosition);
    const jobPosition : any = this.jobPosition.find((jobPos: IJobPosition) => jobPos.id === value)
    rowData.jobTitleName = jobPosition.titleName
  }

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any){
    if (!e.data.id) {
      this.create(e.row.data.name, e.row.data.nik, e.row.data.address, e.row.data.jobTitleId, e.row.data.jobPositionId)
    } else {
      this.update(e.row.data.id, e.row.data.name, e.row.data.nik, e.row.data.address, e.row.data.jobTitleId, e.row.data.jobPositionId)
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
    this.deleteEmployee(e.id)
    this.gridContainer.instance.deleteRow(indexRow);
  }

  addRow(){
    this.gridContainer.instance.addRow();
  }

}
