class Passport {
    constructor({
      series,
      number,
      source,
      creationDate,
      code,
      bornCity
    }={}) {
      this.series = series
      this.number = number
      this.source = source
      this.creationDate = creationDate
      this.code = code
      this.bornCity = bornCity
    }
}
  
class Education {
    constructor({ level, speciality, militarySpeciality }={}) {
        this.level = { id: level }
        this.speciality = { id: speciality }
        this.militaryDebtSpeciality = { id: militarySpeciality }
    }
}

class Family {
    constructor({ childCount, statusId, situation }={}) {
        this.childCount = childCount
        this.statusId = statusId
        this.situation = situation
    }
}

class Medical {
    constructor({
        healthCategory,
        weight,
        height,
        healthParagraph_0,
        healthParagraph_1,
        doctorId_0,
        doctorId_1
    }={}) {
        this.healthCategory = healthCategory
        this.weight = weight
        this.height = height
        this.healthParagraph_0 = healthParagraph_0
        this.healthParagraph_1 = healthParagraph_1
        this.doctorId_0 = doctorId_0
        this.doctorId_1 = doctorId_1
    }
}

class MilitaryDocument {
    constructor({
      series,
      number,
      creationDate,
      militaryBadgeNumber,
      comissionDecisionDate
    }={}) {
      this.series = series
      this.number = number
      this.creationDate = creationDate
      this.militaryBadgeNumber = militaryBadgeNumber
      this.comissionDecisionDate = comissionDecisionDate
    }
  }

export default class SyncRecruit {
    constructor({
        isConvict,
        hasZIC,
        family,
        medical,
        education,
        admiss,
        lastName,
        firstName,
        middleName,
        birthDate,
        expectedDate,
        address,
        cityMunicipality,
        passport,
        militaryOffice,
        uniqueKey,
        militaryDocument
    }={}) {
        this.isConvict = isConvict
        this.hasZIC = hasZIC
        this.family = new Family(family)
        this.medical = new Medical(medical)
        this.education = new Education(education)
        this.admiss = { id: admiss }
        this.lastName = lastName
        this.firstName = firstName
        this.middleName = middleName
        this.birthDate = birthDate
        this.expectedDate = expectedDate
        this.address = address
        this.cityMunicipality = { id: cityMunicipality }
        this.passport = new Passport(passport)
        this.militaryOffice = { id: militaryOffice }
        this.uniqueKey = uniqueKey
        this.militaryDocument = new MilitaryDocument(militaryDocument)
    }
}
