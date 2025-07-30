"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FlexyCazhFormContent } from "./flexy-cazh-form-content"

export function FlexyCazhFormDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
        variant={"secondary"}
        className="">Ajukan FlexyCazh</Button>
      </DialogTrigger>
        {/* <Button 
        variant={"outline"}
        className="border-primary text-primary hover:bg-primary hover:text-white ml-5">Hubungi Kami</Button> */}
      <DialogContent className="sm:max-w-[800px] p-0 border-none bg-transparent">
        {/* DialogHeader, DialogDescription, DialogTitle are not used here as the content has its own header */}
        <FlexyCazhFormContent />
      </DialogContent>
    </Dialog>
  )
}
