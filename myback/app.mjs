import Recruit from './entities/RecruitBase.mjs'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import express from 'express'
import { db_rectuit_to_model } from './converter.mjs'

sqlite3.verbose()

const db = new sqlite3.Database('db.db')

db.on('profile', (query, data) => {
  console.log('query')
  console.log(query)
  console.log('data')
  console.log(data)
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.post('/recruits/:id/synciprizriv', async (req, res) => {
	console.log('sync')
	console.log(res)
  const headers = {
	  'Content-Type': 'application/json;charset=utf-8',
	  cookie: ".AspNetCore.Cookies=CfDJ8JAXXuPv2jJIlb1N0jhZ5xqJ7cHOuRh-82uchovEwhzOFPWKI1qo11BZvhnkXr3SoTzPtRGYS0nWvFtLZtQkOFsYByqQeb5oe-hwOuNvHZ4ZWhzPFJp_EA6HEpvi3dSx3eONReL_fGq5GKwV4m3hTihux_96qx3Q3LcrAjrrX-2mw4wuqqwnEg6Uud4RqZhQJp4Exvou8uOtCFwudVizlsEmaQRlvN683SCnU54SyKSc1P0uFC006jwIdhjLZHZ9peIDcO9IEFk-vnR6bxzocpVyVgm5sMemsw1XpYpzKupMx9tkh_0sYoZy2qqmGwPTkd4T0S0LhQx_7rg8Ib3siynHSOdZzzqmsmTsQodfycB_dav98X3BZq2IrgzO2eT8Dc-W7tgp_vRAiOllMYuza6YJh0R-BgLto6PCY5wQB4jfPSQNn235oBy9e8iA7cnQZoLePRRKx7CCan_9kKp_Jp78p6ulymQyV3CBQgTJm80-kH7NH7Wd4qs-YGZcQBr45vGirwIQIdp3Hci_LLNHNRiZvKaea4pDtv8N2L0YaAZ8; DataBase=v_16"
  }
  const body = JSON.stringify(req.body)
  const r = await fetch("http://192.168.0.137:33380/api/recruits", {
	headers: headers,
	method: 'POST',
	body: body
  })
  console.log(req.body)
  console.log(JSON.stringify(req.body))
})

app.get('/recruits', async (req, res) => {
  const query = `SELECT * FROM recruits ORDER BY id DESC`

  db.all(query, (err, rows) => {
    if (err) { throw err }

    const recruits = rows.map(row => db_rectuit_to_model(row))
    res.send(JSON.stringify(recruits))
  })
})

app.post('/recruits', (req, res) => {
  const recruit = new Recruit(req.body)
  console.log(14141414)
  console.log(recruit)

  db.run(`
    INSERT INTO recruits 
    (
      first_name,
      last_name,
      middle_name,
      birth_date,
      expected_date_arrival_to_gsp,
      address,
      city_municipality,
      is_convict,
      has_zic,
      passport_series,
      passport_number,
      passport_who_issued,
      passport_issued_date,
      passport_departament_code,
      passport_born_city,
      level,
      speciality,
      military_speciality,
      child_count,
      status_name,
      situation,
      health_category,
      weight,
      height,
      health_paragraph_0,
      health_paragraph_1,
      doctor_name_0,
      doctor_name_1,
      military_office,
      unique_key,
      military_document_series,
      military_document_number,
      military_document_issued_date,
      military_document_military_badge,
      military_document_comission_decision_date,
      admiss
    )
    VALUES 
    (
      $first_name,
      $last_name,
      $middle_name,
      $birth_date,
      $expected_date_arrival_to_gsp,
      $address,
      $city_municipality,
      $is_convict,
      $has_zic,
      $passport_series,
      $passport_number,
      $passport_who_issued,
      $passport_issued_date,
      $passport_departament_code,
      $passport_born_city,
      $level,
      $speciality,
      $military_speciality,
      $child_count,
      $status_name,
      $situation,
      $health_category,
      $weight,
      $height,
      $health_paragraph_0,
      $health_paragraph_1,
      $doctor_name_0,
      $doctor_name_1,
      $military_office,
      $unique_key,
      $military_document_series,
      $military_document_number,
      $military_document_issued_date,
      $military_document_military_badge,
      $military_document_comission_decision_date,
      $admiss
    )
  `, {
    $first_name: recruit.firstName,
    $last_name: recruit.lastName,
    $middle_name: recruit.middleName,
    $birth_date: recruit.birthDate,
    $expected_date_arrival_to_gsp: recruit.expectedDateArrivalToGSP,
    $address: recruit.address,
    $city_municipality: recruit.cityMunicipality,
    $is_convict: recruit.isConvict,
    $has_zic: recruit.hasZIC,
    $passport_series: recruit.passport.series,
    $passport_number: recruit.passport.number,
    $passport_who_issued: recruit.passport.whoIssued,
    $passport_issued_date: recruit.passport.issuedDate,
    $passport_departament_code: recruit.passport.departamentCode,
    $passport_born_city: recruit.passport.bornCity,
    $level: recruit.education.level,
    $speciality: recruit.education.speciality,
    $military_speciality: recruit.education.militarySpeciality,
    $child_count: recruit.family.childCount,
    $status_name: recruit.family.statusName,
    $situation: recruit.family.situation,
    $health_category: recruit.medical.healthCategory,
    $weight: recruit.medical.weight,
    $height: recruit.medical.height,
    $health_paragraph_0: recruit.medical.healthParagraph_0,
    $health_paragraph_1: recruit.medical.healthParagraph_1,
    $doctor_name_0: recruit.medical.doctorName_0,
    $doctor_name_1: recruit.medical.doctorName_1,
    $military_office: recruit.militaryOffice,
    $unique_key: recruit.uniqueKey,
    $military_document_series: recruit.militaryDocument.series,
    $military_document_number: recruit.militaryDocument.number,
    $military_document_issued_date: recruit.militaryDocument.issuedDate,
    $military_document_military_badge: recruit.militaryDocument.militaryBadge,
    $military_document_comission_decision_date: recruit.militaryDocument.comissionDecisionDate,
    $admiss: recruit.admiss
  }, function(err) {
    if (err) { throw err }
    console.log(this.lastID)
    recruit.id = this.lastID
    res.send(JSON.stringify(recruit))
  })
})

app.get(`/recruits/:id`, (req, res) => {
  db.get(`SELECT * FROM recruits WHERE id = ${req.params.id}`, function(err, row) {
    res.send(JSON.stringify(db_rectuit_to_model(row)))
  })
})

app.patch('/recruits/:id/edit', (req, res) => {
  const recruit = new Recruit(req.body)
  const query = `
  UPDATE recruits
  SET
  first_name = ?,
  last_name = ?,
  middle_name = ?,
  birth_date = ?,
  expected_date_arrival_to_gsp = ?,
  address = ?,
  city_municipality = ?,
  is_convict = ?,
  has_zic = ?,
  passport_series = ?,
  passport_number = ?,
  passport_who_issued = ?,
  passport_issued_date = ?,
  passport_departament_code = ?,
  passport_born_city = ?,
  level = ?,
  speciality = ?,
  military_speciality = ?,
  child_count = ?,
  status_name = ?,
  situation = ?,
  health_category = ?,
  weight = ?,
  height = ?,
  health_paragraph_0 = ?,
  health_paragraph_1 = ?,
  doctor_name_0 = ?,
  doctor_name_1 = ?,
  military_office = ?,
  unique_key = ?,
  military_document_series = ?,
  military_document_number = ?,
  military_document_issued_date = ?,
  military_document_military_badge = ?,
  military_document_comission_decision_date = ?,
  admiss = ?
  WHERE id = ?
  `
  console.log(query)

  db.run(query, [
    recruit.firstName,
    recruit.lastName,
    recruit.middleName,
    recruit.birthDate,
    recruit.expectedDateArrivalToGSP,
    recruit.address,
    recruit.cityMunicipality,
    +recruit.isConvict,
    +recruit.hasZIC,
    recruit.passport.series,
    recruit.passport.number,
    recruit.passport.whoIssued,
    recruit.passport.issuedDate,
    recruit.passport.departamentCode,
    recruit.passport.bornCity,
    recruit.education.level,
    recruit.education.speciality,
    recruit.education.militarySpeciality,
    +recruit.family.childCount,
    recruit.family.statusName,
    recruit.family.situation,
    recruit.medical.healthCategory,
    +recruit.medical.weight,
    +recruit.medical.height,
    recruit.medical.healthParagraph_0,
    recruit.medical.healthParagraph_1,
    recruit.medical.doctorName_0,
    recruit.medical.doctorName_1,
    recruit.militaryOffice,
    recruit.uniqueKey,
    recruit.militaryDocument.series,
    recruit.militaryDocument.number,
    recruit.militaryDocument.issuedDate,
    recruit.militaryDocument.militaryBadge,
    recruit.militaryDocument.comissionDecisionDate,
    recruit.admiss,
    +req.params.id
  ])

  res.sendStatus(204)
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))
process.on('exit', () => db.close())


