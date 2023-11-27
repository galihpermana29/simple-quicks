import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import activeChat from "assets/chat-active-circle.png"
import initialChat from "assets/chat-circle.png"
import initialGray from "assets/initial-circle-gray.png"
import initialCircle from "assets/initial-circle.png"
import activeTask from "assets/task-active-circel.png"
import initialTask from "assets/task-circle.png"

interface PopoverCustomI {
  initialCircleOpen: boolean
  setInitialCircleOpen: Dispatch<SetStateAction<boolean>>
  activeTab: "task" | "chat" | boolean
  setActiveTab: Dispatch<SetStateAction<"task" | "chat" | boolean>>
}

export default function PopoverCustom({
  initialCircleOpen,
  setInitialCircleOpen,
  activeTab,
  setActiveTab,
}: PopoverCustomI) {
  return (
    <div className="fixed bottom-[27px] right-[34px]">
      <div className="relative flex items-end gap-[26px]">
        <div
          onClick={() => setActiveTab("task")}
          className={`flex min-w-[70px] cursor-pointer flex-col items-center gap-[14px] transition-all ${
            initialCircleOpen ? "" : "hidden"
          }  ${activeTab === "task" ? "absolute right-[-20px] top-[0px] z-[3]" : ""}`}
        >
          {activeTab === "task" ? (
            <>
              <div className="text-white">{activeTab ? "" : "Task"}</div>
              <Image src={activeTask} alt="circle" className="w-[78px] " />
            </>
          ) : (
            <>
              <div className="text-white">{activeTab ? "" : "Task"}</div>
              <Image src={initialTask} alt="circle" className="w-full max-w-[70px]" width={70} />
            </>
          )}
        </div>
        <div
          onClick={() => setActiveTab("chat")}
          className={`flex w-[70px] cursor-pointer flex-col items-center gap-[14px] transition-all ${
            initialCircleOpen ? "" : "hidden"
          }  ${activeTab === "chat" ? "absolute right-[-20px] z-[3]" : ""}`}
        >
          {activeTab === "chat" ? (
            <>
              <div className="text-white">{activeTab ? "" : "Task"}</div>
              <Image src={activeChat} alt="circle" className="w-full max-w-[70px]" width={70} />
            </>
          ) : (
            <>
              <div className="text-white">{activeTab ? "" : "Chat"}</div>
              <Image src={initialChat} alt="circle" className="w-full max-w-[70px]" width={70} />
            </>
          )}
        </div>

        <div
          className="relative z-[2] w-[70px] cursor-pointer"
          onClick={() => {
            setInitialCircleOpen(!initialCircleOpen)
            setActiveTab(false)
          }}
        >
          <Image
            src={activeTab ? initialGray : initialCircle}
            alt="circle"
            className="w-full max-w-[70px]"
            width={70}
          />
        </div>
      </div>
    </div>
  )
}
