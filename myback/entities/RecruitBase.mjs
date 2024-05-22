class Passport {
  constructor({
    series = '',
    number = '',
    whoIssued = '',
    issuedDate = null,
    departamentCode = '',
    bornCity = ''
  } = {}) {
    this.series = series
    this.number = number
    this.whoIssued = whoIssued
    this.issuedDate = issuedDate
    this.departamentCode = departamentCode
    this.bornCity = bornCity
  }
}

class Education {
  constructor({ level = '', speciality = '', militarySpeciality = '' } = {}) {
    this.level = level
    this.speciality = speciality
    this.militarySpeciality = militarySpeciality
  }
}

class Family {
  constructor({ childCount = null, statusName = '', situation = '' } = {}) {
    this.childCount = childCount
    this.statusName = statusName
    this.situation = situation
  }
}

class Medical {
  constructor({
    healthCategory = '',
    weight = null,
    height = null,
    healthParagraph_0 = '',
    healthParagraph_1 = '',
    doctorName_0 = '',
    doctorName_1 = ''
  } = {}) {
    this.healthCategory = healthCategory
    this.weight = weight
    this.height = height
    this.healthParagraph_0 = healthParagraph_0
    this.healthParagraph_1 = healthParagraph_1
    this.doctorName_0 = doctorName_0
    this.doctorName_1 = doctorName_1
  }
}

class MilitaryDocument {
  constructor({
    series = '',
    number = '',
    issuedDate = null,
    militaryBadge = '',
    comissionDecisionDate = null
  } = {}) {
    this.series = series
    this.number = number
    this.issuedDate = issuedDate
    this.militaryBadge = militaryBadge
    this.comissionDecisionDate = comissionDecisionDate
  }
}

export default class Recruit {
  constructor({
    firstName = '',
    lastName = '',
    middleName = '',
    birthDate = null,
    expectedDateArrivalToGSP = null,
    address = '',
    cityMunicipality = '',
    isConvict = false,
    hasZIC = false,
    passport = {},
    education = {},
    family = {},
    medical = {},
    militaryOffice = '',
    uniqueKey = '',
    militaryDocument = {},
    admiss = ''
  } = {}) {
    this.firstName = firstName
    this.lastName = lastName
    this.middleName = middleName
    this.birthDate = birthDate
    this.expectedDateArrivalToGSP = expectedDateArrivalToGSP
    this.address = address
    this.cityMunicipality = cityMunicipality
    this.isConvict = isConvict
    this.hasZIC = hasZIC
    this.passport = new Passport(passport)
    this.education = new Education(education)
    this.family = new Family(family)
    this.medical = new Medical(medical)
    this.militaryOffice = militaryOffice
    this.uniqueKey = uniqueKey
    this.militaryDocument = new MilitaryDocument(militaryDocument)
    this.admiss = admiss
  }
}
