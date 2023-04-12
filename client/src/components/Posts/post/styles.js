import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    zIndex: '1',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '12px 16px 0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: '0px',
    // left: '0px',
    color: 'white',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});