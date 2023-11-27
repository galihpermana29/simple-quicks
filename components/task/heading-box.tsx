import { Checkbox, Typography } from "antd"
import { Dayjs } from "dayjs"

interface HeadingBoxI {
  data: {
    title: string
    remaining: string
    date: Dayjs | string | null
    onChange: any
    id: number | string
    finish: boolean
  }
}

export default function HeadingBox({ data }: HeadingBoxI) {
  const { title, remaining, date, onChange, id, finish } = data
  return (
    <div className="flex w-full flex-col">
      <Checkbox className="flex w-full" onChange={(val) => onChange("finish", val.target.checked, id)}>
        <div className="flex w-[600px] flex-1 justify-between ">
          <div className="ml-[10px]">
            <Typography.Paragraph
              className={`mt-[0px] w-full text-[16px] font-bold text-[#4F4F4F] ${finish ? "line-through" : ""}`}
              editable={{
                triggerType: ["text"],
                enterIcon: null,
                onChange: (val) => onChange("title", val, id),
              }}
            >
              {title}
            </Typography.Paragraph>
          </div>
          <div className="flex gap-[10px]">
            <div className="text-red-500">{remaining}</div>
            <div>{date as String}</div>
          </div>
        </div>
      </Checkbox>
    </div>
  )
}
