'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, AlertCircle } from "lucide-react"
import { IChat, IMessage } from "@/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/skeletons/spinner"
import { getSenderData } from "./getSenderData"

interface ChatSectionProps {
  sender:"doctor"|"patient";
  messages: IMessage[];
  onSendMessage: (message: string) => void;
  isError: boolean;
  isPending:boolean;
  isLoading: boolean;
  chat:IChat;
  error?: string;
}

const ChatSection = ({ messages, onSendMessage, sender, error, isError, isLoading, chat, isPending }: ChatSectionProps) => {
  const [message, setMessage] = useState("");
  const router = useRouter()

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <p className="text-lg font-semibold">Error loading chat</p>
          <p className="text-sm text-muted-foreground">{error || "An unknown error occurred"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={()=>router.back()} className="sm:hidden">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to chat list</span>
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={getSenderData(sender,chat.doctorProfile!,chat.patientProfile!)||`/assets/icons/circle-user.svg`} alt={`${getSenderData(sender,chat.doctorName!,chat.patientName!)}`} />
            <AvatarFallback>{sender}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{getSenderData(sender,chat.doctorName!,chat.patientName!)}</h2>
        </div>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map(({ _id, message, isReceived }) => (
            <div
              key={_id}
              className={`flex items-end gap-2 ${isReceived ? "justify-start" : "justify-end"}`}
            >
              <div className={`rounded-lg p-3 max-w-[70%] ${isReceived ? "bg-accent" : "bg-primary text-primary-foreground"}`}>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="border-t border-border p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Input 
            className="flex-1" 
            placeholder={`Message user ${getSenderData(sender,chat.doctorName!,chat.patientName!)}`} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default ChatSection