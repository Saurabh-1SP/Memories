import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: '0.5rem',
  },
  form: {
    width: '100%',
    marginTop: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  inputContainer: {
    borderRadius: '4px',
    zIndex: '0'
  },
  googleButton: {
    width: '100%',
  },
}));