'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { useRouter } from "next/navigation"


const page = () => {
  const [username, setUsername] = useState('');
  const [usernameMsg, setUsernameMsg] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation on form
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() =>{
    const checkUniqueUsername = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true);
        setUsernameMsg('');
        try {
          const response = await axios.get(`/api/check-unique-username?username=${debouncedUsername}`);
          // console.log(response);
          setUsernameMsg(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMsg(
            axiosError.response?.data.message ?? "Error checking unique username"
          )
        } finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUniqueUsername();
    const onSubmit = async (data : z.infer<typeof signUpSchema>) => {
      setIsSubmitting(true);
      try {
        const  response = await axios.post<ApiResponse>('/api/sign-up', data);
        // console.log(data);
        toast({
          title: 'Success',
          description: response.data.message,
        })
        router.replace(`/verify/${username}`);
        setIsSubmitting(false)
      } catch (error) {
        console.error("Error in signup of user", error);
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMsg = axiosError.response?.data.message;
        toast({
          title: 'Signup failed',
          description: errorMsg,
          variant: "destructive"
        })
        setIsSubmitting(false);
      }
    }
  }, [debouncedUsername])

  return (
    <div>page</div>
  )
}

export default page