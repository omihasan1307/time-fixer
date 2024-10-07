import TimeSlider from "@/components/Time.slider";
import TimeSlider2 from "@/components/Time.slider2";
import { Card } from "antd";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card title="Business Hours" className="w-full">
        <Card>
          <h1 className="font-semibold mb-10">Custom Business Hours</h1>
          <TimeSlider2 />
          {/* <TimeSlider /> */}
        </Card>
      </Card>
    </div>
  );
}
