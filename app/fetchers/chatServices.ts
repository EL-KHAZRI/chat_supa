import { supabase } from "@/api/supabaseClient";

export async function fetchMessages(senderId: number, recipientId: number) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${senderId},recipient_id.eq.${recipientId}`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
  }

  return data;
}


export async function sendMessage(senderId: number, recipientId: number, content: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: senderId, recipient_id: recipientId, content }]);
  
    if (error) {
      console.error('Error sending message:', error);
    }
  
    return data;
  }
  