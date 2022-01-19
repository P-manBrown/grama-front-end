import * as React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkTo from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from "../lib/api/Auth";
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import SignInImage from '../images/SignInImage.png'
import NameLogo from '../images/NameLogo.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © P-man Brown 2022 '}
      <br />
      <LinkTo  color="inherit" href="https://github.com/P-manBrown">
        GitHub(@P-manBrown)
      </LinkTo>
    </Typography>
  );
}

const theme = createTheme();

export const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [password,setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = {
      email: email,
      password: password,
    }
    try{
      const res = await signIn(params);
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        navigate("/todo")

        console.log("Success sign in!!")
        console.log(res.data.data)
      } else {
        console.log("failure sign in(try)")
      }
    } catch (err) {
      console.log("failure sign in (catch)")
      console.log(err)
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SignInImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={`${NameLogo}`} />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ mt: 3 }}
                onChange={event => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                // 空欄ありの場合、`Sign in`ボタン押下不可
                disabled={!email || !password ? true : false}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link to="/sign_up" variant="body2">
                    新規登録はこちら
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 10 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
