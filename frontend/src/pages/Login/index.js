import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import loginRpaImage from "../../assets/login-rpa.gif";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${loginRpaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'contain',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    inputField: {
        margin: theme.spacing(2, 0),
        '& input': {
            padding: "10px 0",
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        marginTop: theme.spacing(2),
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline",
        },
    },
    logo: {
        width: '350px',
        marginBottom: theme.spacing(2),
    }
}));

const Login = () => {
    const classes = useStyles();

    const [user, setUser] = useState({ email: "", password: "" });
    const { handleLogin } = useContext(AuthContext);
    const [viewregister, setviewregister] = useState('disabled');

    const handleChangeInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetchviewregister();
    }, []);

    const fetchviewregister = async () => {
        try {
            const responsev = await api.get("/settings/viewregister");
            const viewregisterX = responsev?.data?.value;
            setviewregister(viewregisterX);
        } catch (error) {
            console.error('Error retrieving viewregister', error);
        }
    };

    const handlSubmit = e => {
        e.preventDefault();
        handleLogin(user);
    };

    const logo = `${process.env.REACT_APP_BACKEND_URL}/public/logotipos/login.png`;
    const randomValue = Math.random();
    const logoWithRandom = `${logo}?r=${randomValue}`;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div className={classes.content}>
                <img className={classes.logo} src={logoWithRandom} alt={`${process.env.REACT_APP_NAME_SYSTEM}`} />
                <form className={classes.form} noValidate onSubmit={handlSubmit}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={i18n.t("login.form.email")}
                        name="email"
                        value={user.email}
                        onChange={handleChangeInput}
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={i18n.t("login.form.password")}
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={handleChangeInput}
                        autoComplete="current-password"
                        className={classes.inputField}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {i18n.t("login.buttons.submit")}
                    </Button>
                    {viewregister === "enabled" && (
                        <Grid container>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    component={RouterLink}
                                    to="/signup"
                                    className={classes.link}
                                >
                                    {i18n.t("login.buttons.register")}
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/forgetpsw" variant="body2" className={classes.link}>
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default Login;
