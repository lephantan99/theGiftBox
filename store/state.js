// VueX-State
export default () => ({
  locales: ['en', 'vi'],
  locale: 'vi',
  message: 'Hello from state',
  sidebarCollapsed: false,
  serverReady: false,
  initialState: null,
  options: {
    sidebarCollapsed: false,
    safeModeOn: false,
  },
})
