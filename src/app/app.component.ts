import { Component, OnInit } from '@angular/core';
import { AddressItem } from './models/address-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  addressItems: AddressItem[] = [{
    id: 501,
    name: 'Khali Zhang',
    location: 'Shanghai',
    office: 'C-103',
    officePhone: 'x55778',
    cellPhone: '650-353-1239'
  }];
  selectAllChecked = false;

  sortStatus = {
    id: null,
    name: null,
    location: null,
    office: null,
    officePhone: null,
    cellPhone: null
  };

  ngOnInit() {
    this.addressItems.forEach((item) => {
      item.checked = false;
    });
  }

  addAnAddress = () => {
    this.addressItems.push({
      name: '',
      location: '',
      office: '',
      officePhone: '',
      cellPhone: '',
      itemInEditingMode: true
    });
  }

  startEditingCellPhone = (addressItem: AddressItem) => {
    if (!addressItem.itemInEditingMode) {
      addressItem.cellPhoneInEditingMode = true;
    }
  }

  updateModifiedAddresses = (addressItems: AddressItem[]) => {
    const toBeUpdatedItems = addressItems.filter(addressItem => addressItem.itemInEditingMode || addressItem.cellPhoneInEditingMode);
    const toBeAddedItems = toBeUpdatedItems
      .filter(addressItem => addressItem.itemInEditingMode);
    const toBeModifiedItemsId = toBeUpdatedItems
      .filter(addressItem => addressItem.cellPhoneInEditingMode)
      .map(addressItem => addressItem.id);
    let message = '';
    if (toBeAddedItems.length) {
      toBeAddedItems.forEach((addressItem: AddressItem) => {
        addressItem.id = Math.round(Math.random() * 1000);
      });
      message += `Added item(s) with assigned id: ${toBeAddedItems.map(addressItem => addressItem.id).join(', ')}.`;
    }
    if (toBeModifiedItemsId.length) {
      message += ` Modified item(s) with id: ${toBeModifiedItemsId.join(', ')}.`;
    }
    alert(message);
    toBeUpdatedItems.forEach((addressItem: AddressItem) => {
      addressItem.itemInEditingMode = false;
      addressItem.cellPhoneInEditingMode = false;
    });
    if (Object.keys(this.sortStatus).some((key) => {
      return this.sortStatus[key] !== null;
    })) {
      const sortedField = Object.keys(this.sortStatus).find((key) => {
        return this.sortStatus[key] !== null;
      });
      this.addressItems.sort((a: AddressItem, b: AddressItem) => {
        if (a[sortedField] < b[sortedField]) {
          return this.sortStatus[sortedField] === 'asc' ? -1 : 1;
        } else if (a[sortedField] > b[sortedField]) {
          return this.sortStatus[sortedField] === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
  }

  noItemInEditMode = (addressItems: AddressItem[]) => {
    return !addressItems.filter(addressItem => addressItem.itemInEditingMode || addressItem.cellPhoneInEditingMode).length;
  }

  toggleSelectAllItems = (selectAll: boolean) => {
    this.addressItems.forEach((addressItem: AddressItem) => {
      addressItem.checked = selectAll;
    });
  }

  toggleSelectOneItem = (selectOne: boolean) => {
    if (selectOne) {
      if (this.addressItems.every(addressItem => addressItem.checked)) {
        this.selectAllChecked = true;
      }
    } else {
      if (this.selectAllChecked) {
        this.selectAllChecked = false;
      }
    }
  }

  deleteSelectedRows = () => {
    this.addressItems = this.addressItems.filter(addressItem => !addressItem.checked);
    if (!this.addressItems.length) {
      this.selectAllChecked = false;
    }
  }

  noItemSelected = (addressItems: AddressItem[]) => {
    return addressItems.every(addressItem => !addressItem.checked);
  }

  sortTheColumn = (fieldName: string) => {
    if (this.sortStatus[fieldName] === 'asc') {
      this.sortStatus[fieldName] = 'desc';
    } else {
      this.sortStatus[fieldName] = 'asc';
    }
    this.addressItems.sort((a: AddressItem, b: AddressItem) => {
      if (a[fieldName] < b[fieldName]) {
        return this.sortStatus[fieldName] === 'asc' ? -1 : 1;
      } else if (a[fieldName] > b[fieldName]) {
        return this.sortStatus[fieldName] === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    Object.keys(this.sortStatus)
      .filter(key => key !== fieldName)
      .forEach(key => this.sortStatus[key] = null);
  }

}
