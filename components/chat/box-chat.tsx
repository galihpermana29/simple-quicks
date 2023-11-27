import { EllipsisOutlined } from "@ant-design/icons"
import { Divider, Dropdown, MenuProps } from "antd"
import { Dispatch, SetStateAction } from "react"
import { ChatI } from "utils/chat-data"

interface BoxChatI {
  chat: ChatI[]
  setEdit: Dispatch<SetStateAction<ChatI | null>>
  handleDeleteText: (value: ChatI) => void
}

export default function BoxChat({ chat, setEdit, handleDeleteText }: BoxChatI) {
  function generateItems(data: ChatI): MenuProps["items"] {
    return [
      {
        label: (
          <div className="text-[#2F80ED]" onClick={() => setEdit(data)}>
            Edit
          </div>
        ),
        key: "1",
      },
      {
        label: (
          <div className="text-[#EB5757]" onClick={() => handleDeleteText(data)}>
            Remove
          </div>
        ),
        key: "2",
      },
    ]
  }

  return (
    <>
      {chat.map((data, idx) => (
        <div key={idx}>
          {chat.length - 1 === idx ? (
            <Divider orientation="center" plain>
              <div className={`${chat.length - 1 === idx ? "text-red-500" : ""}`}>New Message</div>
            </Divider>
          ) : (
            ""
          )}

          <div className={`my-[8px] flex flex-col  ${data.from === "Me" ? "items-end" : "items-start"}`}>
            <div className={` ${data.from === "Me" ? "text-[#9B51E0]" : "text-[#E5A443]"}`}>
              {data.from === "Me" ? "You" : data.from}
            </div>

            <div className="flex items-start gap-[10px]">
              {data.from === "Me" && (
                <Dropdown menu={{ items: generateItems(data) }} trigger={["click"]}>
                  <EllipsisOutlined className="cursor-pointer text-[17px]" />
                </Dropdown>
              )}

              <div
                className={`max-w-[500px] rounded-[5px] ${
                  data.from === "Me" ? "bg-[#EEDCFF]" : "bg-[#FCEED3]"
                }   p-[10px] text-[#4F4F4F]`}
              >
                {data.text}
                <br />
                {data.date}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
