export interface Person {
  firstName?: string
  lastName?: string
  uprn?: string
  dateOfBirth?: string
  ageContext?: string
  gender?: string
  nationality?: string
  phoneNumber?: {
    phoneNumber?: string
    phoneType?: string
  }[]
  addressList?: {
    endDate?: string
    contactAddressFlag?: string
    displayAddressFlag?: string
    addressLine1?: string
    addressLine2?: string
    addressLine3?: string
    postCode?: string
  }[]
  nhsNumber?: string
  restricted?: string
}
