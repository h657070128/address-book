export class AddressItem {
    id?: number;
    name: string;
    location: string;
    office: string;
    officePhone: string;
    cellPhone: string;

    checked?: boolean; // front-end field
    itemInEditingMode?: boolean; // front-end field
    cellPhoneInEditingMode?: boolean; // front-end field
}
