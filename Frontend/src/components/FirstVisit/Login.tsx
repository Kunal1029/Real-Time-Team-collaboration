
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"; // explained below
import {
  loginUser,
  signUpUser,
  signUpGoogle,
} from "../Redux/Features/authSlice";

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange?: (e: any) => void;
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required
    />
  </div>
);

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otherF, setOtherF] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/user/nav"); 
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(signUpUser({ email, password }));
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 container py-20", className)}
      {...props}
    >
      {/* <button onClick={signupUser}>Put data</button> */}
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-muted-foreground text-balance">
                  {isLogin ? "Login to your account" : "Become productive now"}
                </p>
              </div>

              {!isLogin && (
                <FormField
                  id="name"
                  value={otherF}
                  label="Name"
                  placeholder="Ravi Kumar"
                  onChange={(e) => setOtherF(e.target.value)}
                />
              )}
              <FormField
                id="email"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="m@example.com"
              />

              <FormField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // ✅ fix
                label="Password"
                type="password"
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {isLogin ? (
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-30 mx-auto"
                  // onClick={loginUser}
                >
                  {loading ? "Processing..." : ""}
                  Login
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-30 mx-auto"
                  // onClick={signUpUser}
                >
                  {loading ? "Processing..." : ""}
                  SignUp
                </Button>
              )}

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="mx-auto">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full "
                  onClick={() => dispatch(signUpGoogle())}
                  disabled={loading}
                >

                  {/* Placeholder icons - Replace with real ones if needed */}
                  <span className="text-sm">
                    {" "}
                    {loading ? "Signing in..." : "Sign in with Google"}
                  </span>
                </Button>
              </div>

              <div className="text-center text-sm ">
                {isLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="underline underline-offset-4 duration-300 ease-in"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="underline underline-offset-4 "
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/loginimg.jpg"
              alt="Login visual"
              className="absolute inset-0 h-full w-full object-cover  "
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
