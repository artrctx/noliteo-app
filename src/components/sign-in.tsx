import { useRouter } from "expo-router";
import { useState, useTransition } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import z from "zod";
import { authClient } from "../lib/auth/client";
import { T } from "./base/text";
import { TextInput } from "./base/text-input";

type InnerSignUpInProps = {
  username: string;
  reset: () => void;
};

const emailSchema = z.email();

type SignUpFieldValues = Omit<NonNullable<Extract<SignUpInValues, { type: "signup" }>>, "type">;
function SignUp({ username, reset }: InnerSignUpInProps) {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const [{ email, password, confirmPassword }, setFieldValues] = useState<SignUpFieldValues>({});
  const [error, setError] = useState<string>();
  const onSubmit = async () => {
    if (isPending || !email || !password || !confirmPassword) return;
    if (!emailSchema.safeParse(email).success) {
      setError("Invalid email format");
      return;
    }
    if (password !== confirmPassword) {
      setError("Why password not match?");
      return;
    }
    const signup = await authClient.signUp.email({
      username,
      email,
      password,
      name: username,
      displayUsername: username,
    });

    if (signup.error) {
      //! handle error and toast error
      console.error(signup.error);
      return;
    }
    router.replace("/protected");
  };

  return (
    <Animated.View
      className="items-center gap-y-2"
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
    >
      <View className="flex-row items-center justify-center">
        <T>Hi, </T>
        <Pressable onPress={reset}>
          <T className="underline">{username}</T>
        </Pressable>
      </View>
      {error && <T className="text-sm text-red">{error}</T>}
      <TextInput
        placeholder="email"
        autoComplete="email"
        className="min-w-44 border-b text-center"
        value={email}
        onChangeText={(txt) => {
          if (isPending) return;
          if (error) setError(undefined);
          setFieldValues((prev) => ({
            ...prev,
            email: txt,
          }));
        }}
      />
      <TextInput
        placeholder="password"
        className="min-w-44 border-b text-center"
        secureTextEntry={true}
        value={password}
        onChangeText={(txt) => {
          if (isPending) return;
          if (error) setError(undefined);
          setFieldValues((prev) => ({
            ...prev,
            password: txt,
          }));
        }}
      />
      <TextInput
        placeholder="confirm password"
        className="min-w-44 border-b text-center"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(txt) => {
          if (isPending) return;
          if (error) setError(undefined);
          setFieldValues((prev) => ({
            ...prev,
            confirmPassword: txt,
          }));
        }}
      />
      {!!password && !!confirmPassword && (
        <Pressable
          className="items-center border border-primary px-2 py-1"
          onPress={() => {
            if (isPending) return;
            setTransition(onSubmit);
          }}
        >
          <T>Ready?</T>
        </Pressable>
      )}
    </Animated.View>
  );
}

function SignIn({ username, reset }: InnerSignUpInProps) {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const [psw, setPassword] = useState<string>();
  const onSubmit = async () => {
    if (!psw) return;
    const res = await authClient.signIn.username({
      username,
      password: psw,
    });
    if (res.error) {
      //! properly handle
      console.error(res.error);
      return;
    }
    router.replace("/protected");
  };
  return (
    <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(150)}>
      <View className="flex-row">
        <T>Welcome back, </T>
        <Pressable onPress={reset}>
          <T className="underline">{username}</T>
        </Pressable>
      </View>
      <TextInput
        placeholder="password"
        className="min-w-44 border-b text-center"
        secureTextEntry={true}
        aria-disabled={true}
        value={psw}
        onChangeText={(txt) => {
          if (isPending) return;
          setPassword(txt);
        }}
        onSubmitEditing={() => {
          if (isPending) return;
          setTransition(onSubmit);
        }}
      />
    </Animated.View>
  );
}

function UsernameCheck({
  defaultValue,
  onUsernameSet,
}: {
  defaultValue?: string;
  onUsernameSet: (_usr: string, _available: boolean) => void;
}) {
  const [username, setUsername] = useState<string | undefined>(defaultValue);
  const [isPending, setTransition] = useTransition();
  const onUsernameSubmit = async () => {
    if (!username) return;
    const usrCheck = await authClient.isUsernameAvailable({ username });

    if (usrCheck.error) {
      //! handle error | show toast
      console.info(usrCheck);
      return;
    }

    onUsernameSet(username, !!usrCheck?.data.available);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      className="items-center justify-center gap-y-1"
    >
      <T>You're</T>
      <TextInput
        placeholder="username"
        className="min-w-44 border-b text-center"
        value={username}
        onChangeText={(txt) => setUsername(txt.trim())}
        onSubmitEditing={() => {
          if (!username || isPending) return;
          setTransition(onUsernameSubmit);
        }}
      />
    </Animated.View>
  );
}

type SignUpInValues =
  | { type: "signin"; password?: string }
  | { type: "signup"; email?: string; password?: string; confirmPassword?: string };

export function SignUpIn() {
  const [username, setUsername] = useState<string>();
  const [value, setValue] = useState<SignUpInValues>();

  if (!username || !value)
    return (
      <UsernameCheck
        defaultValue={username}
        onUsernameSet={(usr, available) => {
          setUsername(usr);
          setValue((prev) => ({ ...prev, type: available ? "signup" : "signin" }));
        }}
      />
    );

  return value?.type === "signin" ? (
    <SignIn username={username} reset={() => setValue(undefined)} />
  ) : (
    <SignUp username={username} reset={() => setValue(undefined)} />
  );
}
