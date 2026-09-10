import Form from "@/app/components/domain/Form";
import Image from "next/image";

export default function Edit() {
  return (
    <main className="rounded-2xl bg-white">
      <Form>
        <Form.Header>
          <h2 className="mb-4 text-2xl font-semibold">
            할 일은 많은데 우선순위를 어떻게 정하시나요?
          </h2>
          <div className="flex gap-1 border-b border-[#ddd] pb-8">
            <Image
              className="mr-2 rounded-full object-cover"
              src="/images/thumbnail.png"
              alt="thumbnail"
              width={20}
              height={20}
            />
            <span>체다치즈</span>
          </div>
        </Form.Header>

        <Form.Body>
          <p>
            요즘 할 일이 너무 많아서 어디서부터 손대야 할지 모르겠어요. <br />
            여러분은 중요도나 긴급도를 기준으로 나누시나요, 아니면 그냥 순서대로
            하시나요? <br /> 추천 방법이 있다면 공유해주세요!
          </p>
        </Form.Body>
        <Form.Footer>
          <div className="text-text-secondary">
            <span>2025.05.22 </span>
            <span>·</span> <span>조회 281</span>
          </div>
        </Form.Footer>
      </Form>
    </main>
  );
}
