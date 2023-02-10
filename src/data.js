export const PRESETS = [
  beer => [
    label => "Beer",
    items => [
      {
        id: 'sixpack',
        title: 'Six-Pack',
        units: 6,
        volume: 12,
        unitsOfMeasurement: 'oz',
        container: 'bottle',
        description: 'The ol\' standby',
        icon: 'wine-bottle'
      }, {
        id: 'growler',
        title: 'Growler',
        units: 1,
        volume: 64,
        unitsOfMeasurement: 'oz',
        container: 'jug',
        description: 'Just a jug of beer',
        icon: 'jug-detergent'
      }, {
        id: 'forty',
        title: '40',
        units: 1,
        volume: 40,
        unitsOfMeasurement: 'oz',
        container: 'can',
        description: 'A "40"',
        icon: 'hippo'
      }, {
        id: 'keg',
        title: 'Keg',
        units: 1,
        volume: 3968,
        unitsOfMeasurement: 'oz',
        container: 'keg',
        description: 'Toga! Toga!',
        icon: 'pizza-slice'
      }, {
        id: 'tallboys',
        title: 'Tallboys',
        units: 4,
        volume: 16,
        unitsOfMeasurement: 'oz',
        container: 'can',
        description: 'Packaged for hipsters',
        icon: 'glasses'
      }
    ]
  ], wine => [
    label => "Wine",
    items => [
      {
        id: 'half',
        title: 'Half',
        units: 1,
        volume: 375,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'Just a sip, Jeeves',
        icon: 'wine-bottle'
      }, {
        id: 'standard',
        title: 'Standard',
        units: 1,
        volume: 750,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'A very fine vintage',
        icon: 'wine-bottle'
      }, {
        id: 'magnum',
        title: 'Magnum',
        units: 1,
        volume: 1500,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'Yellow Tail, darling',
        icon: 'wine-bottle'
      }, {
        id: 'jeroboam',
        title: 'Jeroboam',
        units: 1,
        volume: 3000,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'I\'m not kidding, that\'s what it\'s called',
        icon: 'wine-bottle'
      }, {
        id: 'imperial',
        title: 'Imperial',
        units: 1,
        volume: 6000,
        unitsOfMeasurement: 'mL',
        container: 'bottle',
        description: 'Good night and good luck',
        icon: 'wine-bottle'
      }
    ]
  ]
];

