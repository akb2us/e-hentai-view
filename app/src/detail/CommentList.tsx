import React, { useState } from 'react'
import { commentListItemProps } from 'interface/gallery'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import SlideUpDialog from 'components/SlideUpDialog'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import clsx from 'clsx'
import { useIsmobile } from '@/theme'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comment: {
      wordBreak: 'break-word',
      breakWord: 'word-break',
    },
    hidden: { maxHeight: 80, overflow: 'hidden' },
  })
)

export interface CommentListProps {
  commentList: commentListItemProps[]
  hidden?: boolean
}
const CommentListContent: React.FC<CommentListProps> = ({
  commentList,
  hidden,
}) => {
  const classes = useStyles()
  return (
    <List>
      {commentList.length === 0 ? (
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          component="p"
        >
          no comments
        </Typography>
      ) : (
        commentList.map((o, k) => (
          <ListItem key={k} divider={k !== commentList.length - 1}>
            <ListItemText
              primary={
                <Grid container justify="space-between">
                  <Typography component="span">{o.userName}</Typography>
                  <Typography component="span">{o.time}</Typography>
                </Grid>
              }
              secondary={
                <div
                  className={clsx(classes.comment, {
                    [classes.hidden]: hidden,
                  })}
                  dangerouslySetInnerHTML={{
                    __html: `${o.comment}<span> ${o.score}</span>`,
                  }}
                />
              }
              secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
        ))
      )}
    </List>
  )
}

const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const matches = useIsmobile()
  return (
    <>
      <CommentListContent hidden commentList={commentList.slice(0, 2)} />
      {commentList.length > 0 && (
        <CardActions>
          <Button fullWidth onClick={() => setOpen(true)}>
            MORE
          </Button>
        </CardActions>
      )}
      <SlideUpDialog
        fullScreen={Boolean(matches)}
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
      >
        {matches && (
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" onClick={() => setOpen(false)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography style={{ marginLeft: theme.spacing(2) }} variant="h6">
                Comments
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        <CommentListContent commentList={commentList} />
      </SlideUpDialog>
    </>
  )
}
export default CommentList