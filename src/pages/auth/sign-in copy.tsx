import { Heading } from "@/components/@core/heading";
import InputField from "@/components/@core/inputs/input-field";
import PasswordField from "@/components/@core/inputs/password-field";
import Loader from "@/components/@core/Loader";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/sigin-form-schema";
import { useSession, useSignIn } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type SignInPageProps = Record<string, never>; // No props yet

const signInFormFields = [
  {
    component: InputField,
    name: "username",
    label: "username",
    placeholder: "Enter your username",
  },
  {
    component: PasswordField,
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    type: "password",
  },
];

const SignInPage: FC<SignInPageProps> = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { session } = useSession();
  const navigate = useNavigate();

  type SignInFormData = z.infer<typeof signInSchema>;

  const methods = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    console.log(data);
    const { username, password } = data;

    try {
      const signInResponse = await signIn?.create({
        identifier: username,
        password: password,
      });

      if (signInResponse) {
        navigate("/");
      }
    } catch (err: any) {
      console.log(err.message);
      // setError('Invalid credentials. Please try again.');
    }
  };

  // if (!session) {
  //   return <Loader />;
  // } else {
  //   navigate("/");
  // }

  return (
    <>
      <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 p-10">
        <div className="hidden md:block my-auto" data-aos="fade-left">
          <div className="mx-20 my-10">
            <img
              src="/images/png/Rank-BPO-LOGO.png"
              alt="logo"
              className="w-full h-full bg-contain"
            />
          </div>

          <div className="ml-40">
            <Heading
              title="Job Management System"
              description="HR management"
              className="mb-10 hidden md:block"
            />
          </div>
        </div>
        <div className="my-auto md:px-20" data-aos="fade-right">
          <div className="md:hidden mx-10 mb-10">
            <img
              src="/images/png/Rank-BPO-LOGO.png"
              alt="logo"
              className="w-full h-full bg-contain"
            />
          </div>

          <Heading
            title="Signin to your account"
            description="Enter your credentials to signin"
            className="mb-10 hidden md:block"
          />

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid gap-y-3 md:gap-y-7">
                {/* Render Fields Dynamically */}
                {signInFormFields.map(
                  ({ component: Component, colSpan, ...props }, colIndex) => (
                    <div key={colIndex} className="grid gap-y-3">
                      <div key={colIndex}>
                        <Component {...props} />
                      </div>
                    </div>
                  )
                )}

                {/* Submit Button */}
                <Button
                  size="lg"
                  variant="primary"
                  type="submit"
                  disabled={!isLoaded}
                >
                  Signin
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
