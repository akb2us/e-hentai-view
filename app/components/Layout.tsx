import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import {
  Divider,
  Box,
  Typography,
  Container,
  Grid,
  Backdrop,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Menu,
  Hidden,
  Tooltip,
} from '@material-ui/core'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { useThemeState } from 'src/theme'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'components/Link'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SettingsIcon from '@material-ui/icons/Settings'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import clsx from 'clsx'
import HideOnScroll from 'components/HideOnScroll'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation } from 'i18n'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    link: {
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    header: {
      height: 40,
    },
    bakcdrop: {
      zIndex: theme.zIndex.speedDial - 1,
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },

    list: { minWidth: 250, flexGrow: 1 },
    fullScreen: {
      position: 'fixed',
      top: 56,
      right: 0,
      bottom: 0,
      left: 0,
    },
    gutterBottom: { paddingTop: theme.spacing(2) },
  })
)

const MENU = [
  { title: 'Front Page', icon: <HomeIcon />, link: '/' },
  { title: 'Watched', icon: <SubscriptionsIcon />, link: '/watched' },
  { title: 'Popular', icon: <WhatshotIcon />, link: '/popular' },
  { title: 'Favorites', icon: <FavoriteIcon />, link: '/favorites' },
  { title: 'Histories', icon: <HistoryIcon />, link: '/histories' },
  { title: 'Settings', icon: <SettingsIcon />, link: '/settings' },
]

type Props = {
  title?: string
  noContainer?: boolean | null
  fullScreen?: boolean
  gutterBottom?: boolean
  tool?: React.ReactNode
  showBack?: boolean
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  noContainer,
  fullScreen,
  gutterBottom,
  showBack,
  tool,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const dispatch = useThemeState()
  const [t] = useTranslation()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  return (
    <div className={classes.root}>
      <Head>
        <title>{title ? title + ' - EhentaiView' : 'EhentaiView'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HideOnScroll>
        <AppBar position="sticky">
          <Toolbar>
            {showBack ? (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => Router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title} noWrap>
              {title || 'EhentaiView'}
            </Typography>
            <Hidden xsDown>
              {MENU.map((o) => (
                <Tooltip key={o.title} title={t(o.title) as string}>
                  <Link href={o.link} naked>
                    <IconButton color="inherit">{o.icon}</IconButton>
                  </Link>
                </Tooltip>
              ))}
            </Hidden>
            {tool}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <SwipeableDrawer
        disableDiscovery={iOS}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className={classes.list}>
          <List onClick={() => setOpen(false)}>
            <Link naked href="/">
              <ListItem>
                <ListItemText
                  primary="EhentaiView"
                  primaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
            </Link>
            <Divider variant="fullWidth" />
            {MENU.map((o, k) => (
              <Link href={o.link} naked key={k}>
                <ListItem button>
                  <ListItemIcon>{o.icon}</ListItemIcon>
                  <ListItemText primary={t(o.title)} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
        <Copyright />
      </SwipeableDrawer>
      <div
        className={clsx({
          [classes.fullScreen]: fullScreen,
          [classes.gutterBottom]: gutterBottom,
        })}
      >
        {noContainer ? (
          children
        ) : (
          <Container maxWidth="lg" style={{ minHeight: '100%' }}>
            <>{children}</>
          </Container>
        )}
      </div>
    </div>
  )
}
function Copyright() {
  return (
    <List dense>
      <a href="https://github.com/IronKinoko" target="_blank">
        <ListItem button>
          <ListItemText
            primaryTypographyProps={{
              variant: 'subtitle2',
              color: 'textSecondary',
            }}
            primary={`Copyright @${new Date().getFullYear()} Kinoko`}
            secondary={'Ver.' + process.env.VERSION}
          />
        </ListItem>
      </a>
    </List>
  )
}
export default Layout
