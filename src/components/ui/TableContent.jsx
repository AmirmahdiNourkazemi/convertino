import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["تبدیل", "ویژگی", "آفلاین | آنلاین"];

const TABLE_ROWS = [
  {
    name: "تبدیل عکس به متن ",
    job: "تبدیل عکس به متن قابل ویرایش با استفاده از تکنولوژی OCR",
    date: "✅",
  },
  {
    name: "تبدیل پی دی اف به ورد",
    job: "تبدیل فایل پی دی اف به ورد رایگان",
    date: "✅",
  },
  {
    name: "تبدیل فرمت عکس ",
    job: "تغییر فرمت عکس ، تبدیل عکس وب به jpg، تبدیل عکس به png ، تبدیل عکس به jpg",
    date: "✅",
  },
  {
    name: "تبدیل پی دی اف به عکس",
    job: "تبدیل فایل پی دی اف به عکس ، تبدیل pdf به jpg رایگان",
    date: "✅",
  },
  {
    name: "تبدیل فایل به پی دی اف",
    job: "تبدیل عکس به پی دی اف رایگان",
    date: "✅",
  },
];

export function TableWithStripedRows() {
  return (
    <section className="mt-10 md:mt-20 md:max-w-5xl mx-auto">
      
      <Card className="font-kalame-medium h-full w-full">
        <table className="w-full table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-50 py-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-irm-medium font-black text-xs md:text-base leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job, date, allow }, index) => (
              <tr key={name} className="even:bg-blue-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-irm text-xs md:text-sm"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-irm text-xs md:text-sm"
                  >
                    {job}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-irm text-xs md:text-sm"
                  >
                    {date}
                  </Typography>
                </td>
                {/* <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {allow}
                </Typography>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
