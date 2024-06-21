
"use client";
import {
  CornerDownLeft,
  Info,
  MessageCirclePlus,
  Mic,
  Paperclip,
  Phone,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/api/supabaseClient";
import { fetchMessages, sendMessage } from "../fetchers/chatServices";


export default function Home() {

  const [messages, setMessages] =  useState<any[]>([]);
  const [senderId, setSenderId] = useState<number>(1) ;
  const [recipientId, setRecipientId] = useState(2) ;

  useEffect(() => {
    

    const fetchInitialMessages = async () => {
      const fetchedMessages = await fetchMessages(2, recipientId);
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    };

    fetchInitialMessages();

    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();
      console.log("messages : ", messages)

    return () => {
      supabase.removeChannel(channel);
    };
  }, [senderId, recipientId]);


  const [messageContent, setMessageContent] = useState<string>('');
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim() === '') return;

    const newMessage = await sendMessage(senderId, recipientId, messageContent);
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage[0]]);
      setMessageContent('');
    }
  };

  return (
    <div className="flex gap-6 w-full h-full">
      <Card className="w-1/3 h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Discussions</CardTitle>
          <MessageCirclePlus className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-black" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-background pl-8"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
              <div
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl bg-primary text-white",                  
                )}
              >
                <Avatar>
                  <AvatarImage
                    alt="photo"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p>{messages[0]?.name}</p>
                  <h4 className="text-sm font-medium">{messages[messages.length - 1]?.name}</h4>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground text-white"
                    )}
                  >
                    {messages[messages.length - 1]?.content}
                  </p>
                </div>
              </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-2/3 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between py-2 border-b-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage alt="photo" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>CHAT</span>
            </div>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Phone className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender_id === senderId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl ${
                    message.sender_id === senderId
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <Avatar className="size-7">
                    <AvatarImage alt="photo" src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            className="w-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            onSubmit={handleSendMessage}
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Input
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="flex items-center p-3 pt-0">
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
  
}
