import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBar: {
    border-radius: 15,
    margin: '30px 0',
    display: 'flex',
    flex-direction: 'row',
    justify-content: 'center',
    align-items: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    margin-left: '15px',
  },
  [theme.breakpoints.down('sm')] : {
    mainContainer: {
      flex-direction: 'column-reverse',
    },
    formContainer: {
      maxWidth: '80%',
      align-items: 'center'
    },
    heading: {
      font-size: '2.5rem'
    }
  }
}));