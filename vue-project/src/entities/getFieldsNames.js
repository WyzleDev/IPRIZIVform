async function getIprizivFieldsData(url = '', name = '') {
  const baseUrl = 'http://black:33380/api/dictionaries/'
  let optionsStore = {}
  localStorage.setItem('optionsStore', JSON.stringify(optionsStore))

  switch (name) {
    case 'FamilySituation': {
      console.log('123')
      let familySituations = [
        {
          value: 'Children',
          name: 'ребенок'
        },
        {
          value: 'PensionerParent',
          name: 'Родители пенсионеры'
        },
        {
          value: 'SickParent',
          name: 'Больные родители'
        },
        {
          value: 'Normal',
          name: 'Нет'
        }
      ]

      const store = JSON.parse(localStorage.getItem('optionsStore'))
      store[name] = familySituations
      localStorage.setItem(name, JSON.stringify(store))
    }
      break
    default: {
      let resp = await fetch(url)
      let municipalitiesArray = await resp.json()
      //   let educationLevel = [
      //     {
      //       id: 101,
      //       name: 'Среднее'
      //     },
      //     {
      //       id: 102,
      //       name: 'Нет'
      //     }
      //   ]
      let options = municipalitiesArray.map((element) => ({
        value: element.id,
        name: element.name
      }))

      const store = JSON.parse(localStorage.getItem('optionsStore'))
      store[name] = options
      localStorage.setItem('optionsStore', JSON.stringify(store))
    }
  }
}
getIprizivFieldsData('', 'FamilySituation')
