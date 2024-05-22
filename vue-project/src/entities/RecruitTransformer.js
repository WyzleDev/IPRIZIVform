import RecruitRecord from '@/entities/RecruitRecord'
import SyncRecruit from '@/entities/SyncRecruit'
import {
  specialityMap as specialityObj,
  admissMap as admissObj,
  militaryOfficeMap as militaryOfficeObj,
  doctorMap as doctorObj,
  healthCategoryMap as healthCategoryObj,
  educationLevelMap as educationLevelObj,
  municipalityMap as municipalityObj,
  marriageStatusMap as marriageStatusObj,
  militarySpecialityMap as militarySpecialityObj,
  familySituationMap as familySituationObj
} from '@/entities/sourceMaps'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function parseDate(string) {
  const [day, month, year] = string.split('.')
  return `${year}-${month}-${day}T00:00:00`
}

function parseDateWithZone(string) {
  const [day, month, year] = string.split('.')
  return `${year}-${month}-${day}T00:00:00+03`
}

class CustomObject extends Object {
  constructor(obj) {
    super()
    Object.keys(obj).forEach((k) => {
      this[k] = obj[k]
    })
  }

  fetch(key) {
    if (!this.hasOwnProperty(key)) {
      throw new Error(`Object ${JSON.stringify(this)} does not have a key: ${key}`)
    }

    return this[key]
  }
}

const familyStatusMap = new CustomObject(marriageStatusObj)

const familySituationMap = new CustomObject(familySituationObj)

const healthCategoryMap = new CustomObject(healthCategoryObj)

const doctorMap = new CustomObject(doctorObj)

const admissMap = new CustomObject(admissObj)

const cityMunicipalityMap = new CustomObject(municipalityObj)

const militaryOfficeMap = new CustomObject(militaryOfficeObj)

const educationLevelMap = new CustomObject(educationLevelObj)
const educationSpecialityMap = new CustomObject(specialityObj)
const militarySpecialityMap = new CustomObject(militarySpecialityObj)

export class RecruitTransformer {
  static transform(recruitRecord) {
    return new SyncRecruit({
      isConvict: Boolean(recruitRecord.isConvict),
      hasZIC: Boolean(recruitRecord.hasZIC),
      family: {
        childCount: recruitRecord.family.childCount,
        statusId: familyStatusMap.fetch(recruitRecord.family.statusName),
        situation: familySituationMap.fetch(recruitRecord.family.situation)
      },
      medical: {
        healthCategory: healthCategoryMap.fetch(recruitRecord.medical.healthCategory),
        weight: recruitRecord.medical.weight,
        height: recruitRecord.medical.height,
        healthParagraph_0: recruitRecord.medical.healthParagraph_0,
        healthParagraph_1: recruitRecord.medical.healthParagraph_1,
        doctorId_0: doctorMap.fetch(recruitRecord.medical.doctorName_0),
        doctorId_1: doctorMap.fetch(recruitRecord.medical.doctorName_1)
      },
      education: {
        level: educationLevelMap.fetch(recruitRecord.education.level),
        speciality: educationSpecialityMap.fetch(recruitRecord.education.speciality),
        militarySpeciality: militarySpecialityMap.fetch(recruitRecord.education.militarySpeciality)
      },
      admiss: admissMap.fetch(recruitRecord.admiss),
      lastName: capitalize(recruitRecord.lastName),
      firstName: capitalize(recruitRecord.firstName),
      middleName: capitalize(recruitRecord.middleName),
      birthDate: parseDate(recruitRecord.birthDate),
      expectedDate: parseDate(recruitRecord.expectedDateArrivalToGSP),
      address: recruitRecord.address,
      cityMunicipality: cityMunicipalityMap.fetch(recruitRecord.cityMunicipality),
      passport: {
        series: recruitRecord.passport.series,
        number: recruitRecord.passport.number,
        source: recruitRecord.passport.whoIssued.toUpperCase(),
        creationDate: parseDate(recruitRecord.passport.issuedDate),
        code: recruitRecord.passport.departamentCode,
        bornCity: recruitRecord.passport.bornCity
      },
      militaryOffice: militaryOfficeMap.fetch(recruitRecord.militaryOffice),
      uniqueKey: recruitRecord.uniqueKey,
      militaryDocument: {
        series: recruitRecord.militaryDocument.series,
        number: recruitRecord.militaryDocument.number,
        creationDate: parseDateWithZone(recruitRecord.militaryDocument.issuedDate),
        militaryBadgeNumber: recruitRecord.militaryDocument.militaryBadge,
        comissionDecisionDate: parseDate(recruitRecord.militaryDocument.comissionDecisionDate)
      }
    })
  }
}
