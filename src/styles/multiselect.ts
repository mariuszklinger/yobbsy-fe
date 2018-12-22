export default (theme: any) => ({
  multiselect: {
    marginTop: 16,
    width: 'calc(100% - 8px)',
    flex: 'auto',

    '& > div': {
      border: 'none',
      borderRadius: 0,
      borderBottom: '1px solid #ddd',

      '> div': {
        fontSize: 16,
        padding: '0 0',

      },

      '& span': {
        display: 'none',
      }
    }
  }
});
