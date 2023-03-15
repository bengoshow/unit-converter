export const UNITS_OF_MEASUREMENT = {
  'oz': {
    'cup': 8,
    'pint': 16,
    'quart': 32,
    'gallon': 128,
  },
  'mL': {
    'L': 1000
  }
}
export const PRESETS = {
  'beer': {
    label: "Beer",
    baseUnit: 'oz',
    icon: '🍻',
    items: [
      {
        id: 'sixpack',
        title: 'Six-Pack',
        units: 6,
        volume: 12,
        container: 'bottle',
        description: 'The ol\' standby',
        icon: 'bottle-water'
      }, {
        id: 'growler',
        title: 'Growler',
        volume: 64,
        container: 'jug',
        description: 'Just a jug of beer',
        icon: 'jug-detergent'
      }, {
        id: 'forty',
        title: '40',
        volume: 40,
        container: 'can',
        description: 'A "40"',
        icon: 'hippo'
      }, {
        id: 'keg',
        title: 'Keg',
        volume: 15.5,
        unitsOfMeasurement: 'gallon',
        container: 'keg',
        description: 'Toga! Toga!',
        icon: 'pizza-slice'
      }, {
        id: 'tallboys',
        title: 'Tallboys',
        units: 4,
        volume: 16,
        container: 'can',
        description: 'Packaged for hipsters',
        icon: 'glasses'
      }
    ]
  },
  'wine': {
    label: "Wine",
    baseUnit: 'mL',
    icon: '🍷',
    items: [
      {
        id: 'half',
        title: 'Half',
        volume: 375,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'Just a sip, Jeeves',
        icon: 'wine-bottle'
      }, {
        id: 'standard',
        title: 'Standard',
        volume: 750,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'A very fine vintage',
        icon: 'wine-bottle'
      }, {
        id: 'magnum',
        title: 'Magnum',
        volume: 1.5,
        unitsOfMeasurement: 'L',
        container: 'bottle',
        description: 'Yellow Tail, darling',
        icon: 'wine-bottle'
      }, {
        id: 'jeroboam',
        title: 'Jeroboam',
        volume: 3,
        unitsOfMeasurement: 'L',
        container: 'bottle',
        description: 'I\'m not kidding, that\'s what it\'s called',
        icon: 'wine-bottle'
      }, {
        id: 'imperial',
        title: 'Imperial',
        volume: 6,
        unitsOfMeasurement: 'L',
        container: 'bottle',
        description: 'Good night and good luck',
        icon: 'wine-bottle'
      }
    ]
  },
  'soup': {
    label: "LaDonna's Soup Club",
    baseUnit: 'oz',
    icon: '🥘',
    items: [
      {
        id: '8oz',
        title: '8oz',
        volume: 8,
        container: 'jar',
        icon: 'bowl-food',
        price: 7
      }, {
        id: '16oz',
        title: '16oz',
        volume: 16,
        container: 'jar',
        icon: 'bowl-food',
        price: 14
      }, {
        id: '24oz',
        title: '24oz',
        volume: 24,
        container: 'jar',
        icon: 'bowl-food',
        price: 21
      }, {
        id: '32oz',
        title: '32oz',
        volume: 32,
        container: 'jar',
        icon: 'bowl-food',
        price: 28
      }, {
        id: '48oz',
        title: '48oz',
        units: 2,
        volume: 24,
        container: 'jar',
        icon: 'bowl-food',
        price: 42
      }, {
        id: '76oz',
        title: '76oz',
        volume: 76,
        container: 'jar',
        icon: 'bowl-food',
        price: 50
      }
    ]
  }
}