import Image from "next/image"
import profileBlue from "assets/blue-profile.png"
import profileWhite from "assets/gray-profile.png"
import { ChatDataI } from "utils/chat-data"
import { truncateText } from "utils/function"

interface LandingChatI {
  data: ChatDataI
}

export default function LandingChat({ data }: LandingChatI) {
  const { name, date, chat } = data
  return (
    <div className="flex cursor-pointer gap-[20px]">
      <div className="relative flex min-w-[70px] items-center justify-start">
        <Image src={profileWhite} alt="profile" className="w-[40px]" />
        <Image src={profileBlue} alt="profile" className="absolute left-[20px] w-[40px]" />
      </div>
      <div>
        <div className="flex gap-[10px]">
          <div className="text-[16px] font-bold text-[#2F80ED]">{name}</div>
          <div className="text-[14px] text-[#4F4F4F]">{date}</div>
        </div>
        <div className="text-[14px] text-[#4F4F4F]">{chat[chat.length - 1].from}</div>
        <div className="text-[14px] text-[#4F4F4F]">{truncateText(chat[chat.length - 1].text, 20)}</div>
      </div>
    </div>
  )
}
