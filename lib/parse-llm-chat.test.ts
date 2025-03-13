import { describe, it, expect } from "vitest";
import { parseChat } from "./parse-llm-chat";
import { stringifyChat } from "./stringify-llm-chat";

describe("parseChat", () => {
  describe("valid parsing", () => {
    it("should correctly parse a chat string into role-message objects", () => {
      const chatString = `
<!-- role: system -->
This is a system message.

<!-- role: user -->
This is a user message.

<!-- role: assistant -->
This is an assistant message.
      `;

      const expectedOutput = [
        { role: "system", content: "This is a system message." },
        { role: "user", content: "This is a user message." },
        { role: "assistant", content: "This is an assistant message." },
      ];

      expect(parseChat(chatString)).toEqual(expectedOutput);
    });
  });

  describe("edge cases", () => {
    it("should handle empty messages correctly", () => {
      const chatString = `
<!-- role: system -->

<!-- role: user -->

<!-- role: assistant -->
      `;

      const expectedOutput = [
        { role: "system", content: "" },
        { role: "user", content: "" },
        { role: "assistant", content: "" },
      ];

      expect(parseChat(chatString)).toEqual(expectedOutput);
    });

    it("should return an empty array if no valid comments are found", () => {
      const chatString = `This is just text with no valid role comments.`;

      const expectedOutput: { role: string; content: string }[] = [];

      expect(parseChat(chatString)).toEqual(expectedOutput);
    });
  });
});
