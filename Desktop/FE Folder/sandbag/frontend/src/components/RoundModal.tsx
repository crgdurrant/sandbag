import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



interface ModalProps {
  detail: {
    date: string,
    course: string,
    score: number,
    par: number,
    tees: string,
    courseRating: string,
    slope: string,
    lostBalls: string,
    threePutts: string,
    differential: number}
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RoundModal(props: ModalProps){

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="single-score">
        <p className="date">{props.detail.date.slice(2,10).split('-').reverse().join('-')}</p>
        <p><span className="bolder">{props.detail.score}</span></p>
        <p className="course">{props.detail.course}</p>
        <IconButton onClick={handleClickOpen} sx={{marginLeft: 'auto'}}>
          <MoreHorizIcon/>
        </IconButton>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius: '5em'}}
        >
        <DialogTitle sx={{backgroundColor: '#B6e6bd'}}>
          You shot {props.detail.score} at {props.detail.course}
        </DialogTitle>
        <DialogContent sx={{backgroundColor: '#B6e6bd'}}>
          <DialogContentText id="alert-dialog-slide-description">
            <p className="round-summary">Differential: {props.detail.differential}</p>
            <p className="round-summary">{props.detail.course} (Par {props.detail.par})</p>
            <p className="round-summary">{props.detail.tees} Tees</p>
            <p className="round-summary">Course Rating: {props.detail.courseRating}</p>
            <p className="round-summary">Slope: {props.detail.slope}</p>
            <p className="round-summary">Date: {props.detail.date.slice(2,10).split('-').reverse().join('-')}</p>
            <p className="round-summary">Your majestic {props.detail.score} included {props.detail.lostBalls === "" ? "0" : props.detail.lostBalls} lost balls and an impressive {props.detail.threePutts === "" ? "0" : props.detail.threePutts} three-putts</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#B6e6bd'}}>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </DialogActions>
      </Dialog>
    </div>


    
  )

}