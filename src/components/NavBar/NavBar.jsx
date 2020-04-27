import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BookApp from '../BookApp/BookApp.jsx';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    searchDiv: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100em',
    },
    leftDiv: {
        display: 'flex',
    },
    bookDiv:{
        display:'none',
        flexDirection:'row',
        [theme.breakpoints.up('sm')]: {
            display:'flex',
        },
    },
    navDiv: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'whitesmoke',
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.50),
        // },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width:'30em',
        },
    },

    bookImage: {
        width: '21%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        color: '#707070',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        color: '#707070',
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            marginLeft:'-10em'
        },
    },

}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function BackToTop(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar style={{ backgroundColor: 'brown' }}>
                <Toolbar>
                    <div className={classes.searchDiv}>
                        <div className={classes.leftDiv}>
                            {/* <div> <img className={classes.bookImage} src={require(`/home/rohini/Pictures/Reactproject/bookstore/src/images/book.svg`)} alt="item" /></div> */}
                            <div className={classes.bookDiv}>
                                <div style={{marginRight:'-4em'}}><img className={classes.bookImage} src={require(`/home/rohini/Pictures/Reactproject/bookstore/src/images/book.svg`)} alt="item" />   </div>
                                <Typography className={classes.title} variant="h6">BookStore</Typography></div>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </div>
                        <div style={{marginTop:'0.3%'}}><Badge badgeContent={4} color="primary"> <Typography variant="subtitle1">Cart</Typography><ShoppingCartOutlinedIcon /></Badge></div>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container>
                    < BookApp />
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
