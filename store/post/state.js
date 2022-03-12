export default () => ({
  total: 0,
  data: [],
  query: {
    page: 1,
    count: 10,
    pageCount: 2,
    sort: 'id,ASC',
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
