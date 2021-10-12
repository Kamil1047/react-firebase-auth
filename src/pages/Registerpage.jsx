import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../redux/actions/actions";

export default function Registerpage() {
  const history = useHistory();
  const { signInWithGoogle, register } = useAuth();
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const mounted = useRef(false);

  useEffect(() => {
    if (currentUser) {
      history.push("/profile");
    }
    // mounted.current = true;
    // return () => {
    //   mounted.current = false;
    // };
  }, [currentUser, history]);

  const { email, password, confirmPassword, displayName } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        description: "Password does not match",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);

    dispatch(registerInitiate(email, password, displayName));
    setUser({
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={
            handleSubmit
            //   async (e) => {
            //   e.preventDefault();
            //   if (!email || !password) {
            //     toast({
            //       description: "Credentials not valid.",
            //       position: "top-right",
            //       status: "error",
            //       duration: 2000,
            //       isClosable: true,
            //     });
            //     return;
            //   }
            //   // your register logic here
            //   setIsSubmitting(true);
            //   register(email, password)
            //     .then(() => {
            //       toast({
            //         description: "User Registered Successfully.",
            //         position: "top-right",
            //         status: "success",
            //         duration: 2000,
            //         isClosable: true,
            //       });
            //     })
            //     .catch((error) => {
            //       toast({
            //         description: error.message,
            //         position: "top-right",
            //         status: "error",
            //         duration: 2000,
            //         isClosable: true,
            //       });
            //     })
            //     .finally(() => {
            //       mounted.current && setIsSubmitting(false);
            //     });
            // }
          }
        >
          <Stack spacing="6">
            <FormControl id="displayName">
              <FormLabel>Name</FormLabel>
              <Input
                name="displayName"
                type="text"
                autoComplete="displayName"
                required
                value={user.displayName}
                onChange={
                  handleChange
                  // (e) => setName(e.target.value)
                }
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={user.email}
                onChange={
                  handleChange
                  // (e) => setEmail(e.target.value)
                }
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
                value={user.password}
                onChange={
                  handleChange
                  // (e) => setPassword(e.target.value)
                }
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                required
                value={user.confirmPassword}
                onChange={
                  handleChange
                  // (e) => setPassword(e.target.value)
                }
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="pink"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(() =>
                toast({
                  description: "User Registered Successfully.",
                  position: "top-right",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                })
              )
              .catch((e) =>
                toast({
                  description: e.message,
                  position: "top-right",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                })
              )
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
