"use client";
import Image from "next/image";

import LoginImg from "@/Assets/loginImg.png";
import { useForm } from "react-hook-form";
import { LoginForm, LoginSchema } from "@/Schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Submitbtn from "@/components/ui/submitbtn";
import { LoginUser } from "@/service/API/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });
  const router=useRouter()
  const OnSubmit = async (data: LoginForm) => {
    try {
      console.log("this is the data", data);
      const res = await LoginUser(data);
      if(res){
         console.log("this is the response", res);
      toast.success("login successfully");
      setTimeout(()=>{
           router.replace('/')
      },1000)
   
      }
     
      
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="bg-background h-screen w-full flex overflow-y-hidden no-scrollbar">
      <div className="w-1/2 h-full relative">
        <Image src={LoginImg} alt="img" className="object-fill" />
      </div>
      <div className="w-1/2 h-full flex flex-col gap-2 items-center justify-center">
        <form className="space-y-2" onSubmit={handleSubmit(OnSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold">Nice to See YOU!</h1>
            <p>Enter your email and password to sign in</p>
          </div>
          <Input
            placeholder="Your email address"
            register={register("email")}
            label="Email"
            className="bg-card"
            error={errors.email?.message}
          />
          <Input
            placeholder="Your password"
            register={register("password")}
            label="Password"
            className="bg-card"
            error={errors.password?.message}
          />
          <Submitbtn
         
            type="submit"
            label="sign-in"
            className="bg-main-primary text-primary w-full"
          />
        </form>
      </div>
    </div>
  );
}
