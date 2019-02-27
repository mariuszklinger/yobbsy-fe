export default (theme: any) => ({
  multiselect: {
    marginTop: 16,
    width: 'calc(100% - 8px)',
    flex: 'auto',


    '& > div': {
      border: 'none',
      borderRadius: 0,
      borderBottom: '1px solid #ddd',
      backgroundColor: 'white',

      '& > div': {
        fontSize: 16,
        padding: 5,
        borderRadius: 5,
      },

      '& span': {
        display: 'none',
      }
    }
  }
});
