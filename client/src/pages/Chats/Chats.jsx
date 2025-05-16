import "./chats.css";
import NewPrompt from "../../components/newPrompt/NewPrompt.jsx";
import { getChat } from "../../helpers/api-communicators.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Loader from "../../components/Loader/Loader.jsx";

const Chats = () => {
  const chatId = useLocation().pathname.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => await getChat(chatId),
  });

  return (
    <div className="chatPage">
      <div className="wrapper scrollbox">
        <div className="chat scrollbox-inner">
          {isPending ? (
            <Loader />
          ) : error ? (
            "Something went wrong"
          ) : (
            data?.history?.map((message, i) => {
              return (
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height={"400"}
                      width={"400"}
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    ></IKImage>
                  )}
                  <div className={`message ${message.role}`} key={i}>
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
                      {message.parts[0].text}
                    </Markdown>
                  </div>
                </>
              );
            })
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Chats;
