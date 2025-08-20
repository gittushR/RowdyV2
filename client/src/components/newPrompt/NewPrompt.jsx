import React, { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload.jsx";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GoogleGenAI } from "@google/genai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChat } from "../../helpers/api-communicators.js";
import Loader from "../Loader/Loader.jsx";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    const loadSystemPrompt = async () => {
      try {
        // Place rowdy_prompt.txt in your public folder
        const response = await fetch("/rowdy_prompt.txt");
        const promptText = await response.text();
        setSystemPrompt(promptText);
      } catch (error) {
        console.error("Failed to load system prompt:", error);
        setSystemPrompt(
          "You are a Rowdy AI. You answer sarcastically and roast everyone. You can even swear and use foul language if you want but make sure you answer whatever is asked."
        );
      }
    };
    loadSystemPrompt();
  }, []);

  const endRef = useRef(null);
  const formRef = useRef(null);

  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: async () =>
      await sendChat(data._id, {
        question: question.length ? question : undefined,
        answer,
        img: img.dbData?.filePath || undefined,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  //console.log(data.history);

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    const prompt = text;
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: data?.history,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const response = await chat.sendMessageStream({
      message: Object.entries(img.aiData).length
        ? [img.aiData, prompt]
        : [prompt],
    });

    let accumulatedText = "";
    for await (const chunk of response) {
      const chunkText = chunk.text;
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
    mutation.mutate();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false);
  };

  //In production we dont need it because we wont use string mode in production
  //But in development since we are using strict mode we are doing this just to prevent
  //this function to run twice
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData, img.aiData]);

  return (
    <>
      {img.isLoading && <Loader></Loader>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width={"380"}
          transformation={[{ width: 380 }]}
        ></IKImage>
      )}
      {question && <div className="message user">{question}</div>}

      {answer && (
        <div className="message">
          <Markdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {answer}
          </Markdown>
        </div>
      )}

      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg}></Upload>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything" />
        <button>
          <img src="/arrow.png" alt="submiticon" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
