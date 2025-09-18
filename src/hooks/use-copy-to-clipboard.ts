"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useCopyToClipboard() {
  const { toast } = useToast()
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = (text: string | undefined) => {
    if (!text) {
        toast({
            title: "Nothing to copy",
            description: "The code is not available to be copied.",
            variant: "destructive",
        })
        return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setHasCopied(true)
        toast({
          title: "Copied!",
          description: "Code has been copied to your clipboard.",
        })
        setTimeout(() => {
          setHasCopied(false)
        }, 2000)
      },
      (err) => {
        toast({
          title: "Error",
          description: "Could not copy code to clipboard.",
          variant: "destructive",
        })
        console.error("Failed to copy: ", err)
      }
    )
  }

  return { hasCopied, copyToClipboard }
}
