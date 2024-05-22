const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.db')

schema = [
    'id integer PRIMARY KEY AUTOINCREMENT',
    'first_name text',
    'last_name text',
    'middle_name text',
    'birth_date text',
    'expected_date_arrival_to_gsp text',
    'address text',
    'city_municipality text',
    'is_convict integer',
    'has_zic integer',
    'passport_series text',
    'passport_number text',
    'passport_who_issued text',
    'passport_issued_date text',
    'passport_departament_code text',
    'passport_born_city text',
    'level text',
    'speciality text',
    'military_speciality text',
    'child_count integer',
    'status_name text',
    'situation text',
    'health_category text',
    'weight integer',
    'height integer',
    'health_paragraph_0 text',
    'health_paragraph_1 text',
    'doctor_name_0 text',
    'doctor_name_1 text',
    'military_office text',
    'unique_key text',
    'military_document_series text',
    'military_document_number text',
    'military_document_issued_date text',
    'military_document_military_badge text',
    'military_document_comission_decision_date text',
    'admiss text'
]


db.run(`create table recruits (${schema.join(', ')})`)

db.close()
