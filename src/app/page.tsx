import Image from "next/image";
import {TodoApp} from "@/components/todo-app";

export default function Home() {
  return (
    <div className="font-sans">
      <TodoApp />
    </div>
  );
}
