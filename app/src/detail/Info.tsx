import React from 'react'
import { IndexListItemPorps, tagListItemProps } from 'interface/gallery'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card,
  Hidden,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import LoadMedia from 'components/LoadMedia'
import InfoCard from './InfoCard'
import TagList from './TagList'
import clsx from 'clsx'
import Link from 'components/Link'
import SelectTypography from 'components/SelectTypography'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TorrentIcon from 'components/TorrentIcon'
import { useRouter } from 'next/router'
import { axios } from 'apis'
import FavIconButton from './FavIconButton'
import TorrentIconButton from './TorrentIconButton'
import ColorChip from 'components/ColorChip'
import { useTranslation } from 'i18n'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: 0,
    },

    cover: {
      margin: theme.spacing(0, 'auto'),
      maxHeight: 320,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
    },
    divider: { margin: theme.spacing(1, 0) },

    border: {
      overflow: 'auto',
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
      borderWidth: '0 1px',
      [theme.breakpoints.down('xs')]: {
        borderWidth: '1px 0',
      },
    },

    infoContainer: {
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 93px)',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    smTitle: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        '& *': {
          textAlign: 'left !important',
        },
      },
    },
    smallCover: {
      width: 103,
      height: 150,
      marginRight: theme.spacing(2),
    },
    actions: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
)

const Info: React.FC<{
  info: IndexListItemPorps
  tagList: tagListItemProps[]
}> = ({ info, tagList }) => {
  const classes = useStyles()
  const router = useRouter()
  const [t] = useTranslation()
  return (
    <Card className={classes.root}>
      <Hidden smDown>
        {info.thumb ? (
          <div className={classes.center}>
            <LoadMedia className={clsx(classes.cover)} src={info.thumb} />
          </div>
        ) : (
          <Skeleton variant="rect" animation="wave" width={240} height={320} />
        )}
      </Hidden>
      <CardContent className={classes.details}>
        <div className={classes.smTitle}>
          <Hidden smUp>
            <LoadMedia className={clsx(classes.smallCover)} src={info.thumb} />
          </Hidden>
          <div>
            <SelectTypography variant="subtitle1" gutterBottom align="center">
              {info.title_jpn}
            </SelectTypography>
            <Hidden smUp>
              <Link
                color="inherit"
                href={`/?f_search=uploader:${info.uploader}`}
              >
                <Typography gutterBottom>{info.uploader}</Typography>
              </Link>
              <ColorChip label={info.category} />
            </Hidden>
          </div>

          <Hidden xsDown>
            <SelectTypography variant="subtitle2" gutterBottom align="center">
              {info.title}
            </SelectTypography>
          </Hidden>
        </div>
        <Divider variant="fullWidth" className={classes.divider} />
        <Grid container spacing={2} className={classes.infoContainer}>
          <Grid item>
            <InfoCard record={info} />
          </Grid>
          <Grid item xs className={classes.border} zeroMinWidth>
            <TagList tagList={tagList} />
          </Grid>
          <Grid item className={classes.actions}>
            <Tooltip title={t('Download') as string}>
              <IconButton
                color="primary"
                onClick={() =>
                  router.push(
                    '/[gid]/[token]/download',
                    `${info.path}/download`
                  )
                }
              >
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
            <TorrentIconButton info={info} />
            <FavIconButton info={info} />
            <Tooltip title={t('OpenEH') as string}>
              <Link
                underline="none"
                href={info.url}
                prefetch={false}
                target="_blank"
              >
                <IconButton color="primary">
                  <OpenInNewIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Info
