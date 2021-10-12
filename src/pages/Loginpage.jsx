import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Loginpage() {
  const history = useHistory();
  const { signInWithGoogle, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  // const mounted = useRef(false)
  const location = useLocation();

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  const mounted = useMounted();

  function handleRedirectToOrBack() {
    history.replace(location.state?.from ?? "/profile");
    // if (location.state) {
    //   history.replace(location.state?.from)
    // } else {
    //   history.replace('/profile')
    // }
  }

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email || !password) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            // your login logic here
            setIsSubmitting(true);
            login(email, password)
              .then((res) => {
                handleRedirectToOrBack();
                toast({
                  description: "User Login Successfully.",
                  position: "top-right",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              })
              .catch((error) => {
                toast({
                  description: error.message,
                  position: "top-right",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
              })
              .finally(() => {
                // setTimeout(() => {
                //   mounted.current && setIsSubmitting(false)

                // }, 1000)
                mounted.current && setIsSubmitting(false);
              });
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type="submit"
              colorScheme="pink"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => {
                handleRedirectToOrBack();
              })
              .catch((e) =>
                toast({
                  description: e.message,
                  position: "top-right",
                  status: "error",
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
