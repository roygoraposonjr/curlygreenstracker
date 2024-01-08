import { Component } from '@angular/core';
import * as moment from 'moment'; 


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public sowingDate =  moment().format('YYYY-MM-DD');
  public transplantingDate = '';
  public harvestDate = '';
  public disableSaveButton = true;
  entries: any[] = [];
  

  constructor() {
    const entries = localStorage.getItem('lettuceEntries');
    if (entries) {
      this.entries = JSON.parse(entries);
    }
  }

  ngOnInit() {
    // Load entries from localStorage on page load
    const storedEntries = localStorage.getItem('lettuceEntries');
    if (storedEntries) {
      this.entries = JSON.parse(storedEntries);
    }
    // this.calculateDates();
  }

  calculateDates() {
    const selectedDate = moment(this.sowingDate);
    this.transplantingDate = selectedDate.add(15, 'days').format('YYYY-MM-DD');
    this.harvestDate = selectedDate.add(30, 'days').format('YYYY-MM-DD');
    this.disableSaveButton = false;
  }

  saveEntry() {
    const entry = {
      sowingDate: this.sowingDate,
      transplantingDate: this.transplantingDate,
      harvestDate: this.harvestDate,
    };
    this.entries.unshift(entry);
    localStorage.setItem('lettuceEntries', JSON.stringify(this.entries));
    this.resetFields();
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    localStorage.setItem('lettuceEntries', JSON.stringify(this.entries));
  }

  resetFields() {
    this.sowingDate = '';
    this.transplantingDate = '';
    this.harvestDate = '';
    this.disableSaveButton = true;
  }

}
