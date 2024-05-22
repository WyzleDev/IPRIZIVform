import {
  specialityMap,
  admissMap,
  militaryOfficeMap,
  doctorMap,
  healthCategoryMap,
  educationLevelMap,
  municipalityMap,
  marriageStatusMap,
  militarySpecialityMap,
  familySituationMap
} from '@/entities/sourceMaps'

function dateValidate(dateString, maxYear = new Date().getFullYear()) {
  const dateParts = dateString.split('.')
  const [day, month, year] = dateParts
  return (
    dateParts.length === 3 &&
    0 < +day &&
    +day <= 31 &&
    0 < +month &&
    +month <= 12 &&
    1970 <= +year &&
    +year <= maxYear
  )
}

class Validator {
  constructor() {
    this.isValid = true
  }

  _setError(value) {
    if (!value) this.isValid = false

    return !value
  }

  _checkNestedValidator(result) {
    if (!result.isValid) this.isValid = false

    return result.errors
  }

  validate(errors) {
    return {
      errors: errors,
      isValid: this.isValid
    }
  }
}

class PassportValidator extends Validator {
  constructor() {
    super()
  }

  validate({ series, number, whoIssued, issuedDate, departamentCode, bornCity } = {}) {
    return super.validate({
      series: this._setError(series.length === 4),
      number: this._setError(number.length === 6),
      whoIssued: this._setError(String(whoIssued).strip() !== ''),
      issuedDate: this._setError(dateValidate(issuedDate)),
      departamentCode: this._setError(/^\d{3}-\d{3}$/.test(departamentCode)),
      bornCity: this._setError(String(bornCity).strip() !== '')
    })
  }
}

class EducationValidator extends Validator {
  constructor() {
    super()
  }

  validate({ level, militarySpeciality } = {}) {
    return super.validate({
      level: this._setError(educationLevelMap.hasOwnProperty(level)),
      militarySpeciality: this._setError(militarySpecialityMap.hasOwnProperty(militarySpeciality))
    })
  }
}

class FamilyValidator extends Validator {
  constructor() {
    super()
  }

  validate({ childCount, statusName, situation } = {}) {
    return super.validate({
      childCount: this._setError(childCount > 0),
      statusName: this._setError(marriageStatusMap.hasOwnProperty(statusName)),
      situation: this._setError(familySituationMap.hasOwnProperty(situation))
    })
  }
}

class MedicalValidator extends Validator {
  constructor() {
    super()
  }

  validate({ healthCategory, weight, height } = {}) {
    return super.validate({
      healthCategory: this._setError(healthCategoryMap.hasOwnProperty(healthCategory)),
      weight: this._setError(weight > 30),
      height: this._setError(height > 100)
    })
  }
}

class MilitaryDocumentValidator extends Validator {
  constructor() {
    super()
  }

  validate({ comissionDecisionDate } = {}) {
    return super.validate({
      comissionDecisionDate: this._setError(dateValidate(comissionDecisionDate))
    })
  }
}

export default class SyncRecruitValidator extends Validator {
  constructor() {
    super()
  }

  validate({
    isConvict,
    hasZIC,
    family,
    medical,
    education,
    admiss,
    lastName,
    firstName,
    // middleName,
    birthDate,
    expectedDateArrivalToGSP,
    address,
    cityMunicipality,
    passport,
    militaryOffice,
    // uniqueKey,
    militaryDocument
  } = {}) {
    return super.validate({
      isConvict: this._setError(typeof isConvict === 'boolean'),
      hasZIC: this._setError(typeof hasZIC === 'boolean'),
      lastName: this._setError(String(lastName).strip() !== ''),
      firstName: this._setError(String(firstName).strip() !== ''),
      // middleName
      address: this._setError(String(address).strip() !== ''),
      // uniqueKey: uniqueKey,
      militaryDocument: this._checkNestedValidator(
        new MilitaryDocumentValidator().validate(militaryDocument)
      ),
      family: this._checkNestedValidator(new FamilyValidator().validate(family)),
      medical: this._checkNestedValidator(new MedicalValidator().validate(medical)),
      education: this._checkNestedValidator(new EducationValidator().validate(education)),
      passport: this._checkNestedValidator(new PassportValidator().validate(passport)),
      birthDate: this._setError(dateValidate(birthDate, new Date().getFullYear() - 17)),
      expectedDateArrivalToGSP: this._setError(dateValidate(expectedDateArrivalToGSP)),
      admiss: this._setError(admissMap.hasOwnProperty(admiss)),
      cityMunicipality: this._setError(municipalityMap.hasOwnProperty(cityMunicipality)),
      militaryOffice: this._setError(militaryOfficeMap.hasOwnProperty(militaryOffice))
    })
  }
}

// const errors = {
//     lastName: true,
//     firstName: true,
//     middleName: true,
//     birthDate: true,
//     expectedDateArrivalToGSP: true,
//     address: true,
//     cityMunicipality: true,
//     isConvict: true,
//     hasZIC: true,
//     passport: {
//       series: true,
//       number: true,
//       whoIssued: true,
//       issuedDate: true,
//       departamentCode: true,
//       bornCity: true,
//     },
//     education: {
//       level: true,
//       speciality: true,
//       militarySpeciality: true
//     },
//     family: {
//       childCount: true,
//       statusName: true,
//       situation: true,
//     },
//     medical: {
//       healthCategory: true,
//       weight: true,
//       height: true,
//       doctorName_0: true,
//       doctorName_1: true,
//       healthParagraph_0: true,
//       healthParagraph_1: true
//     },
//     militaryOffice: true,
//     uniqueKey: true,
//     militaryDocument: {
//       series: true,
//       number: true,
//       issuedDate: true,
//       militaryBadge: true,
//       comissionDecisionDate: true
//     },
//     admiss: true
//   }
