import type { Route } from "./+types/home";
import { ArrowUpCircleIcon } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import { Form } from "react-router";
import ChatBubbles from "~/components/chat-bubble";

const XAI_API_KEY = import.meta.env.VITE_XAI_API_KEY;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "xAI" },
    { name: "description", content: "xAI chat bot aka Grok" },
  ];
}

export default function Home() {

  // ToDo: move to action function
  const [textField, setTextField] = useState<string>('');
  const inputRef = useRef<any>(null);

  const handleSubmit = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
        {
          role: "system",
          content: ""
        },
        {
          role: "user",
          content: `${textField}`
        }
      ],
      model: "grok-beta",
      stream: false,
      temperature: 0
      })
    }

    if (textField.length > 0) {
      fetch("https://api.x.ai/v1/chat/completions", options)
        .then(response => response.json())
        .then(data => console.log(data.choices[0].message.content))
        .catch(err => console.error(err));
    }
  }

  const handleEnterKeySubmit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
      inputRef.current.value = '';
      inputRef.current.setSelectionRange(0, 0);
      setTextField('');
    }
  }

  return (
    <>
      <nav className="nav">
        <h1 className="grok">xAI Grok</h1>
      </nav>
      <div className="chat-window-wrapper">
        <div className="chat-window">
          <ChatBubbles />
        </div>
        <section className="input-section">
          <Form method="post" navigate={false} action="/home" >
            <textarea 
              ref={inputRef}
              onKeyDown={(event) => {
                handleEnterKeySubmit(event);
              }}
              onChange={(e) => {
                setTextField(e.target.value);
              }}
              value={textField}
              className="textarea" 
              id="input" 
              name="text-box" 
            />
            <button 
              type="submit"
              onClick={() => {
                handleSubmit();
                setTextField('');
              }}
            >
              <ArrowUpCircleIcon className="arrow" />
            </button>
          </Form>
        </section>
      </div>
    </>
  )
}


export async function action( request: any) {
  const data  = await request;
  console.log(typeof data);
}