"use client"

import { Head, useForm } from "@inertiajs/react"
import { LoaderCircle } from "lucide-react"
import type { FormEventHandler } from "react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: "", // Nilai awal seperti di contoh
    password: "",   // Nilai awal seperti di contoh
    remember: true,             // Nilai awal seperti di contoh
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post("/login", {
      onFinish: () => reset("password"),
    })
  }

  return (
    <>
      <Head title="Login" />
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        {/* Kolom Kiri: Form */}
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="grid gap-2 text-left">
              {/* Gunakan komponen Logo Anda di sini */}
              <img src="/images/Cards.png" alt="Cards Logo" className="w-40 mb-5"/>
              <h1 className="text-3xl font-bold">Halo, Selamat Datang</h1>
              <p className="text-balance text-muted-foreground">
                Masuk untuk melanjutkan
              </p>
            </div>

            <form className="grid gap-4" onSubmit={submit}>
              <div className="grid gap-2">
                {/* Label dihilangkan untuk mencocokkan desain */}
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukan email anda"
                  required
                  autoFocus
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="h-12"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukan password anda"
                  required
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="h-12"
                />
                <InputError message={errors.password} />
              </div>


              <Button type="submit" className="w-full h-11" disabled={processing} variant="default">
                {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                Masuk
              </Button>
            </form>

            <div className=" flex justify-between text-center text-sm">
              <div>
              Belum punya akun?{" "}
              <TextLink href="/register" className="underline font-semibold">
                Daftar
              </TextLink>
              </div>
              <div className="flex items-center">
                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={data.remember}
                    onCheckedChange={(checked) => setData("remember", !!checked)}
                  /> */}
                  {/* <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div> */}
                {canResetPassword && (
                  <TextLink href="/forgot-password" className="ml-auto font-light inline-block text-sm hover:underline hover:cursor-pointer">
                    Forgot Password?
                  </TextLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Ilustrasi */}
        <div className="bg-primary hidden lg:flex flex-col items-center justify-center p-10">
            <img
                src="/images/maps.png" // Pastikan path ini benar
                alt="Authentication Illustration"
                className="h-auto w-[80%] mb-6"
            />
            <div className="text-center text-white">
                <h2 className="text-4xl font-bold">Digitize <span className="text-white">400+</span> Schools</h2>
                <h3 className="text-xl mt-2">In 27+ Provinces throughout Indonesia</h3>
            </div>
        </div>
      </div>
    </>
  )
}