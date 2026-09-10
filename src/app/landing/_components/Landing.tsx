"use client";

import Image from "next/image";

export default function LandingPage() {
  interface Step {
    id: number;
    number: string;
    image: string;
    imageSize: number;
    title: string;
    desc: string;
    bgcolor: string;
    circle: string;
  }
  const steps: Step[] = [
    {
      id: 1,
      number: "1",
      image: "/images/landing-goal.png",
      imageSize: 300,
      title: "목표 설정",
      desc: "이루고 싶은 목표를 먼저 만들어보세요.",
      bgcolor: "#feefdc",
      circle: "#ff8442",
    },
    {
      id: 2,
      number: "2",
      image: "/images/landing-todo.png",
      imageSize: 150,
      title: "할 일 만들기",
      desc: "목표를 이루기 위한 할 일을 추가해보세요.",
      bgcolor: "#dafffa",
      circle: "#2dd4bf",
    },
    {
      id: 3,
      number: "3",
      image: "/images/landing-todo.png",
      imageSize: 150,
      title: "목표에 연결하기",
      desc: "만든 할 일을 목표에 연결하고 관리하세요.",
      bgcolor: "#d4efff",
      circle: "#1EACFF",
    },
  ];
  return (
    <>
      <main className="flex h-full w-full items-center justify-center bg-foreground/50">
        <section className="h-175 w-200 rounded-2xl bg-background">
          <h1 className="pt-12 text-center font-pretendard text-4xl font-semibold text-text-primary">
            투디보에 오신 것을 환영합니다!
          </h1>
          <p className="pt-7 text-center font-pretendard text-[22px] text-text-secondary">
            목표를 만들고 할 일을 추가해보세요. <br />더 체계적으로 목표를
            달성할 수 있어요.
          </p>
          <ol className="flex justify-between justify-center gap-12 font-pretendard">
            {steps.map((item) => {
              return (
                <li key={item.id}>
                  <div
                    className="relative mt-10 flex h-50 w-50 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: item.bgcolor }}
                  >
                    <span
                      className="absolute top-3.5 left-3.5 flex h-8 w-8 items-center justify-center rounded-full text-[20px] text-background"
                      style={{ backgroundColor: item.circle }}
                    >
                      {item.number}
                    </span>
                    <Image
                      src={item.image}
                      alt="목표 만들기"
                      width={item.imageSize}
                      height={item.imageSize}
                    />
                  </div>

                  <div className="w-50">
                    <h2 className="mt-4 text-center text-2xl">{item.title}</h2>
                    <p className="mt-3.5 text-center text-[18px] text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
          <button className="mx-auto mt-12 block h-12.5 w-100 cursor-pointer justify-center rounded-4xl bg-primary">
            <p className="font-pretendard text-[20px] text-background">
              시작하기
            </p>
          </button>
        </section>
      </main>
    </>
  );
}
