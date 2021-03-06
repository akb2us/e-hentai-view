import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import Link from 'components/Link'
import LoadMedia from 'components/LoadMedia'
import ColorChip from 'components/ColorChip'
import { IndexListItemPorps } from 'interface/gallery'
import { Rating } from '@material-ui/lab'
import clsx from 'clsx'
import { useIsmobile } from '@/theme'
import RatingInview from './RatingInview'
import { useInViewport } from '@umijs/hooks'
import useInViewportWithDistance from 'hooks/useInViewportWithDistance'
import { LOCAL_HISTORY } from 'constant'
import { uniqBy } from 'lodash'
function storageHistory(record: IndexListItemPorps) {
  const his = JSON.parse(
    localStorage.getItem(LOCAL_HISTORY) || '[]'
  ) as IndexListItemPorps[]

  his.unshift(record)

  localStorage.setItem(
    LOCAL_HISTORY,
    JSON.stringify(uniqBy(his, 'gid').slice(0, 50))
  )
}

const useMobileStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: 136 },
    img: {
      width: 95,
      height: 136,
    },
    title: {
      fontSize: '10pt',
      overflow: 'hidden',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
    },
    full: {
      height: '100%',
      width: '100%',
    },
    gutterBottom: { marginBottom: theme.spacing(1) },
    content: { padding: theme.spacing(1) },
  })
)
export const MobileLoadingCard = () => {
  const classes = useMobileStyles()

  return (
    <Card className={classes.root}>
      <Grid container wrap={'nowrap'}>
        <Grid item>
          <Skeleton animation="wave" className={classes.img} variant="rect" />
        </Grid>
        <Grid item xs>
          <div className={clsx(classes.content, classes.full)}>
            <Grid container direction="column" className={classes.full}>
              <Grid item xs>
                <Skeleton animation="wave" variant="text" width="90%" />
              </Grid>
              <Grid
                item
                container
                wrap="nowrap"
                className={classes.gutterBottom}
              >
                <Skeleton animation="wave" variant="text" width="70%" />
              </Grid>
              <Grid item container wrap="nowrap">
                <Skeleton animation="wave" variant="text" width="30%" />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}
export const MobileCard: React.FC<{ record: IndexListItemPorps }> = ({
  record,
}) => {
  const classes = useMobileStyles()

  const [inview, ref] = useInViewportWithDistance(600)

  return (
    <Card className={classes.root} ref={ref}>
      {inview && (
        <Link naked href="/[gid]/[token]" as={`/${record.gid}/${record.token}`}>
          <CardActionArea onClick={() => storageHistory(record)}>
            <Grid container wrap={'nowrap'}>
              <Grid item>
                <LoadMedia
                  alt={record.title_jpn}
                  src={record.thumb}
                  title={record.title_jpn}
                  className={classes.img}
                  lazy
                />
              </Grid>
              <Grid item xs>
                <div className={clsx(classes.content, classes.full)}>
                  <Grid container direction="column" className={classes.full}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        className={classes.title}
                        title={record.title_jpn}
                      >
                        {record.title_jpn}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      wrap="nowrap"
                      className={classes.gutterBottom}
                      spacing={1}
                    >
                      <Grid item xs>
                        <RatingInview
                          value={record?.rating ? +record.rating : 0}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="span"
                        >
                          {record.tags?.includes('chinese') && 'ZH'}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="span"
                        >
                          {record.filecount + 'P'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container wrap="nowrap">
                      <Grid item xs>
                        <ColorChip
                          variant="outlined"
                          label={record.category}
                          size="small"
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="span"
                        >
                          {record.time}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Link>
      )}
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { fontSize: '10pt', height: 36, overflow: 'hidden' },
    card: { margin: theme.spacing(0, 'auto') },
  })
)

export const DesktopLoadingCard = () => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Skeleton variant="rect" animation="wave" height={350} />
      <Skeleton
        animation="wave"
        height={10}
        width="80%"
        style={{ margin: '16px 8px' }}
      />
      <Skeleton
        animation="wave"
        height={10}
        width="50%"
        style={{ margin: '16px 8px' }}
      />
    </Card>
  )
}

export const DesktopCard: React.FC<{ record: IndexListItemPorps }> = ({
  record,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link naked href="/[gid]/[token]" as={`/${record.gid}/${record.token}`}>
        <CardActionArea onClick={() => storageHistory(record)}>
          <LoadMedia
            alt={record.title_jpn}
            src={record.thumb}
            title={record.title_jpn}
            height={350}
            lazy
          />
          <CardContent>
            <Typography
              gutterBottom
              align="center"
              className={classes.title}
              component="h2"
            >
              {record.title_jpn}
            </Typography>
            <Grid container alignItems="center" justify="space-between">
              <ColorChip
                variant="outlined"
                label={record.category}
                size="small"
              />
              <RatingInview value={+record.rating} />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="span"
                >
                  {record.time}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="span"
                >
                  {record.tags?.includes('chinese') && 'ZH'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="span"
                >
                  {record.filecount}P
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export const LoadingCard = () => {
  const matches = useIsmobile()
  if (matches === null) return null
  return matches ? (
    <Grid item xs={12}>
      <MobileLoadingCard />
    </Grid>
  ) : (
    <Grid item xs>
      <DesktopLoadingCard />
    </Grid>
  )
}
const GalleryCard: React.FC<{ record: IndexListItemPorps }> = ({ record }) => {
  const matches = useIsmobile()
  if (matches === null) return null

  return matches ? (
    <MobileCard record={record} />
  ) : (
    <DesktopCard record={record} />
  )
}
export default GalleryCard
