import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons"
import { Divider, Input } from "antd"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChatDataI, ChatI, DataI } from "utils/chat-data"
import BoxChat from "./box-chat"
import LandingChat from "./landing-chat"

interface RoomChatI {
  activeRoom: ChatDataI
  setActiveRoom: Dispatch<SetStateAction<ChatDataI | null>>
  handleSubmitText: any
  handleEditText: (value: ChatI) => void
  typedChat: string
  setTypedChat: Dispatch<SetStateAction<string>>
  handleDeleteText: (value: ChatI) => void
  setActiveTab: Dispatch<SetStateAction<boolean | "chat" | "task">>
}

export const RoomChat = ({
  activeRoom,
  setActiveRoom,
  handleSubmitText,
  typedChat,
  setTypedChat,
  handleEditText,
  handleDeleteText,
  setActiveTab,
}: RoomChatI) => {
  const [edit, setEdit] = useState<ChatI | null>(null)
  const { name, chat, total, type } = activeRoom as ChatDataI

  useEffect(() => {
    setTypedChat(edit?.text as string)
  }, [edit])

  return (
    <div className="relative min-h-[530px] min-w-[730px] max-w-[730px] px-[29px] py-[24px]">
      <div className="absolute inset-x-[29px] top-[24px] z-[99] bg-white">
        <div className=" flex items-center  justify-between">
          <div className="flex gap-[15px]">
            <ArrowLeftOutlined className="cursor-pointer" onClick={() => setActiveRoom(null)} />
            <div>
              <div className="text-[16px] font-bold text-[#2F80ED]">{name}</div>
              {type === "group" && <div className="text-[12px] text-[#4F4F4F]">{total} Participants</div>}
            </div>
          </div>
          <CloseOutlined onClick={() => setActiveTab(false)} />
        </div>
        <Divider className="mt-[20px]" />
      </div>

      <div className="max-h-[450px] overflow-y-scroll pb-[50px] pr-[10px] pt-[80px]">
        <BoxChat chat={chat} setEdit={setEdit} handleDeleteText={handleDeleteText} />
      </div>
      {edit ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEditText(edit)
              setEdit(null)
            }}
            className="absolute inset-x-[29px] bottom-[0] flex gap-[15px] bg-white pt-[10px]"
          >
            <Input placeholder="Type..." type="chat" onChange={(e) => setTypedChat(e.target.value)} value={typedChat} />
            <button type="submit" className="rounded bg-[#2F80ED] px-[16px] py-[8px] text-white">
              Edit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmitText}
            className="absolute inset-x-[29px] bottom-[0] flex gap-[15px] bg-white pt-[10px]"
          >
            <Input placeholder="Type..." type="chat" onChange={(e) => setTypedChat(e.target.value)} value={typedChat} />
            <button type="submit" className="rounded bg-[#2F80ED] px-[16px] py-[8px] text-white">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

interface ChatBoxI {
  allChat: DataI | []
  setActiveRoom: any
}

export const ChatBox = ({ allChat, setActiveRoom }: ChatBoxI) => {
  return (
    <div className="min-h-[530px] min-w-[730px] max-w-[730px] px-[34px] py-[24px]">
      <div>
        <Input placeholder="Search" className="h-[40px] border-[1px] border-[#828282] px-[60px]" />
      </div>
      <div className="py-[24px]">
        {allChat.map((data, idx) => (
          <div key={idx} onClick={() => setActiveRoom(data)}>
            <LandingChat data={data} />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}
