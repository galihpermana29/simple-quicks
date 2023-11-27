import { ClockCircleOutlined, EditOutlined } from "@ant-design/icons"
import { Col, DatePicker, Typography } from "antd"
import dayjs, { Dayjs } from "dayjs"

interface BodyTaskI {
  onChange: any
  date: Dayjs
  text: string
  id?: number | string
}

export default function BodyTask({ onChange, date, text, id }: BodyTaskI) {
  return (
    <div className="ml-[20px]  text-[14px] text-[#4F4F4F]">
      <div className="flex items-center gap-[18px]">
        <Col>
          <ClockCircleOutlined className="text-[18px]" />
        </Col>
        <Col>
          <DatePicker
            format={"DD/MM/YYYY"}
            className="h-[40px]"
            onChange={(val) => onChange("date", val, id)}
            defaultValue={dayjs(date)}
          />
        </Col>
      </div>
      <div className="mt-[12px] flex items-center gap-[18px]">
        <Col>
          <EditOutlined className="text-[18px]" />
        </Col>
        <Col className="min-h-[40px] min-w-[550px]">
          <Typography.Paragraph
            className="!mt-[5px] flex h-full w-full items-center"
            editable={{
              triggerType: ["text"],
              enterIcon: null,
              onChange: (val) => onChange("text", val, id),
            }}
          >
            {text}
          </Typography.Paragraph>
        </Col>
      </div>
    </div>
  )
}
