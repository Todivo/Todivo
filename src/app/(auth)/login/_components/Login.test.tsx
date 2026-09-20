import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "Passw0rd!";

function fillAndSubmit(email: string, password: string) {
  const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
  const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
  const submitButton = screen.getByRole("button", { name: /로그인하기/ });

  return (async () => {
    const user = userEvent.setup();
    if (email) await user.type(emailInput, email);
    if (password) await user.type(passwordInput, password);
    await user.click(submitButton);
  })();
}

describe("Login", () => {
  beforeEach(() => {
    pushMock.mockClear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("이메일, 비밀번호 입력창과 로그인 버튼을 렌더링한다", () => {
    render(<Login />);

    expect(
      screen.getByPlaceholderText("이메일을 입력해주세요"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("비밀번호를 입력해주세요"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /로그인하기/ }),
    ).toBeInTheDocument();
  });

  it("빈 값으로 제출하면 유효성 검사 에러 메시지를 보여준다", async () => {
    render(<Login />);

    await fillAndSubmit("", "");

    expect(
      await screen.findByText("이메일 형식이 아닙니다."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("비밀번호는 8자 이상이어야 합니다."),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("비밀번호 보기 버튼을 누르면 입력 타입이 text로 바뀐다", async () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(
      "비밀번호를 입력해주세요",
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: "비밀번호 보기",
    });

    expect(passwordInput.type).toBe("password");

    await userEvent.click(toggleButton);

    expect(passwordInput.type).toBe("text");
  });

  it("로그인에 성공하면 토큰을 저장하고 /board로 이동한다", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      }),
    });

    render(<Login />);

    await fillAndSubmit(VALID_EMAIL, VALID_PASSWORD);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toEqual(expect.stringContaining("/auth/login"));
    expect(options).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: VALID_EMAIL, password: VALID_PASSWORD }),
    });

    await waitFor(() =>
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "accessToken",
        "access-token",
      ),
    );
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "refreshToken",
      "refresh-token",
    );
    expect(pushMock).toHaveBeenCalledWith("/board");
  });

  it("로그인에 실패하면 에러 메시지로 alert를 띄운다", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "이메일 또는 비밀번호가 올바르지 않습니다." }),
    });

    render(<Login />);

    await fillAndSubmit(VALID_EMAIL, VALID_PASSWORD);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
      ),
    );
    expect(pushMock).not.toHaveBeenCalled();
  });
});
