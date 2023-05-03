export const UNITS_OF_MEASUREMENT = {
  'oz': {
    'cup': 8,
    'pint': 16,
    'quart': 32,
    'gallon': 128,
    'liter': 33.81
  },
  'mL': {
    'L': 1000
  }
}
export const SAMPLE_PRODUCT = {
  title: 'Hat',
  description: 'A 10-Gallon Hat',
  units: 1,
  volume: 10,
  container: 'hat',
  unitsOfMeasurement: 'gallon',
  price: 149.99
}
export const PRESETS = {
  'soup': {
    label: "Soup Club",
    baseUnit: 'oz',
    icon: '🥘',
    items: [
      {
        id: '1cup',
        title: 'Cup o\' Soup',
        volume: 1,
        container: 'container',
        unitsOfMeasurement: 'cup',
        price: 7
      }, {
        id: '1quart',
        title: 'Quart o\' Soup',
        volume: 1,
        container: 'jar',
        unitsOfMeasurement: 'quart',
        price: 28
      }, {
        id: '1pint',
        title: 'Pint o\' Soup',
        volume: 1,
        container: 'jar',
        unitsOfMeasurement: 'pint',
        price: 14
      }, {
        id: '1gallon',
        title: 'Jug o\' Soup',
        units: 1,
        volume: 1,
        container: 'jug',
        unitsOfMeasurement: 'gallon',
        price: 42
      }
    ]
  },
  'soda': {
    label: "Soda Pop",
    baseUnit: 'oz',
    icon: '🥤',
    items: [
      {
        id: 'can',
        title: 'Can',
        volume: 12,
        container: 'can',
        description: 'Can o\' Pop',
      }, {
        id: 'sixpack',
        title: 'Six-Pack',
        volume: 0.5,
        units: 6,
        unitsOfMeasurement: 'liter',
        container: 'bottle',
      }, {
        id: 'case',
        title: 'Case',
        volume: 12,
        units: 24,
        container: 'case',
      }, {
        id: 'two-liter',
        title: 'Two-Liter',
        volume: 2,
        unitsOfMeasurement: 'liter',
        container: 'bottle',
      },
      {
        id: 'mini-cans',
        title: 'Mini Cans',
        volume: 7.5,
        units: 10,
        container: 'can'
      },
      {
        id: 'big-gulp',
        title: 'Big Gulp',
        volume: 128,
        units: 1,
        container: 'gulp'
      },

    ]
  },
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
        price: 9.99
      }, {
        id: 'growler',
        title: 'Growler',
        volume: 64,
        container: 'jug',
        description: 'Just a jug of beer',
        price: 11.99
      }, {
        id: 'forty',
        title: '40',
        volume: 40,
        container: 'can',
        description: 'A "40"',
        price: 4.99
      }, {
        id: 'tallboys',
        title: 'Tallboys',
        units: 4,
        volume: 16,
        container: 'can',
        description: 'Packaged for hipsters',
        price: 7.99
      }
    ]
  },
}
