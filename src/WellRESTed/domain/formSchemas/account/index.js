export default function () {
  //
  return {
    type: 'object',
    required: ['description'],
    properties: {
      tabs: [
        { title: 'Details', route: '/details' },
        { title: 'Underwriting', route: '/underwriting'},
      ]
    }
  }
}
