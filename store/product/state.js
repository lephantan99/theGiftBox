export default () => ({
  total: 0,
  data: [],
  query: {
    offset: 0,
    limit: 10,
  },
  viewing: null,
  navigationTabs: [
    {
      label: 'drinks.title',
      key: 'drinks',
    },
    {
      label: 'drinks.index.types',
      key: 'drinks-types',
    },
  ],
})
