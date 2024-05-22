import RecruitRecord from './entities/RecruitRecord.mjs'

export function db_rectuit_to_model(row) {
    return new RecruitRecord({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        middleName: row.middle_name,
        birthDate: row.birth_date,
        expectedDateArrivalToGSP: row.expected_date_arrival_to_gsp,
        address: row.address,
        cityMunicipality: row.city_municipality,
        isConvict: row.is_convict,
        hasZIC: row.has_zic,
        passport: { 
          series: row.passport_series,
          number: row.passport_number,
          whoIssued: row.passport_who_issued,
          issuedDate: row.passport_issued_date,
          departamentCode: row.passport_departament_code,
          bornCity: row.passport_born_city, 
        },
        education: {
          level: row.level,
          speciality: row.speciality,
          militarySpeciality: row.military_speciality
        },
        family: {
          childCount: row.child_count,
          statusName: row.status_name,
          situation: row.situation
        },
        medical: {
          healthCategory: row.health_category,
          weight: row.weight,
          height: row.height,
          healthParagraph_0: row.health_paragraph_0,
          healthParagraph_1: row.health_paragraph_1,
          doctorName_0: row.doctor_name_0,
          doctorName_1: row.doctor_name_1
        },
        militaryOffice: row.military_office,
        uniqueKey: row.unique_key,
        militaryDocument: {
          series: row.military_document_series,
          number: row.military_document_number,
          issuedDate: row.military_document_issued_date,
          militaryBadge: row.military_document_military_badge,
          comissionDecisionDate: row.military_document_comission_decision_date
        },
        admiss: row.admiss
      })
}