import { describe, it, expect } from "vitest";
import { stringifyChat } from "./stringify-llm-chat";

describe("stringifyChat", () => {
  describe("valid stringification", () => {
    it("should correctly stringify an array of role-message objects", () => {
      const messages = [
        { role: "system", content: "This is a system message." },
        { role: "user", content: "This is a user message." },
        { role: "assistant", content: "This is an assistant message." },
      ];

      const expectedOutput = `<!-- role: system -->
This is a system message.

<!-- role: user -->
This is a user message.

<!-- role: assistant -->
This is an assistant message.
`;

      expect(stringifyChat(messages)).toEqual(expectedOutput);
    });
  });

  describe("edge cases", () => {
    it("should handle empty messages correctly", () => {
      const messages = [
        { role: "system", content: "" },
        { role: "user", content: "" },
        { role: "assistant", content: "" },
      ];

      const expectedOutput = `<!-- role: system -->


<!-- role: user -->


<!-- role: assistant -->

`;

      expect(stringifyChat(messages)).toEqual(expectedOutput);
    });

    it("should handle an empty array of messages", () => {
      const messages: { role: string; content: string }[] = [];

      const expectedOutput = "";

      expect(stringifyChat(messages)).toEqual(expectedOutput);
    });
  });
});
