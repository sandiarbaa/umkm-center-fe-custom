"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 1. Define schema
const formSchema = z.object({
  email: z.string().email({
    message: "Masukkan email yang valid.",
  }),
  password: z.string().min(6, {
    message: "Password minimal 6 karakter.",
  }),
});

function App() {
  // 2. Setup useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", values);
      console.log("✅ Login success:", res.data);

      // contoh kalau dapet token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // TODO: redirect ke dashboard
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Login error:", err.response?.data || err.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-5 flex-col gap-y-10">
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        UMKM Center Login
      </h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@kelurahan.go.id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default App;
