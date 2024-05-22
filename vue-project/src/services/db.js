{
  "firstName": str,
  "lastName": str,
  "middleName": str,
  "birthDate": date,
  "expectedDateArrivalToGSP": date,
  "address": str,
  "cityMunicipality": str,
  "isConvict": Boolean,
  "hasZIC": Boolean,
  "passport": {
    "series": str,
    "number": str,
    "whoIssued": str,
    "issuedDate": date,
    "departamentCode": str
    "bornCity": str
  },
  "education": {
    "level": str,
    "speciality": str,
    "militarySpeciality": str
  }
  "family": {
    "childCount": int,
    "statusName": str,
    "situation": str
  },
  "medical": {
    "healthCategory": str
    "weight": int,
    "height": int,
    "healthParagraph_0": str,
    "healthParagraph_1": str,
    "doctorName_0": str, /* wtf */
    "doctorName_1": str, /* wtf */
    "verdicts": [
      {
        "doctorName": str,
        "healthParagraph": str
      },
      {
        "doctorName": str,
        "healthParagraph": str
      }
    ] /* wtf */
  },
  "militaryOffice": str,
  "uniqueKey": str,
  "militaryDocument": {
    "series": str,
    "number": str,
    "issuedDate": date,
    "militaryBadge": str,
    "comissionDecisionDate": date,
    "militaryDocumentIssued": str /*всегда null*/
  },
  "admiss": str,
}




  
  /*
  "canBeReturned": false,
  "state": "Sent",
  "internalTeamId": 1,

  "dispatchedAt": "2024-04-17T00:00:00",
  "updatedAt": "2024-05-15T00:00:00",
  "createdAt": "2024-04-10T00:00:00",
  "deliveredAt": "2024-04-11T00:00:00",


  "militaryDebtSpecialityDispatching": "",
  "militaryUnitName": "",
  "stationName": "",
  "militaryTypeName": "",
  "militaryDistrictName": ""
  */