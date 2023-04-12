import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '20px',
    border: 'none',
    width: '300px',
    transition: '0.5s',
    border: '1px solid black',
    outline: 'none',
    "&:focus": {
      border: 'none',
      outline: 'solid #33a9d4',
      borderRadius: '4px'
    }
  }
}));