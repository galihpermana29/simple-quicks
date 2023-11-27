import { Collapse, CollapseProps, Divider, Select } from "antd"

interface TaskBoxI {
  addNewTask: any
  tasksElements: CollapseProps["items"]
}

export const TaskBox = ({ addNewTask, tasksElements }: TaskBoxI) => {
  return (
    <div className="relative min-h-[530px] min-w-[730px] max-w-[730px] px-[29px] py-[24px]">
      <div className="absolute inset-x-[29px] top-[24px] z-[99] bg-white">
        <div className=" flex items-center  justify-between">
          <Select
            className="h-[40px]"
            defaultValue="personal"
            style={{ width: "max-content" }}
            options={[
              { value: "personal", label: "Personal Errands" },
              { value: "urgent", label: "Urgent To-Do" },
            ]}
          />
          <button type="submit" className="rounded bg-[#2F80ED] px-[16px] py-[8px] text-white" onClick={addNewTask}>
            New Task
          </button>
        </div>
        <Divider className="mt-[20px]" />
      </div>

      <div className="max-h-[450px] overflow-y-scroll pb-[50px] pr-[10px] pt-[90px]">
        <Collapse defaultActiveKey={["1"]} ghost items={tasksElements} expandIconPosition="right" className="p-0" />
      </div>
    </div>
  )
}
