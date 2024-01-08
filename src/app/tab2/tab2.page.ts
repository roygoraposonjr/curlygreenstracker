import { Component } from '@angular/core';
import * as moment from 'moment'; 
import { LocalStorageService } from '../services/local-storage.service';

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
  private storage: LocalStorageService | null = null;
  entries: any[] = [];
  

  constructor(private localStorageService: LocalStorageService) {
    // const entries = localStorage.getItem('lettuceEntries');
    
    
  }

  ngOnInit() {
    // Load entries from localStorage on page load
    const entries = this.localStorageService.get('lettuceEntries')?.then((entries) => { 
      console.log("loaded entries");
      // console.log(entries)
      if (entries) {
        this.entries = JSON.parse(entries);
      }
    });
    // const storedEntries = localStorage.getItem('lettuceEntries');
    // if (storedEntries) {
    //   this.entries = JSON.parse(storedEntries);
    // }
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
    // this.localStorageService.set('lettuceEntries', JSON.stringify(this.entries))
    this.localStorageService.set('lettuceEntries', JSON.stringify(this.entries)).then(() => {
      console.log('Entries saved');
    });
    // localStorage.setItem('lettuceEntries', JSON.stringify(this.entries));
    this.resetFields();
  }

  deleteEntry(index: number) {
    this.entries.splice(index, 1);
    // localStorage.setItem('lettuceEntries', JSON.stringify(this.entries));
    this.localStorageService.set('lettuceEntries', JSON.stringify(this.entries)).then(() => {
      console.log('Entry deleted');
    });
  }

  resetFields() {
    this.sowingDate = '';
    this.transplantingDate = '';
    this.harvestDate = '';
    this.disableSaveButton = true;
  }

}
