import { CollapseProps, Popover } from "antd"
import dayjs, { Dayjs } from "dayjs"
import Head from "next/head"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { ChatBox, RoomChat } from "components/chat"
import PopoverCustom from "components/popover"
import { TaskBox } from "components/task"
import BodyTask from "components/task/body-task"
import HeadingBox from "components/task/heading-box"
import { ChatData, ChatDataI, ChatI, DataI } from "utils/chat-data"
import { TaskI, Tasks, TasksData } from "utils/task-data"

export default function Web() {
  const [initialCircleOpen, setInitialCircleOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<"chat" | "task" | boolean>(false)
  const [activeRoom, setActiveRoom] = useState<ChatDataI | null>(null)

  const [typedChat, setTypedChat] = useState<string>("")
  const [allChat, setAllChat] = useState<DataI | []>([])
  const [tasksElements, setTasksElement] = useState<CollapseProps["items"]>([])
  const [allTasks, setAllTasks] = useState<TaskI>([])

  const addNewTask = () => {
    const newTaskPayload = {
      title: "No Title",
      remaining: "",
      date: "20/12/2021",
      text: "No Description",
      id: uuidv4() as string,
      finish: false,
    }

    setAllTasks((prevTasks) => [...prevTasks, newTaskPayload])
  }

  const handleSubmitText = (e: any) => {
    e.preventDefault()

    let { chat } = activeRoom as ChatDataI

    const payload = {
      from: "Me",
      text: typedChat,
      date: "01/06/2023 14:19",
      id: uuidv4(),
    }

    chat.push(payload)
    const newAllChat = allChat.map((data) => ({ ...data, activeRoom }))
    setActiveRoom(activeRoom)
    setAllChat(newAllChat)
    setTypedChat("")
  }

  const handleEditText = (value: ChatI) => {
    const newChat = activeRoom?.chat.map((data) => (data.id === value.id ? { ...value, text: typedChat } : data))
    const newAllChat = allChat?.map((data) =>
      data.id === (activeRoom as ChatDataI).id ? { ...data, chat: newChat as any } : data
    )
    const newActiveRoom = newAllChat.filter((data) => data.id === (activeRoom as ChatDataI).id)
    setAllChat(newAllChat)
    setActiveRoom(newActiveRoom[0])
    setTypedChat("")
  }

  const handleDeleteText = (value: ChatI) => {
    const newChat = activeRoom?.chat.filter((data) => data.id !== value.id)
    const newAllChat = allChat?.map((data) =>
      data.id === (activeRoom as ChatDataI).id ? { ...data, chat: newChat as any } : data
    )
    const newActiveRoom = newAllChat.filter((data) => data.id === (activeRoom as ChatDataI).id)
    setAllChat(newAllChat)
    setActiveRoom(newActiveRoom[0])
  }

  const handleChangeValueTask = (purpose: "date" | "text" | "title" | "finish", value: any, id: number | string) => {
    let changedItem = allTasks?.filter((d: TasksData) => d.id === id)
    let payload: TasksData = {
      ...changedItem[0],
    }

    if (purpose === "text") payload.text = value
    if (purpose === "date") payload.date = dayjs(value).format("DD/MM/YYYY")
    if (purpose === "title") payload.title = value
    if (purpose === "finish") payload.finish = value
    const newTasks = allTasks?.map((data) => (data.id === id ? { ...payload } : data))
    setAllTasks(newTasks)
  }

  useEffect(() => {
    const apiGetAllChat: () => Promise<DataI> = () => {
      return new Promise((resolve, reject) => {
        resolve(ChatData)
        reject("Error")
      })
    }

    const apiGetAllTasks: () => Promise<TaskI> = () => {
      return new Promise((resolve, reject) => {
        resolve(Tasks)
        reject("Error")
      })
    }

    const getAll = async () => {
      const data = await apiGetAllChat()
      const task = await apiGetAllTasks()

      setAllTasks(task)
      setAllChat(data)
    }

    getAll()
  }, [])

  useEffect(() => {
    if (allTasks.length) {
      const collectionOfTasks = allTasks.map((data) => ({
        key: data.id,
        label: <HeadingBox data={{ ...data, onChange: handleChangeValueTask }} />,
        children: <BodyTask date={data.date as Dayjs} text={data.text} onChange={handleChangeValueTask} id={data.id} />,
      }))
      setTasksElement(collectionOfTasks)
    }
  }, [allTasks])

  return (
    <div>
      <Head>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Simple Quicks by Galih Permana</title>
      </Head>
      <div>
        <Popover
          placement="topRight"
          content={
            activeTab === "chat" ? (
              activeRoom ? (
                <RoomChat
                  handleEditText={handleEditText}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  handleSubmitText={handleSubmitText}
                  typedChat={typedChat}
                  setTypedChat={setTypedChat}
                  handleDeleteText={handleDeleteText}
                  setActiveTab={setActiveTab}
                />
              ) : (
                <ChatBox allChat={allChat} setActiveRoom={setActiveRoom} />
              )
            ) : (
              <TaskBox addNewTask={addNewTask} tasksElements={tasksElements} />
            )
          }
          trigger="click"
          open={activeTab ? true : false}
        >
          <PopoverCustom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            initialCircleOpen={initialCircleOpen}
            setInitialCircleOpen={setInitialCircleOpen}
          />
        </Popover>
      </div>
    </div>
  )
}
