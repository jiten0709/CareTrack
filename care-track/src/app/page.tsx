import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-red-400">
        Hello world
      </h1>
      <Button>Click Me</Button>
    </div>
  );
}
