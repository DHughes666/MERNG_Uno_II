import { useState } from "react";
import { Box, Typography, TextField, InputLabel, 
    Button, useTheme, useMediaQuery } from "@mui/material";
import { ImBlogger } from "react-icons/im"
import { authStyles } from "./auth-styles";
import { useForm, SubmitHandler } from "react-hook-form"
import {useMutation} from '@apollo/client'
import { USER_LOGIN, USER_SIGNUP } from "../graphql/mutations";
import {useDispatch, useSelector} from "react-redux"
import { authActions } from "../../store/auth-slice";

type Inputs = {
    name: string
    email: string
    password: string
}

const Auth = () => {
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn)
    console.log(isLoggedIn);
    const {
        register, 
        formState: {errors}, 
        handleSubmit
    } = useForm<Inputs>();

    const dispatch = useDispatch( );
    const [login] = useMutation(USER_LOGIN);
    const [signup] = useMutation(USER_SIGNUP);
    const theme = useTheme();
    const isBeloMd = useMediaQuery(theme.breakpoints.down("md"));
    const [isSignup, setIsSignup] = useState(false)

    const onResReceived = (data: any) => {
        dispatch(authActions.login());
    }
    
    const onSubmit = async ({name, email, password}: Inputs) => {
             if (isSignup) {
                //signup
                try{
                    const res = await signup({variables: {name, email, password}})
                    if(res.data){
                        onResReceived(res.data);
                    }
                } catch (err: any){
                   console.log(err.message);                    
                }
                
             } else {
                // login
                try{
                    const res = await login({variables: {email, password}})
                    if(res.data){
                        onResReceived(res.data);
                        console.log(res.data);
                        
                    }
                } catch (err: any){
                    console.log(err.message);
                    
                }
             }
    }

    return <Box sx={authStyles.container}>
        <Box sx={authStyles.logoTitle}>
        <ImBlogger 
            size={'30px'}
            style={{
                borderRadius: "50%", padding: "10px",
                backgroundColor: "#6c5252"
            }} 
        />
        <Typography sx={authStyles.logoText}>Prome Blog</Typography>
        </Box>
        <Box sx={{...authStyles.formContainer, width: isBeloMd ? "50%" : "200px"}}>
            <Typography sx={authStyles.logoText}>
                {isSignup ? "Signup" : "Login"}
            </Typography>
            {/** @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmit)} style={authStyles.form}>
                {isSignup && (
                    <>
                        <InputLabel arial-label="name"></InputLabel>
                        <TextField margin="normal"
                        InputProps={{style: {borderRadius: 10}}}
                        arial-label="name" label="Name"
                        {...register("name",{required: true})}
                        />
                    </>
                )}                
                <InputLabel arial-label="email"></InputLabel>
                <TextField 
                helperText={
                    Boolean(errors.email) ? "Invalid email" : ""
                }
                error={Boolean(errors.email)}
                margin="normal"
                InputProps={{style: {borderRadius: 10}}}
                arial-label="email" label="Email" type="email"
                {...register("email",{required: true, 
                    validate:(val:string)=>
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                            val
                        ),
                })}
                />
                <InputLabel arial-label="password"></InputLabel>
                <TextField 
                error={Boolean(errors.password)} 
                helperText={
                    Boolean(errors.password) ? "6 or more characters required" : ""
                } 
                margin="normal"
                InputProps={{style: {borderRadius: 10}}}
                arial-label="password" label="Password" type="password"
                {...register("password",{required: true, minLength: 6})}
                />
                <Button type="submit" variant="contained" sx={authStyles.submitBtn}>
                    Submit
                </Button>
                <Button 
                    
                    // @ts-ignore
                    sx={{...authStyles.submitBtn, ...authStyles.switchBtn}}
                    onClick={() => setIsSignup((prev) => !prev)}
                >
                    Switch to {isSignup ? "Login" : "Signup"}
                </Button>
            </form>
        </Box>
    </Box>
};

export default Auth;